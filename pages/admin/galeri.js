
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../utils/supabaseClient";

const BUCKET = "galeri";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const cleanImagePath = (path) => {
  if (!path) return "";
  return String(path).trim().replace(/^["']|["']$/g, "");
};

const getImageUrl = (path) => {
  const cleanPath = cleanImagePath(path);

  if (!cleanPath) return "";

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(cleanPath);

  return data?.publicUrl || "";
};

const getStoragePath = (path) => {
  const cleanPath = cleanImagePath(path);

  if (!cleanPath) return "";

  if (!cleanPath.startsWith("http")) {
    return cleanPath;
  }

  try {
    const url = new URL(cleanPath);
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const index = url.pathname.indexOf(marker);

    if (index === -1) return "";

    return decodeURIComponent(
      url.pathname.substring(index + marker.length)
    );
  } catch {
    return "";
  }
};

const createFileName = (file) => {
  const extension = file.name.split(".").pop().toLowerCase();

  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${safeName || "foto"}.${extension}`;
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function AdminGaleri() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
  });

  // Pengecekan login dan hak akses admin
  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          if (mounted) router.replace("/admin/login");
          return;
        }

        const { data: isAdmin, error: adminError } =
          await supabase.rpc("is_admin");

        if (adminError || !isAdmin) {
          await supabase.auth.signOut();

          if (mounted) router.replace("/admin/login");
          return;
        }

        if (mounted) {
          await fetchProjects();
        }
      } catch (err) {
        console.error("Pengecekan admin gagal:", err);

        if (mounted) {
          setError("Gagal memeriksa akses admin.");
          setLoading(false);
        }
      }
    };

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, []);

  // Mengambil data proyek dan foto
  const fetchProjects = async () => {
    setError("");

    try {
      const { data: projectData, error: projectError } =
        await supabase
          .from("galeri_proyek")
          .select("*")
          .order("created_at", { ascending: false });

      if (projectError) throw projectError;

      const { data: photoData, error: photoError } =
        await supabase
          .from("galeri_foto")
          .select("*")
          .order("created_at", { ascending: true });

      if (photoError) throw photoError;

      const combined = (projectData || []).map((project) => ({
        ...project,
        photos: (photoData || []).filter(
          (photo) => photo.proyek_id === project.id
        ),
      }));

      setProjects(combined);
    } catch (err) {
      console.error("Gagal mengambil galeri:", err);
      setError("Gagal mengambil data galeri: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Membersihkan preview
  const clearPreviews = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));

    setPreviews([]);
    setSelectedFiles([]);

    const input = document.getElementById("foto-proyek");
    if (input) input.value = "";
  };

  // Mengubah input form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Memilih beberapa foto
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      setError("Semua file harus berupa gambar.");
      e.target.value = "";
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setError("Ukuran setiap gambar maksimal 5 MB.");
      e.target.value = "";
      return;
    }

    previews.forEach((url) => URL.revokeObjectURL(url));

    setError("");
    setSelectedFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Reset form
  const resetForm = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));

    setForm({
      judul: "",
      deskripsi: "",
    });

    setEditingId(null);
    setSelectedFiles([]);
    setPreviews([]);

    const input = document.getElementById("foto-proyek");
    if (input) input.value = "";
  };

  // Upload foto ke Supabase Storage
  const uploadPhotos = async (files, projectId) => {
    const uploadedPaths = [];

    try {
      for (const file of files) {
        const fileName = createFileName(file);
        const filePath = `${projectId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) throw uploadError;

        uploadedPaths.push(filePath);
      }

      return uploadedPaths;
    } catch (err) {
      if (uploadedPaths.length) {
        await supabase.storage
          .from(BUCKET)
          .remove(uploadedPaths);
      }

      throw err;
    }
  };

  // Menambah atau memperbarui proyek
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.judul.trim()) {
      setError("Judul proyek wajib diisi.");
      return;
    }

    if (!editingId && selectedFiles.length === 0) {
      setError("Silakan pilih minimal satu foto proyek.");
      return;
    }

    setSaving(true);

    try {
      let projectId = editingId;

      const payload = {
        judul: form.judul.trim(),
        deskripsi: form.deskripsi.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("galeri_proyek")
          .update(payload)
          .eq("id", editingId);

        if (updateError) throw updateError;
      } else {
        const { data, error: insertError } = await supabase
          .from("galeri_proyek")
          .insert([payload])
          .select()
          .single();

        if (insertError) throw insertError;

        projectId = data.id;
      }

      if (selectedFiles.length > 0) {
        setUploading(true);

        const uploadedPaths = await uploadPhotos(
          selectedFiles,
          projectId
        );

        const photoPayload = uploadedPaths.map((path) => ({
          proyek_id: projectId,
          gambar_path: path,
        }));

        const { error: photoError } = await supabase
          .from("galeri_foto")
          .insert(photoPayload);

        if (photoError) {
          await supabase.storage
            .from(BUCKET)
            .remove(uploadedPaths);

          throw photoError;
        }
      }

      setSuccess(
        editingId
          ? "Proyek berhasil diperbarui."
          : "Proyek berhasil ditambahkan."
      );

      resetForm();
      await fetchProjects();
    } catch (err) {
      console.error("Gagal menyimpan proyek:", err);
      setError("Gagal menyimpan proyek: " + err.message);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  // Edit proyek
  const handleEdit = (project) => {
    setError("");
    setSuccess("");

    clearPreviews();

    setEditingId(project.id);

    setForm({
      judul: project.judul || "",
      deskripsi: project.deskripsi || "",
    });

    document.getElementById("form-galeri")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Hapus satu foto
  const handleDeletePhoto = async (photo) => {
    const yakin = window.confirm(
      "Yakin ingin menghapus foto ini?"
    );

    if (!yakin) return;

    setError("");
    setSuccess("");

    try {
      const { error: deleteError } = await supabase
        .from("galeri_foto")
        .delete()
        .eq("id", photo.id);

      if (deleteError) throw deleteError;

      const storagePath = getStoragePath(photo.gambar_path);

      if (storagePath) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET)
          .remove([storagePath]);

        if (storageError) {
          console.error("Gagal menghapus file storage:", storageError);
        }
      }

      setSuccess("Foto berhasil dihapus.");
      await fetchProjects();
    } catch (err) {
      console.error("Gagal menghapus foto:", err);
      setError("Gagal menghapus foto: " + err.message);
    }
  };

  // Hapus seluruh proyek
  const handleDeleteProject = async (project) => {
    const yakin = window.confirm(
      `Yakin ingin menghapus proyek "${project.judul}" beserta seluruh fotonya?`
    );

    if (!yakin) return;

    setError("");
    setSuccess("");

    try {
      const storagePaths = project.photos
        .map((photo) => getStoragePath(photo.gambar_path))
        .filter(Boolean);

      if (storagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET)
          .remove(storagePaths);

        if (storageError) throw storageError;
      }

      const { error: photoError } = await supabase
        .from("galeri_foto")
        .delete()
        .eq("proyek_id", project.id);

      if (photoError) throw photoError;

      const { error: projectError } = await supabase
        .from("galeri_proyek")
        .delete()
        .eq("id", project.id);

      if (projectError) throw projectError;

      if (editingId === project.id) {
        resetForm();
      }

      setSuccess("Proyek dan seluruh fotonya berhasil dihapus.");
      await fetchProjects();
    } catch (err) {
      console.error("Gagal menghapus proyek:", err);
      setError("Gagal menghapus proyek: " + err.message);
    }
  };

  // Logout admin
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError("Gagal logout: " + error.message);
      return;
    }

    router.replace("/admin/login");
  };

  const totalFoto = projects.reduce(
    (total, project) => total + project.photos.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-8 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER - SAMA SEPERTI KATALOG */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-5">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Kembali ke Dashboard
            </button>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold">
                Admin Galeri
              </h1>

              <p className="mt-1 text-sm text-black-500">
                Kelola foto dan dokumentasi proyek CV Sarana Teknik Bali.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-maroon-500 px-5 py-2.5 text-sm font-semibold text-white-500 transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* STATISTIK */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm text-black-500">Total Proyek</p>
                <p className="text-2xl font-bold text-black-500">
                  {projects.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5h16v14H4zM8 9h.01M4 16l5-5 4 4 3-3 4 4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm text-black-500">Total Foto</p>
                <p className="text-2xl font-bold text-black-500">
                  {totalFoto}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* NOTIFIKASI */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FORM GALERI */}
        <motion.div
          id="form-galeri"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 rounded-2xl bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Proyek" : "Tambah Proyek"}
              </h2>

              <p className="mt-1 text-sm text-black-500">
                Tambahkan informasi dan foto dokumentasi proyek.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-semibold hover:text-maroon-500"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* JUDUL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Judul Proyek
              </label>

              <input
                type="text"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                placeholder="Masukkan judul proyek"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Deskripsi Proyek
              </label>

              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows={4}
                placeholder="Masukkan deskripsi proyek..."
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* UPLOAD FOTO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Foto Proyek
              </label>

              <label
                htmlFor="foto-proyek"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-blue-500 hover:bg-blue-50"
              >
                <svg
                  className="mb-3 h-10 w-10 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0L7 9m5-5 5 5M4 16v4h16v-4"
                  />
                </svg>

                <span className="text-sm font-semibold text-gray-700">
                  Klik untuk memilih foto
                </span>

                <span className="mt-1 text-xs text-black-500">
                  Bisa memilih beberapa foto sekaligus. Maksimal 5 MB per foto.
                </span>
              </label>

              <input
                id="foto-proyek"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              {editingId && (
                <p className="mt-2 text-xs text-black-500">
                  Foto yang sudah ada tetap tersimpan. Foto baru akan ditambahkan.
                </p>
              )}

              {/* PREVIEW FOTO */}
              {previews.length > 0 && (
                <div className="mt-2">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-black-500">
                      Preview foto baru ({previews.length})
                    </p>

                    <button
                      type="button"
                      onClick={clearPreviews}
                      className="text-xs font-semibold hover:text-maroon-500"
                    >
                      Hapus pilihan
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {previews.map((preview, index) => (
                      <div
                        key={preview}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute bottom-0 bg-maroon-500 left-0 right-0 bg-black/50 px-2 py-1 text-center text-xs text-white-500">
                          Foto {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* TOMBOL SIMPAN */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white-500 transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? uploading
                    ? "Mengunggah foto..."
                    : "Menyimpan..."
                  : editingId
                  ? "Simpan Perubahan"
                  : "Tambah Proyek"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border bg-maroon-500 border-gray-300 px-6 py-3 text-sm font-semibold text-white-500 transition hover:bg-maroon-500"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* DAFTAR PROYEK */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Daftar Galeri Proyek
              </h2>

              <p className="mt-1 text-sm text-black-500">
                Kelola proyek dan dokumentasi foto yang sudah diunggah.
              </p>
            </div>

            <span className="w-fit rounded-full px-4 py-2 text-xs font-bold text-blue-700">
              {projects.length} Proyek
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
              <p className="text-sm text-gray-500">
                Memuat data galeri...
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
              <svg
                className="mx-auto mb-3 h-12 w-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5h16v14H4zM8 9h.01M4 16l5-5 4 4 3-3 4 4"
                />
              </svg>

              <p className="font-semibold text-black-500">
                Belum ada proyek
              </p>

              <p className="mt-1 text-sm text-black-500">
                Silakan tambahkan proyek melalui formulir di atas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* FOTO PROYEK */}
                  {project.photos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1">
                      {project.photos.slice(0, 4).map((photo, photoIndex) => (
                        <div
                          key={photo.id}
                          className={`group relative overflow-hidden bg-gray-200 ${
                            project.photos.length === 1
                              ? "col-span-2 aspect-[16/9]"
                              : "aspect-square"
                          }`}
                        >
                          <img
                            src={getImageUrl(photo.gambar_path)}
                            alt={project.judul}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(photo)}
                            className="absolute right-2 top-2 rounded-lg bg-maroon-500/90 px-2.5 py-1.5 text-xs font-semibold text-white-500 opacity-0 shadow transition hover:bg-red-700 group-hover:opacity-100"
                          >
                            Hapus
                          </button>

                          {photoIndex === 3 && project.photos.length > 4 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xl font-bold text-white">
                              +{project.photos.length - 4}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">
                      Belum ada foto
                    </div>
                  )}

                  {/* INFORMASI PROYEK */}
                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold">
                          {project.judul}
                        </h3>

                        <p className="mt-1 text-xs text-black-500">
                          {formatDate(project.created_at)}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {project.photos.length} Foto
                      </span>
                    </div>

                    <p className="whitespace-pre-line text-sm leading-6 text-gray-600">
                      {project.deskripsi || "Tidak ada deskripsi proyek."}
                    </p>

                    {/* TOMBOL AKSI */}
                    <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="flex-1 rounded-lg bg-green-500 px-3 py-2.5 text-sm font-semibold text-white-500 transition hover:bg-green-500"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project)}
                        className="flex-1 rounded-lg bg-maroon-500 px-3 py-2.5 text-sm font-semibold text-white-500 transition hover:bg-red-100"
                      >
                        Hapus Proyek
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="py-6 text-center text-xs text-gray-400">
          Admin Galeri · CV Sarana Teknik Bali
        </div>
      </div>
    </div>
  );
}

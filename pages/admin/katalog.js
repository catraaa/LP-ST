
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

// Membersihkan tanda petik yang mungkin ikut tersimpan di database
const cleanImageUrl = (url) => {
  if (!url) return "";
  return String(url).trim().replace(/^["']|["']$/g, "");
};

// Membuat URL gambar dari path Supabase Storage
const getImageUrl = (path) => {
  const cleanPath = cleanImageUrl(path);
  if (!cleanPath) return "";

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  const { data } = supabase.storage
    .from("katalog")
    .getPublicUrl(cleanPath);

  return data?.publicUrl || "";
};

// Format harga Rupiah
const formatRupiah = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

// Membuat nama file yang aman
const createFileName = (file) => {
  const extension = file.name.split(".").pop().toLowerCase();

  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${Date.now()}-${safeName || "gambar"}.${extension}`;
};

export default function AdminKatalog() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [katalog, setKatalog] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState("");

  const initialForm = {
    nama_alat: "",
    deskripsi: "",
    harga_hari: "",
    harga_minggu: "",
    harga_bulan: "",
    gambar_path: "",
  };

  const [form, setForm] = useState(initialForm);

  // Pengecekan login dan hak akses admin
  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
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
        await fetchKatalog();
      }
    };

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, []);

  // Mengambil data katalog dari Supabase
  const fetchKatalog = async () => {
    setError("");

    const { data, error } = await supabase
      .from("katalog")
      .select(
        "id, nama_alat, deskripsi, harga_hari, harga_minggu, harga_bulan, gambar_path, created_at, updated_at"
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil katalog:", error);
      setError("Gagal mengambil data katalog.");
      setLoading(false);
      return;
    }

    setKatalog(data || []);
    setLoading(false);
  };

  // Mengubah input form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Memilih gambar
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setGambarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload gambar ke Supabase Storage
  const uploadGambar = async (file) => {
    const fileName = createFileName(file);
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("katalog")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  };

  // Membersihkan form
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setGambarFile(null);
    setPreview("");

    const fileInput = document.getElementById("gambar");
    if (fileInput) fileInput.value = "";
  };

  // Menambah atau mengedit katalog
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.nama_alat.trim()) {
      setError("Nama alat wajib diisi.");
      return;
    }

    setSaving(true);

    try {
      let gambarPath = form.gambar_path;

      // Upload gambar baru jika admin memilih gambar
      if (gambarFile) {
        setUploading(true);
        gambarPath = await uploadGambar(gambarFile);
        setUploading(false);
      }

      const payload = {
        nama_alat: form.nama_alat.trim(),
        deskripsi: form.deskripsi.trim(),
        harga_hari:
          form.harga_hari === "" ? null : Number(form.harga_hari),
        harga_minggu:
          form.harga_minggu === "" ? null : Number(form.harga_minggu),
        harga_bulan:
          form.harga_bulan === "" ? null : Number(form.harga_bulan),
        gambar_path: cleanImageUrl(gambarPath) || null,
        updated_at: new Date().toISOString(),
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("katalog")
          .update(payload)
          .eq("id", editingId);
      } else {
        result = await supabase
          .from("katalog")
          .insert([payload]);
      }

      if (result.error) {
        throw result.error;
      }

      setSuccess(
        editingId
          ? "Katalog berhasil diperbarui."
          : "Katalog berhasil ditambahkan."
      );

      resetForm();
      await fetchKatalog();
    } catch (err) {
      console.error("Gagal menyimpan katalog:", err);
      setError(err.message || "Gagal menyimpan katalog.");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  // Mengisi form ketika tombol edit diklik
  const handleEdit = (item) => {
    setError("");
    setSuccess("");

    setEditingId(item.id);

    setForm({
      nama_alat: item.nama_alat || "",
      deskripsi: item.deskripsi || "",
      harga_hari: item.harga_hari ?? "",
      harga_minggu: item.harga_minggu ?? "",
      harga_bulan: item.harga_bulan ?? "",
      gambar_path: cleanImageUrl(item.gambar_path),
    });

    setGambarFile(null);
    setPreview(getImageUrl(item.gambar_path));

    document.getElementById("form-katalog")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Menghapus katalog
  const handleDelete = async (item) => {
    const yakin = window.confirm(
      `Yakin ingin menghapus katalog "${item.nama_alat}"?`
    );

    if (!yakin) return;

    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("katalog")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error("Gagal menghapus katalog:", error);
      setError("Gagal menghapus katalog: " + error.message);
      return;
    }

    if (editingId === item.id) {
      resetForm();
    }

    setSuccess("Katalog berhasil dihapus.");
    await fetchKatalog();
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

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-8 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6">

          {/* TOMBOL KEMBALI */}
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
              <h1 className="text-2xl font-bold text-black-600">
                Admin Katalog
              </h1>

              <p className="mt-1 text-sm text-black-600">
                Kelola daftar alat dan harga sewa CV Sarana Teknik Bali.
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
        </div>

        {/* NOTIFIKASI */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* FORM KATALOG */}
        <div
          id="form-katalog"
          className="mb-10 rounded-2xl bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-black-600">
              {editingId ? "Edit Katalog" : "Tambah Katalog"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-black-500 hover:text-gray-800"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAMA ALAT */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-black-600">
                Nama Alat
              </label>

              <input
                type="text"
                name="nama_alat"
                value={form.nama_alat}
                onChange={handleChange}
                placeholder="Masukkan nama alat"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-black-600">
                Deskripsi
              </label>

              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows={4}
                placeholder="Masukkan deskripsi alat"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* HARGA */}
            <div>
              <h3 className="mb-3 text-sm font-bold text-black-600">
                Harga Sewa
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-medium text-black-600">
                    Per Hari (Rp)
                  </label>

                  <input
                    type="number"
                    name="harga_hari"
                    value={form.harga_hari}
                    onChange={handleChange}
                    min="0"
                    placeholder="Contoh: 500000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black-600">
                    Per Minggu (Rp)
                  </label>

                  <input
                    type="number"
                    name="harga_minggu"
                    value={form.harga_minggu}
                    onChange={handleChange}
                    min="0"
                    placeholder="Contoh: 3000000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black-600">
                    Per Bulan (Rp)
                  </label>

                  <input
                    type="number"
                    name="harga_bulan"
                    value={form.harga_bulan}
                    onChange={handleChange}
                    min="0"
                    placeholder="Contoh: 10000000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

              </div>
            </div>

            {/* FOTO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-black-600">
                Foto Alat
              </label>

              <input
                id="gambar"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              />

              <p className="mt-1 text-xs text-black-600">
                Format gambar bebas, maksimal 5 MB.
              </p>

              {preview && (
                <div className="mt-4 flex h-48 w-full items-center justify-center rounded-xl bg-gray-100 p-3 sm:w-72">
                  <img
                    src={preview}
                    alt="Preview foto alat"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* TOMBOL SIMPAN */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white-500 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? uploading
                    ? "Mengunggah gambar..."
                    : "Menyimpan..."
                  : editingId
                  ? "Simpan Perubahan"
                  : "Tambah Katalog"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 bg-maroon-500 px-6 py-3 text-sm font-semibold text-white-500"
                >
                  Batal
                </button>
              )}
            </div>

          </form>
        </div>

        {/* DAFTAR KATALOG */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Daftar Katalog
            </h2>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {katalog.length} Alat
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-black-600">
              Memuat data katalog...
            </div>
          ) : katalog.length === 0 ? (
            <div className="py-12 text-center text-sm text-black-600">
              Belum ada katalog alat.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

              {katalog.map((item) => {
                const imageUrl = getImageUrl(item.gambar_path);

                return (
                  <div
                    key={item.id}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >

                    {/* GAMBAR */}
                    <div className="flex h-44 w-full items-center justify-center bg-gray-100 px-4">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.nama_alat || "Foto alat"}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-xs text-black-600">
                          Foto belum tersedia
                        </span>
                      )}
                    </div>

                    {/* INFORMASI */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-base font-bold text-black-600">
                        {item.nama_alat}
                      </h3>

                      <p className="mt-2 whitespace-pre-line text-sm leading-5 text-black-600">
                        {item.deskripsi || "Tidak ada deskripsi."}
                      </p>

                      <div className="mt-4 rounded-lg bg-gray-50 p-3">
                        <h4 className="mb-2 text-xs font-bold text-black-600">
                          Harga Sewa
                        </h4>

                        <div className="space-y-2 text-xs">

                          <div className="flex justify-between gap-2">
                            <span className="text-black-600">
                              Per Hari
                            </span>

                            <span className="font-semibold text-black-600">
                              {formatRupiah(item.harga_hari)}
                            </span>
                          </div>

                          <div className="flex justify-between gap-2">
                            <span className="text-black-600">
                              Per Minggu
                            </span>

                            <span className="font-semibold text-black-600">
                              {formatRupiah(item.harga_minggu)}
                            </span>
                          </div>

                          <div className="flex justify-between gap-2">
                            <span className="text-black-600">
                              Per Bulan
                            </span>

                            <span className="font-semibold text-black-600">
                              {formatRupiah(item.harga_bulan)}
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* TOMBOL */}
                      <div className="mt-auto flex gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="flex-1 rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white-500"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="flex-1 rounded-lg bg-maroon-500 px-3 py-2 text-xs font-semibold text-white-500 hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

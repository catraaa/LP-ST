
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabaseClient";

const WHATSAPP_NUMBER = "6283856567166";

const formatRupiah = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Hubungi kami";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const getImageUrl = (path) => {
  if (!path) return "";

  // Hilangkan tanda petik jika ikut tersimpan di database
  const cleanPath = String(path).trim().replace(/^["']|["']$/g, "");

  if (cleanPath.startsWith("http")) {
    return cleanPath;
  }

  const { data } = supabase.storage
    .from("katalog")
    .getPublicUrl(cleanPath);

  return data?.publicUrl || "";
};

export default function Pricing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchKatalog();
  }, []);

  const fetchKatalog = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("katalog")
      .select(
        "id, nama_alat, deskripsi, harga_hari, harga_minggu, harga_bulan, gambar_path"
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil katalog:", error);
      setError("Katalog belum dapat ditampilkan. Silakan coba kembali.");
      setProjects([]);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  };

  const buatLinkWhatsApp = (project) => {
    const pesan = [
      `Halo, saya tertarik untuk menyewa ${project.nama_alat}.`,
      "",
      "Mohon informasi lebih lanjut mengenai ketersediaan alat dan pemesanan.",
      "",
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
  };

  const scrollAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="pricing"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* JUDUL */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollAnimation}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Katalog Unit Rental Alat Sipil Bali
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-black-500 md:text-base">
            Kami menyediakan berbagai pilihan alat untuk mendukung
            kebutuhan proyek konstruksi Anda dengan harga sewa yang
            kompetitif.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="py-16 text-center text-gray-500">
            Memuat katalog alat...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="py-12 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={fetchKatalog}
              className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* KATALOG KOSONG */}
        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            Belum ada alat yang tersedia.
          </div>
        )}

        {/* GRID KATALOG */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {projects.map((project, index) => {
              const imageUrl = getImageUrl(project.gambar_path);

              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={scrollAnimation}
                  transition={{
                    duration: 0.5,
                    delay: (index % 3) * 0.1,
                  }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* FOTO ALAT */}
             <div className="flex h-full w-full items-center justify-center bg-white-100 px-2">
  {imageUrl ? (
    <img
      src={imageUrl}
      alt={project.nama_alat}
      className="max-h-full max-w-full object-contain"
    />
  ) : (
    <div className="text-sm text-black-500">
      Foto belum tersedia
    </div>
  )}
</div>

                  {/* INFORMASI ALAT */}
                  <div className="flex flex-1 flex-col p-3">

                    <h3 className="text-base font-bold text-gray-900">
                    {project.nama_alat}
                  </h3>

                  <p className="mt-1 whitespace-pre-line text-xs leading-2 text-black-500">
                    {project.deskripsi || "Informasi alat belum tersedia."}
                  </p>

                    {/* DAFTAR HARGA */}
                    <div className="rounded-xl bg-gray-50 p-3">
                    <h4 className="mt-1 text-sm font-bold text-gray-800">
                      Harga Sewa
                    </h4>

                    <div className="space-y-1">

                        <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-2">
                          <span className="text-sm text-black-500">
                            Per Hari
                          </span>

                          <span className="text-right text-sm font-semibold text-black-500">
                            {formatRupiah(project.harga_hari)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-2">
                          <span className="text-sm text-black-500">
                            Per Minggu
                          </span>

                          <span className="text-right text-sm font-semibold text-black-500">
                            {formatRupiah(project.harga_minggu)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-black-500">
                            Per Bulan
                          </span>

                          <span className="text-right text-sm font-semibold text-black-500">
                            {formatRupiah(project.harga_bulan)}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* TOMBOL WHATSAPP */}
                    <motion.a
                      href={buatLinkWhatsApp(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white-500 shadow-md transition-colors duration-300 hover:bg-green-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.43ZM12.08 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.88 9.88 0 0 1-1.52-5.25c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.45 9.91-9.95 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                      </svg>

                      Hubungi via WhatsApp
                    </motion.a>

                  </div>
                </motion.div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabaseClient";

const WHATSAPP_NUMBER = "6283856567166";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

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

  const cleanPath = String(path)
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/^\/+/, "");

  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }

  return `${SUPABASE_URL}/storage/v1/object/public/katalog/${cleanPath
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
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
        "id, nama_alat, harga_hari, harga_minggu, harga_bulan, gambar_path"
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

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      pesan
    )}`;
  };

  const scrollAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="pricing"
      className="w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* JUDUL KATALOG */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollAnimation}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 w-full max-w-3xl text-center sm:mb-8"
        >
          <h2 className="break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Katalog Unit Rental Alat Sipil Bali
          </h2>

          <p className="mx-auto mt-3 max-w-2xl break-words text-sm leading-relaxed text-black-500 sm:text-base md:text-lg">
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
              className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
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
          <div className="grid w-full grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                    delay: (index % 4) * 0.1,
                  }}
                  className="group flex h-full w-full min-w-0 max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl xl:max-w-none"
                >
                  {/* FOTO ALAT */}
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gray-50">
                    {imageUrl ? (
                      <img
  src={imageUrl}
  alt={project.nama_alat || "Foto alat rental"}
  width="640"
  height="400"
  loading="eager"
  style={{
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
    position: "relative",
    zIndex: 1,
  }}
  className="p-2 transition duration-500 group-hover:scale-[1.03]"
/>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                        Foto belum tersedia
                      </div>
                    )}
                  </div>

                  {/* INFORMASI ALAT */}
                  <div className="flex min-w-0 flex-1 flex-col px-2 pt-1 pb-2 sm:px-5 sm:pt-2 sm:pb-3">
                    <h3 className="min-w-0 break-words text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                      {project.nama_alat}
                    </h3>

                    {/* HARGA SEWA */}
                    <div className="mt-0 pt-1">
                      <div className="rounded-xl bg-gray-50 px-3 py-1 sm:px-3 sm:py-1">
                        <h4 className="mb-1 text-sm font-bold sm:text-base">
                          Harga Sewa
                        </h4>

                        <div className="flex flex-col">
                          <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 py-1">
                            <span className="whitespace-nowrap text-xs text-black-500 sm:text-sm">
                              Per Hari
                            </span>
                            <span className="min-w-0 whitespace-nowrap text-right text-xs font-bold leading-tight text-gray-800 sm:text-sm">
                              {formatRupiah(project.harga_hari)}
                            </span>
                          </div>

                          <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 py-1">
                            <span className="whitespace-nowrap text-xs text-black-500 sm:text-sm">
                              Per Minggu
                            </span>
                            <span className="min-w-0 whitespace-nowrap text-right text-xs font-bold leading-tight text-gray-800 sm:text-sm">
                              {formatRupiah(project.harga_minggu)}
                            </span>
                          </div>

                          <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 py-1">
                            <span className="whitespace-nowrap text-xs text-black-500 sm:text-sm">
                              Per Bulan
                            </span>
                            <span className="min-w-0 whitespace-nowrap text-right text-xs font-bold leading-tight text-gray-800 sm:text-sm">
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
                        className="mt-3 inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-3 text-center text-sm font-semibold text-white-500 shadow-md transition-colors duration-300 hover:bg-green-600 sm:px-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 shrink-0"
                        >
                          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.43ZM12.08 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.88 9.88 0 0 1-1.52-5.25c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.45 9.91-9.95 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.17.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                        </svg>

                        <span>Hubungi via WhatsApp</span>
                      </motion.a>
                    </div>
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

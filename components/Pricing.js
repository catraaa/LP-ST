
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabaseClient";

const WHATSAPP_NUMBER = "6283856567166";

const formatRupiah = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};

const getImageUrl = (path) => {
  if (!path) return null;

  const cleanPath = String(path).replace(/^["']|["']$/g, "").trim();

  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }

  const { data } = supabase.storage
    .from("katalog")
    .getPublicUrl(cleanPath);

  return data?.publicUrl || null;
};

// Membuat link WhatsApp
const buatLinkWhatsApp = (item) => {
  const message = `Halo, saya ingin bertanya mengenai penyewaan ${item.nama_alat}. Mohon informasi lebih lanjut.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
};

const Pricing = () => {
  const [alat, setAlat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlat = async () => {
      try {
        const { data, error } = await supabase
          .from("katalog")
          .select(
            "id, nama_alat, harga_hari, harga_minggu, harga_bulan, gambar_path"
          )
          .order("id", { ascending: true });

        if (error) throw error;

        setAlat(data || []);
      } catch (error) {
        console.error("Gagal mengambil data katalog:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlat();
  }, []);

  return (
    <section id="pricing" className="w-full py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center sm:mb-8"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Katalog Alat
          </h2>
          <p className="mt-2 text-sm sm:text-base">
            Pilihan alat yang tersedia untuk kebutuhan proyek Anda.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center">
            Memuat katalog...
          </div>
        )}

        {/* Data kosong */}
        {!loading && alat.length === 0 && (
          <div className="py-10 text-center">
            Belum ada alat yang tersedia.
          </div>
        )}

        {/* Grid Katalog */}
        {!loading && alat.length > 0 && (
          <div className="grid w-full grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {alat.map((item, index) => {
              const imageUrl = getImageUrl(item.gambar_path);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="group flex h-full w-full min-w-0 max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl xl:max-w-none"
                >
                  {/* Foto */}
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gray-50">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.nama_alat || "Foto alat"}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                        Foto tidak tersedia
                      </div>
                    )}
                  </div>

                  {/* Informasi */}
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <h3 className="min-w-0 break-words text-base font-bold leading-snug sm:text-lg">
                      {item.nama_alat}
                    </h3>

                    {/* Harga */}
                    <div className="mt-auto space-y-2 pt-4">
  <div className="grid grid-cols-[minmax(76px,0.8fr)_minmax(0,1.2fr)] items-center gap-1 border-b border-gray-200 pb-2">
    <span className="whitespace-nowrap text-xs sm:text-sm">
      Per Hari
    </span>
    <span className="whitespace-nowrap text-right text-xs font-semibold sm:text-sm">
      {formatRupiah(item.harga_hari)}
    </span>
  </div>

  <div className="grid grid-cols-[minmax(76px,0.8fr)_minmax(0,1.2fr)] items-center gap-1 border-b border-gray-200 pb-2">
    <span className="whitespace-nowrap text-xs sm:text-sm">
      Per Minggu
    </span>
    <span className="whitespace-nowrap text-right text-xs font-semibold sm:text-sm">
      {formatRupiah(item.harga_minggu)}
    </span>
  </div>

  <div className="grid grid-cols-[minmax(76px,0.8fr)_minmax(0,1.2fr)] items-center gap-1 border-b border-gray-200 pb-2">
    <span className="whitespace-nowrap text-xs sm:text-sm">
      Per Bulan
    </span>
    <span className="whitespace-nowrap text-right text-xs font-semibold sm:text-sm">
      {formatRupiah(item.harga_bulan)}
    </span>
  </div>

                      {/* Tombol WhatsApp */}
                      <motion.a
                        href={buatLinkWhatsApp(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-1 inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-3 text-center text-sm font-semibold text-white-500 shadow-md transition-colors duration-300 hover:bg-green-600 sm:px-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 flex-shrink-0"
                        >
                          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.43ZM12.08 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.88 9.88 0 0 1-1.52-5.25c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.45 9.91-9.95 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                        </svg>

                        <span className="break-words">
                          Hubungi via WhatsApp
                        </span>
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
};

export default Pricing;

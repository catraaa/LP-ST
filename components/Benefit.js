import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const scrollAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Benefit = () => {
  const benefits = [
    {
      title: "HARGA HEMAT",
      description: "Bandingkan dan hemat! Kami menawarkan harga kompetitif untuk sewa per jam atau per hari yang ramah di kantong.",
      image: "/assets/i1.png",
    },
    {
      title: "TEPAT WAKTU",
      description: "Layanan kami selalu mengutamakan ketepatan dan kecepatan, memastikan setiap kebutuhan Anda terpenuhi tanpa penundaan",
      image: "/assets/i2.png",
    },
    {
      title: "KUALITAS UNGGUL",
      description: "Dengan peralatan unggul dan tim ahli, kami siap memberikan layanan yang terpercaya dan berstandar tinggi.",
      image: "/assets/i3.png",
    },
    {
      title: "SIAP PAKAI",
      description: "Kepuasan Anda adalah prioritas kami. Setiap alat berat yang dikirim selalu melewati pengecekan teliti demi performa optimal.",
      image: "/assets/i4.png",
    },
  ];

  return (
    <div className="max-w-screen-xl pt-12 px-6 sm:px-8 lg:px-16 mx-auto" id="benefit">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri: Penawaran */}
        <div className="pt-8 rounded-lg text-white">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <ScrollAnimationWrapper>
              <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-maroon-500" variants={scrollAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                Penawaran Spesial Untuk Anda
              </motion.h3>
            </ScrollAnimationWrapper>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimation}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                className="bg-white rounded-lg p-6 flex flex-col justify-between items-center transition-all duration-300 ease-in-out text-black"
              >
                <img src={item.image} alt={item.title} className="w-12 h-14 mb-2" />
                <h4 className="text-lg font-bold text-center">{item.title}</h4>
                <p className="text-center text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Tentang Perusahaan */}
        <div className="bg-maroon-500 p-4 rounded-lg flex flex-col">
          <h3 className="text-3xl font-medium mb-4 mt-8 text-white-500">SEWA ALAT BANGUNAN BALI - CV SARANA TEKNIK</h3>
          <p className="text-sm leading-relaxed text-white-500 mt-2">
            Sejak didirikan pada tahun 2019, CV Sarana Teknik telah menjadi pemain utama dalam industri penyewaan alat bangunan/kontraktor. Kami menawarkan berbagai jenis alat sebagai berikut:
          </p>

          <ul className="list-disc pl-6 text-sm leading-relaxed text-white-500 mt-2">
            <li>Blower 12 inch / hisap debu</li>
            <li>Compressor cat & texture</li>
            <li>Coring beton / lubang jalur pipa</li>
            <li>Cutting beton / aspal</li>
            <li>Dril / Jack dril beton dinding</li>
            <li>Genset / generator bensin 8kva</li>
            <li>Jack hammer beton ph65</li>
            <li>Pompa air / Alkon irigasi</li>
            <li>Power trowel / perata / penghalur cor</li>
            <li>Stamper kodok, pemadat paving</li>
            <li>Stamper pemadat tanah</li>
            <li>Vakum cleaner</li>
            <li>Vibrator cor, pemadat cor</li>
          </ul>
          <p className="text-sm leading-relaxed text-white-500 mt-4">Dengan tim manajemen yang solid, dukungan administrasi yang efisien, serta operator dan mekanik yang berpengalaman, kami siap memenuhi kebutuhan Anda!</p>
        </div>
      </div>
    </div>
  );
};

export default Benefit;

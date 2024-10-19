import React from "react";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const scrollAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Benefit = () => {
  const benefits = [
    {
      title: "Materi TWK, TIU, TKP",
      description: "Penjelasan lengkap dan latihan soal untuk Tes Wawasan Kebangsaan, Tes Intelegensi Umum, dan Tes Karakteristik Pribadi.",
    },
    {
      title: "Simulasi CAT",
      description: "Latihan menghadapi tes berbasis komputer dengan simulasi real-time.",
    },
    {
      title: "Bimbingan SKB & Wawancara",
      description: "Persiapan khusus untuk SKB & tahap wawancara agar Anda tampil maksimal.",
    },
    {
      title: "Bimbingan SKB & Wawancara",
      description: "Persiapan khusus untuk SKB & tahap wawancara agar Anda tampil maksimal.",
    },
    {
      title: "Bimbingan SKB & Wawancara",
      description: "Persiapan khusus untuk SKB & tahap wawancara agar Anda tampil maksimal.",
    },
    {
      title: "Bimbingan SKB & Wawancara",
      description: "Persiapan khusus untuk SKB & tahap wawancara agar Anda tampil maksimal.",
    },
  ];

  return (
    <div className="max-w-screen-xl pt-20 px-6 sm:px-8 lg:px-16 mx-auto" id="benefit">
      <div className="flex flex-col items-center justify-center text-center">
        <ScrollAnimationWrapper>
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl font-medium text-maroon-500"
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} // animasi sekali ketika viewport terlihat
          >
            Kenapa Kami Unggul?
          </motion.h3>
          <motion.p className="text-xl font-medium text-black-600" variants={scrollAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Kami menyediakan layanan terbaik untuk kebutuhan Anda.
          </motion.p>
        </ScrollAnimationWrapper>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={scrollAnimation}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} // efek saat hover yang lebih halus
            className="border-2 border-gray-100 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 ease-in-out max-w-[300px] mx-auto" // menambahkan max-w untuk batas ukuran box
          >
            <div className="flex justify-center items-center mb-4">
              <img
                src="/assets/Icon/user.png"
                alt={item.title}
                className="w-12 h-12" // Ukuran gambar lebih konsisten
              />
            </div>
            <h4 className="text-lg font-bold text-center">{item.title}</h4>
            <p className="text-black-500 text-center flex-grow">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Benefit;

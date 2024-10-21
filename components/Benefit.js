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
      title: "PAKET TRYOUT TERUPDATE",
      description: "Sudah disesuaikan dengan Kisi-Kisi terbaru di setiap tahunnya. Pengerjaan Tryout bisa diulang-ulang untuk mengasah kemampuan kamu menjawab soal seperti ujian aslinya.",
    },
    {
      title: "ANALIS KEMAMPUAN, PERANKINGAN DAN PEMBAHASAN",
      description: "Tersedia analis statistik kemampuan pengerjaan tes berupa Skor, Jawaban Benar Salah, Pembahasan serta Perankingan Nasional di setiap Tryout yang kamu kerjakan.",
    },
    {
      title: "ZOOM CLASS/LIVE STREAMING",
      description: "Belajar bareng Pengajar Pilihan dan Kompeten yang siap membimbing kamu selama proses pembelajaran berlangsung. Secret Formula dalam memecahkan soal berbasis trik cepat dan pendalaman konsep.",
    },
    {
      title: "GRUP BELAJAR EKSKLUSIF",
      description: "Diskusi dan sharing bahas soal tes bareng buat ningkatin pemahaman. Silakan curhat kekhawatiranmu kepada kami untuk diberikan solusi yang terbaik.",
    },
    {
      title: "VIDEO PEMBAHASAN SOAL",
      description: "Tersedia pembahasan soal berupa Video. Tonton video untuk memahami mulai dari dasar hingga lanjutan. Dijamin paham deh!",
    },
    {
      title: "KOLEKSI EBOOK",
      description: "Sudah kami siapkan puluhan ebook yang bisa dipelajari dan diakses kapanpun & dimanapun. Flexibel banget kan.",
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
            viewport={{ once: true }} 
          >
            Kenapa Kami Unggul?
          </motion.h3>
          <motion.p className="text-xl font-medium text-black-600" variants={scrollAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Kami menyediakan layanan terbaik untuk kebutuhan Anda.
          </motion.p>
        </ScrollAnimationWrapper>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
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
            <h4 className="text-sm font-bold text-center">{item.title}</h4>
            <p className="text-black-500 text-sm text-center flex-grow">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Benefit;

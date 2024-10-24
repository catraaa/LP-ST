import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Faq = () => {
  const [activeTab, setActiveTab] = useState(null);
  const refArray = useRef([]);
  const scrollAnimation = getScrollAnimation();

  const handleClick = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const getMaxHeight = (index) => {
    const ref = refArray.current[index];
    return activeTab === index && ref ? `${ref.scrollHeight}px` : "0px";
  };

  const rotateIcon = (index) => {
    return activeTab === index ? "rotate-180" : "";
  };

  return (
    <main className="p-5 md:p-20 h-auto" id="faq">
      <ScrollAnimationWrapper>
        <motion.h3 variants={scrollAnimation} className="text-center text-2xl md:text-3xl pb-10 font-semibold text-black-600 mb-4">
          Pertanyaan Yang Sering Ditanyakan <a className="text-maroon-500">(FAQ)</a>
        </motion.h3>
      </ScrollAnimationWrapper>

      {/* Konten FAQ */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center items-start">
        {/* Bagian Gambar */}
        <motion.div className="flex-1 flex justify-center md:justify-start mb-6 md:mb-0" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Image src="/assets/fa.png" alt="FAQ Image" width={400} height={400} className="object-cover w-full h-auto max-w-xs md:max-w-full" />
        </motion.div>

        {/* Bagian FAQ */}
        <div className="flex-1 w-full">
          <ul className="flex flex-col">
            {[
              {
                question: "Paket belajarnya bisa buat fresh graduate nggak ya?",
                answer:
                  "Bisa kak. Pembelajaran di CPNSINDONESIA.ONLINE bisa diikuti siapa aja. Materi dan seluruh konten belajar disusun berdasarkan KISI-KISI TERBARU dan mengacu ke REAL TEST / FIELD REPORT tahun sebelumnya. Sangat cocok apalagi buat yang baru pertama akan ikut tes seleksi.",
              },
              {
                question: "Apakah pembelajaran di CPNSINDONESIA.ONLINE dapat diakses menggunakan smartphone?",
                answer:
                  "Bisa dong! Kamu dapat mengakses akun belajar kamu menggunakan smartphone, laptop atau komputer. Kami sarankan menggunakan browser Chrome atau Firefox versi terbaru supaya lebih optimal! Belajar jadi makin FLEXIBEL dehh!",
              },
              {
                question: "Apakah disediakan rekaman ulang untuk peserta bimbel yang berhalangan hadir?",
                answer: "Yes, bener banget. Seluruh sesi pertemuan kelas bakal disediakan VIDEO REKAMAN ULANG dan FILE CORETAN yang udah dibahas bersama Mentor. Kualitas videonya juga bisa kamu atur mulai dari 480p, 720p hingga HD.",
              },
              {
                question: "Berapa lama masa berlaku paket yang saya beli?",
                answer: "Masa berlaku paket selama 1 periode yaitu sampai rangkaian akhir proses SELEKSI CASN BERAKHIR. Jadi benar-benar dibimbing sampai akhir seleksi. CPNSINDONESIA.ONLINE siap mendampingi kamu sampai lolos.",
              },
              {
                question: "Apakah pembayaran bisa melalui Bank, Alfamart dan E-Wallet?",
                answer: "Yaps! Kami menyediakan beragam metode untuk kemudahan pembayaran. Kamu bisa memilih metode pembayaran seperti Bank Transfer, Alfamart, dan E-wallet seperti Gopay, OVO, Dana, Shopeepay dan lain sebagainya.",
              },
              {
                question: "Apa yang harus saya lakukan jika sudah melakukan pembayaran?",
                answer:
                  "Setelah melakukan pendaftaran kamu akan otomatis mendapatkan pesan invoice pembayaran dari Admin melalui WhatsApp (Jadi, pastikan nomor kamu benar dan terdaftar di WhatsApp). Jika sudah melakukan pembayaran, kamu bisa mengirimkan bukti pembayaran ke Admin melalui WhatsApp yaa. Setelah itu akan langsung diberikan akses belajar.",
              },
            ].map((item, index) => (
              <motion.li
                className="bg-white my-2 shadow-lg rounded-md"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <h2 onClick={() => handleClick(index)} className="flex flex-row justify-between items-center p-3 cursor-pointer">
                  <span className="text-sm md:text-base">{item.question}</span>
                  <svg className={`fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500 ${rotateIcon(index)}`} viewBox="0 0 20 20">
                    <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                  </svg>
                </h2>
                <div ref={(el) => (refArray.current[index] = el)} style={{ maxHeight: getMaxHeight(index) }} className="border-l-2 border-maroon-500 overflow-hidden duration-500 transition-all">
                  <p className="p-3 text-sm md:text-base text-justify">{item.answer}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Faq;

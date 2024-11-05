import React from "react";
import ButtonPrimary from "./misc/ButtonPrimary";

const Hero = () => {
  return (
    <div className="relative h-screen w-full" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/1.jpg')",
          filter: "brightness(0.3)",
        }}
      ></div>
      {/* Overlay to Darken Background Further */}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Menambah lapisan overlay agar gambar lebih gelap */}
      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-8">
        <h1 className="text-3xl md:text-3xl font-bold text-white-500 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white-500">CV SARANA TEKNIK BALI</h1>
        <p className="text-xl md:text-l lg:text-l mt-4 max-w-5xl text-white-500">
          CV Sarana Teknik rental sewa alat bangunan Bali Termurah & Terlengkap. Melayani persewaan alat berbagai jenis dengan biaya terjangkau.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="https://wa.me/6281328409179" target="_blank" rel="noopener noreferrer">
            <ButtonPrimary className="px-6 py-3 text-lg">Konsultasi</ButtonPrimary>
          </a>
          <a href="#tentangKami">
            <ButtonPrimary className="px-6 py-3 text-lg">Katalog</ButtonPrimary>
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes typing {
          0% {
            width: 0;
          }
          50% {
            width: 90%; /* Teks penuh muncul di tengah siklus */
          }

        }
        .animate-typing {
          animation: typing 5s steps(30, end) infinite; /* Menggunakan infinite */
          white-space: nowrap; /* Pastikan teks tidak terputus */
          overflow: hidden; /* Menyembunyikan bagian yang tidak terlihat */
        }
      `}</style>
    </div>
  );
};

export default Hero;

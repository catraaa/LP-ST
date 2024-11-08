import React from "react";
import ButtonPrimary from "./misc/ButtonPrimary";

const Hero = () => {
  return (
    <div className="relative h-screen w-full" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/1.jpg')",
          filter: "brightness(0.2)",
        }}
      ></div>
      {/* Overlay to Darken Background Further */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white-500 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white">CV SARANA TEKNIK BALI</h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 max-w-4xl sm:max-w-5xl lg:max-w-6xl text-white-500">
          CV Sarana Teknik Bali rental sewa alat sipil/contractor Bali Termurah & Terlengkap. Melayani jasa coring beton dengan biaya terjangkau.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="https://wa.me/6283856567166" target="_blank" rel="noopener noreferrer">
            <ButtonPrimary className="px-6 py-3 text-lg sm:text-xl">Konsultasi</ButtonPrimary>
          </a>
          <a href="#pricing">
            <ButtonPrimary className="px-6 py-3 text-lg sm:text-xl">Katalog</ButtonPrimary>
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes typing {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-typing {
          animation: typing 5s steps(30, end) infinite;
          white-space: nowrap;
          overflow: hidden;
          border-right: 4px solid white;
          display: inline-block;
          max-width: 100%;
        }

        /* Responsiveness for different screen sizes */
        @media (max-width: 600px) {
          .animate-typing {
            width: 6ch; /* Adjust width for mobile */
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .animate-typing {
            width: 18ch;
          }
        }
        @media (min-width: 769px) {
          .animate-typing {
            width: 24ch;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;

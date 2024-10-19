import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Daftar logo untuk slider
const logos = [
  { id: 1, src: "/assets/ovo.png" },
  { id: 2, src: "/assets/gopay.png" },
  { id: 3, src: "/assets/dana.webp" },
  { id: 4, src: "/assets/bca.png" },
  { id: 5, src: "/assets/bni.png" },
  { id: 6, src: "/assets/bri.png" },
  { id: 7, src: "/assets/mandiri.png" },
  { id: 8, src: "/assets/ovo.png" },
  { id: 9, src: "/assets/gopay.png" },
  { id: 10, src: "/assets/dana.webp" },
  { id: 11, src: "/assets/bca.png" },
  { id: 12, src: "/assets/bni.png" },
  { id: 13, src: "/assets/bri.png" },
  { id: 14, src: "/assets/mandiri.png" },
  { id: 15, src: "/assets/ovo.png" },
  { id: 16, src: "/assets/gopay.png" },
  { id: 17, src: "/assets/dana.webp" },
  { id: 18, src: "/assets/bca.png" },
  { id: 19, src: "/assets/bni.png" },
  { id: 20, src: "/assets/bri.png" },
  { id: 21, src: "/assets/mandiri.png" },
];

const Unggul = () => {
  return (
    <div className="overflow-hidden w-full py-10 mb-10">
      {/* Judul Partner Pembayaran */}
      <div className="flex justify-center items-center text-black-600 font-bold mb-10 text-3xl">
        Partner
        <span className="text-maroon-500 ml-2">Pembayaran</span>
      </div>

      {/* Slider */}
      <div className="relative">
        <motion.div
          className="flex gap-8"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }} // Durasi animasi diubah agar lebih smooth
        >
          {/* Iterasi pertama logo */}
          {logos.map((logo) => (
            <div className="flex-shrink-0" key={logo.id}>
              <Image
                src={logo.src}
                alt={`Logo ${logo.id}`}
                width={100}
                height={60}
                layout="fixed"
                objectFit="contain"
              />
            </div>
          ))}

          {/* Iterasi kedua untuk loop tak terbatas */}
          {logos.map((logo) => (
            <div className="flex-shrink-0" key={`${logo.id}-duplicate`}>
              <Image
                src={logo.src}
                alt={`Logo ${logo.id}`}
                width={100}
                height={60}
                layout="fixed"
                objectFit="contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Unggul;

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState("CPNS");

  const projects = {
    CPNS: [
      {
        image: "/assets/poster.jpeg",
        title: "Seleksi Kompetensi Dasar (SKD)",
        price: "Rp15.000",
        originalPrice: "Rp20.000",
      },
      {
        image: "/assets/poster.jpeg",
        title: "Seleksi Kompetensi Bidang (SKB)",
        price: "Rp15.000",
        originalPrice: "Rp20.000",
      },
    ],
    PPPK: [
      {
        image: "/assets/poster.jpeg",
        title: "Promo PPPK 7.5 TopUp Saldo",
        price: "Rp15.000",
        originalPrice: "Rp20.000",
      },
    ],
  };

  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="w-full pt-20 mb-2" id="pricing">
      <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3 variants={scrollAnimation} className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">
              Pilihan <a className="text-maroon-500">Paket</a>
            </motion.h3>
          </ScrollAnimationWrapper>
        </div>

        {/* Category Buttons */}
        <ScrollAnimationWrapper>
          <motion.div className="flex justify-center space-x-6 mb-4 mt-4" variants={scrollAnimation}>
            {["CPNS", "PPPK"].map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer px-8 py-2 text-sm font-medium transition-colors duration-300 rounded-full shadow-lg ${
                  activeCategory === category
                    ? "bg-maroon-500 text-white-500" // Jika button aktif
                    : "border border-maroon-500 text-black bg-transparent" // Jika button tidak aktif
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Pricing Box */}
        <div className="flex flex-wrap justify-center mt-5 gap-8">
          {projects[activeCategory].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-full max-w-xs bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-300 dark:border-gray-400"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.15 },
              }}
            >
              <Image src={project.image} alt="Promo Image" width={300} height={280} quality={75} priority className="w-full h-auto rounded-t-lg" />
              <div className="px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight dark:text-white text-center">{project.title}</h5>
                <div className="flex flex-col items-center pt-2 text-center">
                  <span className="text-sm text-gray-400 line-through">{project.originalPrice}</span>
                  <span className="text-3xl font-bold text-maroon-500 dark:text-white">{project.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

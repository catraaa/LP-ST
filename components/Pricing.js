import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="bg-gradient-to-b from-white-300 to-white-500 w-full pt-20 mb-2" id="pricing">
      <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3 variants={scrollAnimation} className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">
              Pilih Promo
            </motion.h3>
            <motion.p variants={scrollAnimation} className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center">
              blablablablabla.
            </motion.p>
          </ScrollAnimationWrapper>
        </div>

        {/* BOX */}
        <div className="flex flex-col items-center justify-center mt-5">
          <ScrollAnimationWrapper>
            <motion.div
              variants={scrollAnimation}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <Image src="/assets/poster.jpeg" alt="Promo Image" width={300} height={280} className="w-full h-auto rounded-t-lg" />
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Promo FlashSale 5.5 TopUp Saldo</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1">
                    {/* Star Rating SVG */}
                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-black-600 dark:text-white">Rp10.000.000</span>
                  <a
                    href="#"
                    className="text-white-500 bg-maroon-500 hover:bg-maroon-600 focus:ring-4 focus:outline-none focus:ring-maroon-300 font-medium rounded-lg text-lg px-5 py-2.5 min-w-[120px] text-center transition-all duration-200"
                  >
                    Beli
                  </a>
                </div>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

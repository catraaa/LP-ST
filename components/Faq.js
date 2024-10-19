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
      {" "}
      {/* Ubah h-screen menjadi h-auto */}
      <ScrollAnimationWrapper>
        <motion.h3 variants={scrollAnimation} className="text-center text-3xl pb-10 font-semibold text-black-600 mb-4">
          Pertanyaan Yang Sering Ditanyakan <a className="text-maroon-500">(FAQ)</a>
        </motion.h3>
      </ScrollAnimationWrapper>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center items-start">
        <motion.div className="flex-1 flex justify-center md:justify-start mb-6 md:mb-0" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Image src="/assets/fa.png" alt="Promo Image" width={400} height={400} className="object-cover" />
        </motion.div>
        <div className="flex-1 md:ml-4">
          <ul className="flex flex-col">
            {[
              { question: "Pertanyaan 1?", answer: "Jawaban 1." },
              { question: "Pertanyaan 2?", answer: "Jawaban 2." },
              { question: "Pertanyaan 3?", answer: "Jawaban 3." },
              { question: "Pertanyaan 4?", answer: "Jawaban 4." },
              { question: "Pertanyaan 5?", answer: "Jawaban 5." },
            ].map((item, index) => (
              <motion.li
                className="bg-white my-2 shadow-lg rounded-md" // Menambahkan rounded-md
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <h2 onClick={() => handleClick(index)} className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer">
                  <span className="text-sm md:text-base">{item.question}</span> {/* Ubah ukuran teks */}
                  <svg className={`fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500 ${rotateIcon(index)}`} viewBox="0 0 20 20">
                    <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                  </svg>
                </h2>
                <div ref={(el) => (refArray.current[index] = el)} style={{ maxHeight: getMaxHeight(index) }} className="border-l-2 border-maroon-500 overflow-hidden duration-500 transition-all">
                  <p className="p-3 text-gray-900 text-sm md:text-base">{item.answer}</p> {/* Ubah ukuran teks */}
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
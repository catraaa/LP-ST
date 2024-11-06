import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const scrollAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Pricing = () => {
  const projects = [
    {
      image: "/assets/stemper.jpg",
      title: "Stamper Pemadat Tanah",
      description2: "Rp.10.000.00/jam.",
      description3: "Rp.10.000.00/hari.",
      whatsappLink: "https://wa.me/6285608360196",
    },
    {
      image: "/assets/kodok.jpg",
      title: "Stamper Kodok",
      description1: "Alat atau mesin untuk meratakan & memadatkan permukaan paving/aspal.",
      description2: "Rp.10.000.00/hari.",
      description3: "Rp.10.000.00/hari.",
      whatsappLink: "https://wa.me/6285608360196",
    },
    {
      image: "/assets/jh.png",
      title: "Jack hammer",
      description1: "Jack hammer beton ph65 menghancurkan permukaan keras beton, aspal, dan batu.",
      description2: "Rp.150.000/hari.",
      description3: "Rp.900.000/minggu.",
      description4: "Rp.2.750.000/bulan.",
      whatsappLink: "https://wa.me/6285608360196",
    },
    {
      image: "/assets/blower.png",
      title: "Blower 12 inch",
      description1: "Alat hisap debu dan kotoran dengan diameter saluran hisap/output 12 inci.",
      description2: "Rp.150.000/hari.",
      description3: "Rp.900.000/minggu.",
      description4: "Rp.2.750.000/bulan.",
      whatsappLink: "https://wa.me/6285608360196",
    },
    {
      image: "/assets/stemper.jpg",
      title: "Stamper Pemadat Tanah",
      description2: "Rp.10.000.00/jam.",
      description3: "Rp.10.000.00/hari.",
      whatsappLink: "https://wa.me/6285608360196",
    },
  ];

  return (
    <div className="w-full pt-20 mb-2" id="pricing">
      <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">
            Katalog Unit <a className="text-maroon-500">Rental Alat</a>
          </h3>
        </div>

        {/* Pricing Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={scrollAnimation}
              transition={{ duration: 0.3, delay: index * 0.1 }} // Menyesuaikan durasi dan delay untuk setiap box
              className="bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-300 dark:border-gray-400"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.15 },
              }}
            >
              <Image
                src={project.image}
                alt="Promo Image"
                width={300}
                height={200}
                quality={75}
                priority
                className="w-full h-auto rounded-t-lg" // Gambar responsif
              />
              <div className="px-5 pb-5">
                <h5 className="text-l font-semibold tracking-tight dark:text-white text-center">{project.title}</h5>
                <p className="text-xs text-gray-200 text-centertext-xs mb-2">{project.description1}</p>
                <p className="text-xs text-black-600 text-center">{project.description2}</p>
                <p className="text-xs text-black-600 text-center">{project.description3}</p>
                <p className="text-xs text-black-600 text-center">{project.description4}</p>
                <a href={project.whatsappLink} className="mt-4 inline-block w-3/4 mx-auto px-4 py-2 text-sm font-medium text-white-500 bg-maroon-500 rounded hover:bg-maroon-600 transition" target="_blank" rel="noopener noreferrer">
                  Sewa
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

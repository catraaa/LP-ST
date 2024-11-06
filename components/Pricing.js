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
      image: "/assets/stamper.jpg",
      title: "Stamper Pemadat Tanah",
      description1: "Alat yang digunakan untuk memadatkan tanah, aspal, dan susunan batu.",
      description2: "Rp250.000/jam",
      description3: "Rp1.450.000/hari",
      description4: "Rp4.500.00/hari",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/kodok.jpg",
      title: "Stamper Kodok",
      description1: "Alat atau mesin untuk meratakan & memadatkan permukaan paving/aspal.",
      description2: "Rp.200.000/hari",
      description3: "Rp.1.200.000/minggu",
      description4: "Rp.3.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/jack.jpg",
      title: "Jack Hammer",
      description1: "Jack hammer beton ph65 menghancurkan permukaan keras beton, aspal, dan batu.",
      description2: "Rp.150.000/hari",
      description3: "Rp.900.000/minggu",
      description4: "Rp.2.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/blower.jpg",
      title: "Blower 12 inch",
      description1: "Alat hisap debu dan kotoran dengan diameter saluran hisap/output 12 inci.",
      description2: "Rp.150.000/hari",
      description3: "Rp.900.000/minggu",
      description4: "Rp.2.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/compressor.jpg",
      title: "Compressor Cat & Texture",
      description1: "Alat untuk mengecat dengan tekstur, yaitu alat semprot cat tekstur atau spray gun texture.",
      description2: "Compressor 3/4: Rp85.000/hari | Rp500.000/minggu",
      description3: "Compressor 1 hp: Rp100.000/hari | Rp600.000/minggu",
      description4: "Compressor 2 hp: Rp125.000/hari | Rp800.000/minggu",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/coring.jpg",
      title: "Coring Beton",
      description1: "Coring beton/lubang jalur pipa alat untuk melubangi beton atau jalur pipa",
      description2: "Rp250.000/hari",
      description3: "Rp1.450.000/minggu",
      description4: "Rp4.500.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/cutting.jpg",
      title: "Cutting Beton/Aspal",
      description1: "Cutting beton/aspal alat yang digunakan untuk memotong beton atau aspal.",
      description2: "Rp500.000/hari",
      description3: "Rp2.750.000/minggu",
      description4: "Rp4.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/drill.jpg",
      title: "Dril/Jack",
      description1: "Dril/Jack dril beton dinding Alat untuk mengebor/membongkar beton dinding.",
      description2: "Rp125.000/hari",
      description3: "Rp800.000/minggu",
      description4: "Rp2.250.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/genset.jpg",
      title: "Genset/Generator",
      description1: "Genset/generator tedapat 2 tipe dengan bensin 3kva & 7kva.",
      description2: "Rp200.000/hari | Rp300.000/hari",
      description3: "Rp1.200.000/minggu | Rp1.750.000/minggu",
      description4: "Rp3.500.000/bulan | Rp4.500.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/pompa.jpg",
      title: "Pompa air/Alkon irigasi",
      description1: "Pompa air atau Alkon irigasi air memiliki tipe atau ukuran 2 inch & 3 inch.",
      description2: "Rp150.000/hari | Rp200.000/hari",
      description3: "Rp900.000/minggu | Rp1.200.000/minggu",
      description4: "Rp2.750.000/bulan | Rp3.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/power.jpg",
      title: "Power Trowel",
      description1: "Power trowel/perata/penghalur cor alat untuk ratakan, haluskan, dan padatkan permukaan beton.",
      description2: "Rp500.000/hari",
      description3: "Rp2.750.000/minggu",
      description4: "Rp4.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/vacum.jpeg",
      title: "Vakum Cleaner",
      description1: "Vakum clenner/blower alat untu menyedot debu dan meniup 12 inch.",
      description2: "Rp125.000/hari",
      description3: "Rp800.000/minggu",
      description4: "Rp2.250.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/vibrator.jpg",
      title: "Vibrator Cor",
      description1: "Vibrator engine/bensin & Vibrator electrik/listrik 1phase.",
      description2: "Rp300.000/hari | Rp350.000/hari",
      description3: "Rp1.750.000/minggu | Rp1.850.000/minggu",
      description4: "Rp4.500.000/bulan | Rp4.750.000/bulan",
      whatsappLink: "https://wa.me/6283856567166",
    },
    {
      image: "/assets/jasa.jpg",
      title: "Jasa Coring",
      description1: "Jasa coring + alat.",
      description2: "Rp250.000 / lubang / titik",
      whatsappLink: "https://wa.me/6283856567166",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
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

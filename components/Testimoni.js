import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Stars from "../public/assets/Icon/stars.svg";
import ArrowBack from "../public/assets/Icon/eva_arrow-back-fill.svg";
import ArrowNext from "../public/assets/Icon/eva_arrow-next-fill.svg";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Testimoni = ({
  listTestimoni = [
    {
      name: "Oktanova Lubis",
      image: "/assets/oktanova.png",
      city: "Kejaksaan",
      rating: "5.0",
      testimoni:
        "Tryout di cpnsindonesia.online sangat membantu persiapan saya menghadapi seleksi. Soal-soalnya sangat update dan mirip sama tes aslinya. Dijamin bakal terbiasa dalam ngerjain berbagai jenis soal mulai yang dasar sampai yang HOTS. Big Thanks to cpnsindonesia.online. Sangat direkomendasikan bagi siapa pun yang ingin sukses dalam ujian CPNS.",
    },
    {
      name: "Dayu Sri Devi",
      image: "/assets/dayu.png",
      city: "KEMENKUMHAM",
      rating: "5.0",
      testimoni:
        "Bener-bener keren banget sih cpnsindonesia.online. Mulai dari Mentor Pengajar, Tryout, dan fasilitas lainnya sangat bagus. Karena Tryoutnya pakai sistem CAT jadi bisa belajar atur waktu buat ngerjain. Soal-soalnya bikin muter otak bangettt sangking HOTSnya. Tapi pembahasannya juga nggak kalah, super lengkap.",
    },
    {
      name: "Muhammad Alwi",
      image: "/assets/alwi.png",
      city: "Badan Keuangan dan Aset Daerah",
      rating: "5.0",
      testimoni:
        "Buat kalian calon ASN jangan ragu buat pilih bimbel cpnsindonesia.online. Selain Aksesnya Flexibel bisa kapan aja & dimana aja, penjelasan yang diberikan mudah dimengerti. Prinsip soal yang diberikan nggak jauh beda sama soal-soal tes aslinya. Saya merasa lebih percaya diri setelah mengikuti tryout dan bimbingan di sini.",
    },
    {
      name: "Nurul Asmi",
      image: "/assets/nurul.png",
      city: "RSUP Dr. Wahidin Sudirohusodo Makassar",
      rating: "5.0",
      testimoni:
        "Daftar bimbel di cpnsindonesia.online karena rekomendasi dari temen. Awalnya ragu, tapi pas udah gabung ternyata diluar prediksi. Pembelajarannya sangat terarah. Mulai dari jadwal zoom, bebas akses tryout kapan aja, materi belajar, dsb.TOP BANGETTT deh, berkat gabung bimbelnya saya jadi makin rajin belajar.",
    },
    {
      name: "Faisal.B",
      image: "/assets/faisal.png",
      city: "PENYULUH KESEHATAN - Kab. Bulukumba",
      rating: "5.0",
      testimoni:
        "Pertama saya ucapkan terima kasih untuk cpnsindonesia.online karna telah memberikan wadah untuk menimbah ilmu, bekal untuk berjuang di TAHAP SELEKSI CASN. Saya bisa menyiapkan semua Amunisi saya sebelum Berjuang. Kuncinya adalah usaha keras, optimis dan yakin kamu bisa lolos.",
    },
    {
      name: "Tiwi",
      image: "/assets/tiwi.png",
      city: "AUDITOR - Inspektorat Sulawesi Selatan",
      rating: "5.0",
      testimoni:
        "Sehari ngerjakan 1 Tryout itu wajib kalau kamu memang benar-benar ingin lolos CASN. Soal Tryout yang disediakan cpnsindonesia.online bervariasi jadi bisa banget buat melatih kemampuan terutama dalam pemahaman soal. Jadi waktu tes asli nggak kaget kalau dapet soal susah. Makasih banget cpnsindonesia.online.",
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (i) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all"></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [sliderRef, setSliderRef] = useState(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  // Animasi untuk setiap testimoni
  const testimonialAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="z pt-20 mx-auto max-w-6xl" id="testimoni">
      <div className="mb-10">
        <ScrollAnimationWrapper>
          <motion.h3 whileInView="visible" variants={scrollAnimation} className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed text-center">
            Dipercaya oleh Ribuan Pelanggan
          </motion.h3>
          <motion.p variants={scrollAnimation} className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center text-maroon-500 font-bold">
            Testimoni CPNS & PPPK
          </motion.p>
        </ScrollAnimationWrapper>
      </div>

      <Slider {...settings} arrows={false} ref={setSliderRef} className="flex items-stretch justify-items-stretch">
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={testimonialAnimation}
              transition={{ duration: 1 }}
              className="border-2 border-gray-500 hover:border-maroon-500 transition-all rounded-lg p-4 flex flex-col h-70 overflow-hidden" // Menyediakan tinggi yang konsisten
            >
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center flex-grow">
                <div className="flex order-2 xl:order-1">
                  <div className="relative w-12 h-12">
                    <Image src={listTestimonis.image} layout="fill" objectFit="cover" alt="Icon People" />
                  </div>
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-black-600 font-semibold capitalize">{listTestimonis.name}</p>
                    <p className="text-sm text-black-500 capitalize">{listTestimonis.city}</p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex ml-4">
                    <Stars className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-sm text-justify leading-relaxed flex-grow">{`“${listTestimonis.testimoni}”`}</p>
            </motion.div>
          </div>
        ))}
      </Slider>

      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-maroon-500 border hover:bg-maroon-500 hover:text-white-500 transition-all text-maroon-500 cursor-pointer"
            onClick={() => sliderRef?.slickPrev()}
          >
            <ArrowBack className="h-6 w-6 " />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-maroon-500 border hover:bg-maroon-500 hover:text-white-500 transition-all text-maroon-500 cursor-pointer"
            onClick={() => sliderRef?.slickNext()}
          >
            <ArrowNext className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimoni;

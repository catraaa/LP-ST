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
      name: "Beni",
      image: "/assets/people-3.png",
      city: "KPP Jakarta",
      country: "Indonesia",
      rating: "4.8",
      testimoni: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac maximus ante, et auctor lectus.",
    },
    {
      name: "Tiyas",
      image: "/assets/people-3.png",
      city: "KPP Jombang",
      country: "Indonesia",
      rating: "4.9",
      testimoni: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac maximus ante, et auctor lectus.",
    },
    {
      name: "Kristanti",
      image: "/assets/people-3.png",
      city: "KPP Jombang",
      country: "Indonesia",
      rating: "4.9",
      testimoni: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac maximus ante, et auctor lectus.",
    },
    {
      name: "Aku Testi",
      image: "/assets/people-3.png",
      city: "KPP Jombang",
      country: "Indonesia",
      rating: "4.9",
      testimoni: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac maximus ante, et auctor lectus.",
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

  // Definisikan animasi untuk setiap testimoni
  const testimonialAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="z pt-28 mx-auto max-w-6xl" id="testimoni">
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
            <motion.div initial="hidden" whileInView="visible" variants={testimonialAnimation} transition={{ duration: 1 }} className="border-2 border-gray-500 hover:border-maroon-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image src={listTestimonis.image} layout="intrinsic" width={50} height={50} objectFit="cover" alt="Icon People" />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-black-600 capitalize">{listTestimonis.name}</p>
                    <p className="text-sm text-black-500 capitalize">
                      {listTestimonis.city}, {listTestimonis.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex ml-4">
                    <Stars className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{listTestimonis.testimoni}”.</p>
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

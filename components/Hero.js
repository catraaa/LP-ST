import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Hero = ({
  listUser = [
    {
      name: "Member",
      number: "139.000",
      icon: "/assets/Icon/user.png",
    },
    {
      name: "Paket",
      number: "200",
      icon: "/assets/Icon/soal.png",
    },
    {
      name: "Lolos CPNS & PPPK",
      number: "50.000",
      icon: "/assets/Icon/lolos.png",
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl mt-16 px-8 xl:px-16 mx-auto" id="about">
      <ScrollAnimationWrapper>
        {/* Menggunakan flex-col untuk membuat teks berada di atas dan text-center di mobile */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-8 py-6 sm:py-16" variants={scrollAnimation}>
          {/* Bagian Teks */}
          <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left w-full sm:w-1/2">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-maroon-500 leading-normal">DIBIMBING DARI NOL!</h1>
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600 leading-normal mt-2">Belajar materi dan soal cpns & pppk sesuai kisi-kisi.</h1>
            <p className="text-base lg:text-lg text-black-600 mt-4">
              CPNS INDONESIA ONLINE.id adalah e-Learning Persiapan Seleksi CPNS PPPK 2024. Kami akan membantu kamu belajar dari 0. belajar dari awal, sampai mencapai nilai terbaik dengan Jurus Sakti Lolos ASN 2024.
            </p>
            <div className="mt-6">
              <a href="https://www.example.com">
                <ButtonPrimary className="text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3">Daftar Promo</ButtonPrimary>
              </a>
            </div>
          </div>

          {/* Bagian Gambar */}
          <div className="flex justify-center w-full sm:w-1/2">
            <motion.div className="w-2/3 sm:w-full" variants={scrollAnimation}>
              <Image src="/assets/w3.png" alt="VPN Illustrasi" quality={100} width={205} height={245} layout="responsive" />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>

      {/* Bagian User Stats */}
      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div className="flex items-center justify-center sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0" key={index} custom={{ duration: 2 + index }} variants={scrollAnimation}>
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-maroon-100 w-16 h-16 mr-6 rounded-full">
                  <Image src={listUsers.icon} alt={listUsers.name} width={48} height={48} className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">{listUsers.number}+</p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0" style={{ filter: "blur(114px)" }}></div>
      </div>
    </div>
  );
};

export default Hero;

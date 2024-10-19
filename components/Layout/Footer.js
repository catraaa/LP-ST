import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gray-600 pt-10 pb-5">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          <div className="flex flex-nowrap">
            <Image src="/assets/logo_cpnsindonesiaonline.png" alt="Logo CPNS INDONESIA ONLINE" className="h-9 w-auto mb-6" width={150} height={50} />
          </div>

          <p className="mb-4">
            <strong className="font-semibold">CPNS INDONESIA ONLINE</strong> adalah e-Learning Persiapan Seleksi CPNS PPPK.
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://wa.me/6287741064490" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/wa.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
              </a>
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://www.instagram.com/cpnsindonesia.online/" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/ig.png" alt="Instagram" width={32} height={32} className="w-8 h-8" />
              </a>
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/tt.png" alt="Twitter" width={32} height={32} className="w-8 h-8" />
              </a>
            </div>
          </div>
          <p className="text-gray-400">©{new Date().getFullYear()} - CPNS INDONESIA ONLINE</p>
        </div>

        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Menu</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#about">Tentang</a>
            </li>
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#galeri">Tampilan</a>
            </li>
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#benefit">Benefit</a>
            </li>
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#pricing">Promo</a>
            </li>
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#testimoni">Testimoni</a>
            </li>
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Partner Kami</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">Aku </li>
            <li className="my-2 hover:text-maroon-500 cursor-pointer transition-all">Kamu </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gray-600 flex flex-col justify-between h-full pt-6">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        {/* Logo dan Deskripsi */}
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <div className="flex flex-nowrap mb-2">
            <Image src="/assets/logo6.png" alt="Logo SARANA TEKNIK" className="h-9 w-auto" width={104} height={60} />
          </div>
          <p className="mb-1 text-sm md:text-base">
            <strong className="font-semibold">CV Sarana Teknik Bali</strong> - Terdiri dari banyak tenaga ahli profesional dalam bidang kontruksi. Kami selalu berusaha menjadi yang terbaik dan selalu menjadi mitra kerja yang terpercaya.
          </p>

          {/* Ikon Media Sosial */}
          <div className="flex w-full mt-2 mb-2 space-x-4">
            <div className="bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://wa.me/6283856567166" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/wa.png" alt="WhatsApp" width={34} height={34} className="w-8 h-8" />
              </a>
            </div>
            <div className="bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://www.instagram.com/cv.sarana_teknik?igsh=MW9lcjBmbnZvNzh4dg==" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/ig.png" alt="Instagram" width={29} height={29} className="w-8 h-8" />
              </a>
            </div>
            <div className="bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://www.facebook.com/profile.php?id=61563443217453" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/fb.png" alt="Facebook" width={32} height={32} className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-8 flex flex-col mb-2 sm:mb-0">
          <p className="text-black-600 mb-2 font-medium text-lg">Menu</p>
          <ul className="text-black-500 text-sm md:text-base">
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#home">Home</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#benefit">Tentang</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#pricing">Katalog</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#galeri">Galeri</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#map">Lokasi</a>
            </li>
          </ul>
        </div>

        {/* Daftar Produk */}
        <div className="row-span-2 sm:col-span-4 sm:col-start-9 sm:col-end-16 flex flex-col">
          <p className="text-black-600 mb-2 font-medium text-lg">Produk Kami</p>
          <div className="flex gap-4 text-black-500 text-sm md:text-base">
            <ul className="list-disc list-inside">
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all whitespace-nowrap">Blower 12 inch | Jack hammer</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Compressor | Pompa air</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Coring beton | Power trowel</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Cutting beton/aspal</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Dril/Jack | Stamper</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Genset | Vakum cleaner</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Stamper kodok | Vibrator cor</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Teks Hak Cipta di Paling Bawah */}
      <p className="text-gray-400 text-sm px-6 py-2 text-center">©{new Date().getFullYear()} - SARANA TEKNIK BALI</p>
    </div>
  );
};

export default Footer;

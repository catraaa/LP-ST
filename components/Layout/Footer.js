import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gray-600 flex flex-col justify-between h-full pt-6">
      {" "}
      {/* Menggunakan flex untuk mengatur tata letak */}
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        {/* Logo dan Deskripsi */}
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <div className="flex flex-nowrap mb-2">
            <Image src="/assets/logo1.png" alt="Logo SARANA TEKNIK" className="h-9 w-auto" width={104} height={60} />
          </div>
          <p className="mb-1 text-sm md:text-base">
            <strong className="font-semibold">CV Sarana Teknik</strong> Sewa alat - proyek bangunan di Bali. Terdiri dari banyak tenaga ahli profesional dalam bidang kontruksi. Kami selalu berusaha menjadi yang terbaik dan selalu menjadi
            mitra kerja yang terpercaya.
          </p>

          {/* Ikon Media Sosial */}
          <div className="flex w-full mt-2 mb-4 -mx-2">
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://wa.me/6285608360196" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/wa.png" alt="WhatsApp" width={34} height={34} className="w-8 h-8" />
              </a>
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <a href="https://www.instagram.com/cv.sarana_teknik" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/Icon/ig.png" alt="Instagram" width={29} height={29} className="w-8 h-8" />
              </a>
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
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
              <a href="#about">Home</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#galeri">Tentang</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#benefit">Katalog</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#pricing">Galeri</a>
            </li>
            <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">
              <a href="#testimoni">Lokasi</a>
            </li>
          </ul>
        </div>

        {/* Daftar Produk */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-13 flex flex-col mb-2 sm:mb-0">
          <p className="text-black-600 mb-2 font-medium text-lg">Produk Kami</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black-500 text-sm md:text-base">
            <ul className="list-disc list-inside">
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Blower 12 inch</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Compressor</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Coring beton</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Cutting beton/aspal</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Dril/Jack</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Genset</li>
            </ul>
            <ul className="list-disc list-inside">
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Jack hammer</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Pompa air</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Power trowel</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Stamper kodok</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Stamper</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Vakum cleaner</li>
              <li className="my-1 hover:text-maroon-500 cursor-pointer transition-all">Vibrator cor</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Teks Hak Cipta di Paling Bawah */}
      <p className="text-gray-400 text-sm px-24 py-2">©{new Date().getFullYear()} - SARANA TEKNIK BALI</p>
    </div>
  );
};

export default Footer;

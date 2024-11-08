import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Galeri = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  };

  const images = [
    { src: "/assets/g1.jpg", caption: "Blower 12 inch" },
    { src: "/assets/g2.jpg", caption: "Proyek Compressor cat dan texture" },
    { src: "/assets/g3.jpg", caption: "Proyek Cutting beton" },
    { src: "/assets/g4.jpg", caption: "Compressor cat dan texture" },
    { src: "/assets/g6 (2).jpg", caption: "Proyek Genset" },
    { src: "/assets/g5.jpg", caption: "Proyek Jack drill beton/dinding" },
    { src: "/assets/g7.jpg", caption: "Proyek Jack hammer" },
    { src: "/assets/g8.jpg", caption: "Proyek Pompa air" },
    { src: "/assets/g9.jpg", caption: "Proyek Power trowel" },
    { src: "/assets/g10.jpg", caption: "Proyek Satmper kodok" },
    { src: "/assets/g11.jpg", caption: "Proyek Stamper pemadat tanah" },
    { src: "/assets/g12.jpg", caption: "Proyek Vibrator cor" },
    { src: "/assets/g13.jpg", caption: "Proyek Coring beton" },
    { src: "/assets/g14.jpg", caption: "Proyek Blower 12 inch" },
    { src: "/assets/g15.jpg", caption: "Proyek Cutting beton" },
    { src: "/assets/g16.jpg", caption: "Proyek Jack drill beton/dinding" },
    { src: "/assets/g6.jpg", caption: "Proyek Genset" },
    { src: "/assets/g17.jpg", caption: "Proyek Jack hammer" },
    { src: "/assets/g18.jpg", caption: "Proyek Pompa air" },
    { src: "/assets/g19.jpg", caption: "Proyek Stamper kodok" },
  ];

  return (
    <div className="pt-20 md:p-20" id="galeri">
      <h3 className="text-center text-2xl md:text-3xl pb-10 font-semibold text-black-600">Galeri Proyek</h3>
      <Slider {...settings} className="rounded-lg">
        {images.map((image, index) => (
          <div key={index} className="p-2">
            <div className="relative h-64 md:h-80">
              <Image src={image.src} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
              <div className="absolute bottom-0 w-full bg-maroon-500 text-white-500 text-center py-2">{image.caption}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Tombol Previous
const PreviousArrow = ({ onClick }) => (
  <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
    <div className="bg-white-500 hover:bg-white/80 rounded-full p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  </div>
);

// Tombol Next
const NextArrow = ({ onClick }) => (
  <div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
    <div className="bg-white-500 hover:bg-white/80 rounded-full p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

export default Galeri;

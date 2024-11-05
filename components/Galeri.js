  import React from "react";
  import Slider from "react-slick";
  import Image from "next/image";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";

  const Galeri = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3, // Menampilkan 3 gambar per slide
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: <PreviousArrow />,
      nextArrow: <NextArrow />,
    };

    const images = [
      { src: "/assets/g1.jpg", caption: "Gambar 1 - Proyek A" },
      { src: "/assets/g2.jpg", caption: "Gambar 2 - Proyek B" },
      { src: "/assets/bg.jpg", caption: "Gambar 3 - Proyek C" },
      { src: "/assets/Icon/wa.png", caption: "Gambar 4 - Ikon WA" },
      { src: "/assets/Icon/wa.png", caption: "Gambar 5 - Ikon WA" },
    ];

    return (
      <div className="pt-20 md:p-20" id="galeri">
        <h3 className="text-center text-2xl md:text-3xl pb-10 font-semibold text-black-600">Galeri Proyek</h3>
        <Slider {...settings} className="rounded-lg">
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <div className="relative h-64 md:h-80">
                <Image src={image.src} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2">{image.caption}</div>
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
      <div className="bg-white/50 hover:bg-white/80 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </div>
  );

  // Tombol Next
  const NextArrow = ({ onClick }) => (
    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
      <div className="bg-white/50 hover:bg-white/80 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  export default Galeri;

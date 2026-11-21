
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../utils/supabaseClient";

// Membersihkan tanda petik pada path gambar
const cleanImagePath = (path) => {
  if (!path) return "";

  return String(path)
    .trim()
    .replace(/^["']|["']$/g, "");
};

// Mengambil URL gambar Supabase
const getImageUrl = (path) => {
  const cleanPath = cleanImagePath(path);

  if (!cleanPath) return "";

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  const { data } = supabase.storage
    .from("galeri")
    .getPublicUrl(cleanPath);

  return data?.publicUrl || "";
};

// Tombol Previous
const PreviousArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer"
    onClick={onClick}
  >
    <div className="rounded-full bg-white p-2 shadow-md transition hover:bg-white/80">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  </div>
);

// Tombol Next
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer"
    onClick={onClick}
  >
    <div className="rounded-full bg-white p-2 shadow-md transition hover:bg-white/80">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  </div>
);

const Galeri = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data proyek dan foto dari Supabase
  useEffect(() => {
    let mounted = true;

    const fetchGaleri = async () => {
      try {
        const { data: projects, error: projectError } =
          await supabase
            .from("galeri_proyek")
            .select("id, judul, deskripsi, created_at")
            .order("id", { ascending: false });

        if (projectError) throw projectError;

        const projectIds = (projects || []).map(
          (project) => project.id
        );

        if (projectIds.length === 0) {
          if (mounted) {
            setImages([]);
            setLoading(false);
          }
          return;
        }

        const { data: photos, error: photoError } =
          await supabase
            .from("galeri_foto")
            .select("id, proyek_id, gambar_path")
            .in("proyek_id", projectIds)
            .order("id", { ascending: true });

        if (photoError) throw photoError;

        const projectMap = {};

        projects.forEach((project) => {
          projectMap[String(project.id)] = project;
        });

        const galleryImages = (photos || [])
          .map((photo) => {
            const project = projectMap[String(photo.proyek_id)];

            if (!project) return null;

            return {
              id: photo.id,
              src: getImageUrl(photo.gambar_path),
              caption: project.judul,
              description: project.deskripsi,
            };
          })
          .filter((image) => image && image.src);

        if (mounted) {
          setImages(galleryImages);
          setLoading(false);
        }
      } catch (error) {
        console.error("Gagal mengambil galeri:", error);

        if (mounted) {
          setImages([]);
          setLoading(false);
        }
      }
    };

    fetchGaleri();

    return () => {
      mounted = false;
    };
  }, []);

  // Pengaturan slider seperti desain sebelumnya
  const settings = {
    dots: false,
    infinite: images.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: images.length > 2,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pt-20 md:p-20" id="galeri">

      {/* JUDUL */}
      <h3 className="pb-10 text-center text-2xl font-semibold text-black-600 md:text-3xl">
        Galeri Proyek
      </h3>

      {/* LOADING */}
      {loading ? (
        <p className="py-12 text-center text-sm text-gray-500">
          Memuat galeri proyek...
        </p>
      ) : images.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-500">
          Belum ada foto proyek yang tersedia.
        </p>
      ) : (

        /* SLIDER */
        <Slider {...settings} className="rounded-lg">

          {images.map((image, index) => (
            <div key={image.id} className="p-2">

              <div className="relative h-64 md:h-80">

                {/* GAMBAR */}
                <img
                  src={image.src}
                  alt={image.caption || `Foto proyek ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                  loading="lazy"
                />

                {/* CAPTION */}
                <div className="absolute bottom-0 w-full rounded-b-lg bg-maroon-500 px-3 py-2 text-center text-white">
                  {image.caption}
                </div>

              </div>
            </div>
          ))}

        </Slider>
      )}
    </div>
  );
};

export default Galeri;

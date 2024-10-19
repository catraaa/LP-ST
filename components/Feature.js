import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const features = [
  {
    title: "Akses Belajar Praktis dan Flexibel.",
    description: "Belajar kapan saja dan di mana saja sesuai dengan kenyamanan Anda.",
  },
  {
    title: "Bank Soal Terupdate.",
    description: "Koleksi soal terbaru yang dapat membantu Anda dalam persiapan.",
  },
  {
    title: "Zoom Class Premium",
    description: "Kelas interaktif dengan pengajar berpengalaman melalui Zoom.",
  },
  {
    title: "Group Diskusi Bahas Soal.",
    description: "Diskusikan soal dengan teman dan pengajar dalam grup.",
  },
  {
    title: "Materi Teks dan Video Terupdate.",
    description: "Materi belajar dalam bentuk teks dan video yang selalu diperbarui.",
  },
  {
    title: "Soal HOTS Akurat.",
    description: "Soal berpikir tingkat tinggi (HOTS) untuk meningkatkan kemampuan analitis.",
  },
  {
    title: "Pengajar Profesional dan Kompeten.",
    description: "Diajarkan oleh pengajar yang memiliki pengalaman dan kualifikasi.",
  },
];

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl sm:mt-20 sm:mb-2 px-6 sm:px-8 lg:px-16 mx-auto" id="feature">
      {/* <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 pt-18 my-2">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image src="/assets/w2.png" alt="VPN Illustrasi" layout="responsive" quality={100} height={314} width={408} />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-2xl lg:text-3xl font-medium leading-relaxed text-black-600">
              Dapatkan Layanan Belajar Terbaik Hanya di <a className="text-maroon-500">CPNS INDONESIA ONLINE</a>{" "}
            </h3>
            <ul className="text-black-500 self-start list-inside ml-8">
              {features.map((feature, index) => (
                <motion.li
                  className="relative circle-check custom-list"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={index} // Gunakan index sebagai key
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {/* Render title and description */}
      {/* <strong>{feature.title}</strong>
                  <p>{feature.description}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div> */}

      {/*LAYANAN  */}
      <div className="max-w-screen-xl  sm:mt-4 sm:mb-6 px-6 sm:px-8 lg:px-16 mx-auto" id="feature">
        {/* Judul */}
        <div className="bg-white py-14" id="feature">
          <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto text-center">
            <ScrollAnimationWrapper>
              <motion.h3 variants={scrollAnimation} className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">
                Kenapa Kami Unggul?
              </motion.h3>
              <motion.p variants={scrollAnimation} className="leading-normal mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12">
                Kami menyediakan layanan terbaik untuk kebutuhan Anda.
              </motion.p>
            </ScrollAnimationWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
              <ScrollAnimationWrapper>
                <motion.div variants={scrollAnimation} className="border-2 border-gray-100 shadow-xl rounded-lg p-6 h-[300px] flex flex-col justify-between" whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/assets/logo.png"
                    alt="Keunggulan"
                    width={50} // Sesuaikan ukuran sesuai dengan rasio gambar
                    height={50}
                    layout="intrinsic" // Ini akan menjaga rasio asli
                    className="mx-auto"
                  />
                  <h4 className="text-lg font-bold my-2 text-center">Akses Belajar Praktis dan Flexibel</h4>
                  <p className="text-black-500 text-center">Kemudahan belajar tak terbatas ruang dan waktu. Kamu akan selalu bisa mengakses Web & Aplikasi Intensif kapan saja dan di mana saja.</p>
                </motion.div>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper>
                <motion.div variants={scrollAnimation} className="border-2 border-gray-100 shadow-xl rounded-lg p-6 h-[300px] flex flex-col justify-between" whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/assets/logo.png"
                    alt="Keunggulan"
                    width={50}
                    height={50}
                    layout="intrinsic" // Menjaga rasio asli
                    className="mx-auto"
                  />
                  <h4 className="text-lg font-bold my-2 text-center">Keunggulan 2</h4>
                  <p className="text-black-500 text-center">Latihan soal dan simulasi ujian di fitur Try Out, hingga Kuis Harian bakal bantu persiapanmu hadapi ujian. Pengerjaan bisa berulang-ulang.</p>
                </motion.div>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper>
                <motion.div variants={scrollAnimation} className="border-2 border-gray-100 shadow-xl rounded-lg p-6 h-[300px] flex flex-col justify-between" whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/assets/logo.png"
                    alt="Keunggulan"
                    width={50}
                    height={50}
                    layout="intrinsic" // Menjaga rasio asli
                    className="mx-auto"
                  />
                  <h4 className="text-lg font-bold my-2 text-center">Keunggulan 3</h4>
                  <p className="text-black-500 text-center">Group Diskusi Aktif 24jam Bersama Mentor ASN.</p>
                </motion.div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;

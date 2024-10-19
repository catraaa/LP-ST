import { useState } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Galeri = () => {
  const [activeCategory, setActiveCategory] = useState("Laptop");

  const projects = {
    Laptop: [{ image: "/assets/lp2.png", title: "Mode Laptop/Komputer" }],
    Mobile: [{ image: "/assets/hp2.png", title: "Mode Mobile" }],
    Pembahasan: [{ image: "/assets/pm2.png", title: "Mode Pembahasan" }],
  };

  const scrollAnimation = getScrollAnimation(); // Ambil animasi gulir

  return (
    <section className="pt-20" id="galeri">
      <div className="container mx-auto text-center">
        <ScrollAnimationWrapper>
          <motion.h3 variants={scrollAnimation} className="text-xl sm:text-2xl lg:text-3xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
            Tampilan <a className="font-bold text-maroon-500">TryOut</a>{" "}
          </motion.h3>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <motion.div className="flex justify-center space-x-6 mb-4 mt-4" variants={scrollAnimation} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }}>
            {["Laptop", "Mobile", "Pembahasan"].map((category) => (
              <motion.span
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer px-5 py-2 text-sm font-medium transition-colors duration-300 ${activeCategory === category ? "border-b-2 border-maroon-500 text-maroon-500" : "text-black-600"}`}
                whileHover={{ scale: 1.1 }} // Efek saat hover
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Grid Gambar */}
        <div className="flex flex-wrap justify-center gap-8 px-2 text-center">
          {projects[activeCategory].map((project, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <img src={project.image} alt={project.title} className="object-cover h-85 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeri;

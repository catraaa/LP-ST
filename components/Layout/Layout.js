import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Timer from "./Timer";

// Layout.js
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="fixed top-0 w-full z-50"> {/* Pastikan z-index di sini */}
        <Timer />
      </div>
      <div className="relative z-10"> {/* Tambahkan z-index lebih tinggi untuk konten */}
        {children}
      </div>
      <Footer />
    </>
  );
};


export default Layout;

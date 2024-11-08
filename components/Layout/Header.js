import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header className={"fixed top-0 w-full  z-20 bg-white-500 transition-all " + (scrollActive ? " shadow-md pt-0" : " pt-4")}>
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-2 sm:py-2">
          <div className=" flex items-center">
            <img src="/assets/logo6.png" alt="Logo" className="w-34 h-14" />
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
            <LinkScroll
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("home");
              }}
              className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "gome" ? " text-maroon-500 animation-active " : " text-black-500 hover:text-maroon-500 a")}
            >
              Home
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="benefit"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("benefit");
              }}
              className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "benefit" ? " text-maroon-500 animation-active " : " text-black-500 hover:text-maroon-500")}
            >
              Tentang
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="pricing"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("pricing");
              }}
              className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "pricing" ? " text-maroon-500 animation-active " : " text-black-500 hover:text-maroon-500 ")}
            >
              Katalog
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="galeri"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("galeri");
              }}
              className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "galeri" ? " text-maroon-500 animation-active " : " text-black-500 hover:text-maroon-500 ")}
            >
              Galeri
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="map"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("map");
              }}
              className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "map" ? " text-maroon-500 animation-active " : " text-black-500 hover:text-maroon-500 ")}
            >
              Lokasi
            </LinkScroll>
          </ul>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <LinkScroll
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("home");
              }}
              className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "home" ? "  border-maroon-500 text-maroon-500" : " border-transparent")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tentang
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="benefit"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("benefit");
              }}
              className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "benefit" ? "  border-maroon-500 text-maroon-500" : " border-transparent ")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Layanan
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="pricing"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("pricing");
              }}
              className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "pricing" ? "border-maroon-500 text-maroon-500" : "border-transparent")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Katalog
            </LinkScroll>

            <LinkScroll
              activeClass="active"
              to="galeri"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("galeri");
              }}
              className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "galeri" ? "border-maroon-500 text-maroon-500" : "border-transparent")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Galeri
            </LinkScroll>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;

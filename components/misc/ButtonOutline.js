import React from "react";

const ButtonOutline = ({ children }) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-maroon-500 text-maroon-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-maroon-500 hover:text-white-500 transition-all hover:shadow-orange ">
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;

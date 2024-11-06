import React from "react";

const Maps = () => {
  return (
    <section className="pt-24" id="map">
      <div className="container mx-auto px-4">
        {/* Responsive Google Map */}
        <div className="relative h-60 overflow-hidden mb-6" style={{ paddingBottom: "20%" }}>
          {" "}
          <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.1184398874207!2d115.19854637382154!3d-8.68028558838305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24153aab8cd8d%3A0x88168d0ff24e1d99!2sSARANA%20TEKNIK%20BALI%20%3A%20sewa%20jack%20hammer%2Fdril%2C%20stamper%2C%20vibrator%2C%20coring%20beton%2C%20alkon%2C%20compressor%2C%20genset%2C%20bor%20magnet%2C%20blower%2C!5e0!3m2!1sid!2sid!4v1730724563143!5m2!1sid!2sid" frameBorder="0" style={{ border: "0" }} allowFullScreen aria-hidden="false" tabIndex="0"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Maps;

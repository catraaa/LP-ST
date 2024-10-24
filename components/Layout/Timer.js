import { useEffect, useState } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Tetapkan target waktu tetap (misalnya, 25 Oktober 2024, pukul 18:59:59)
    const targetDate = new Date("2024-10-27T18:59:59");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      // Menginisialisasi waktu default
      let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        // Total jam dari selisih hari dan jam
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)), // Konversi total waktu ke jam
          minutes: Math.floor((difference / (1000 * 60)) % 60), // Sisa menit
          seconds: Math.floor((difference / 1000) % 60), // Sisa detik
        };
      }

      setTimeLeft(timeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed ml-4 sm:ml-10 bottom-16 z-50 w-full max-w-xs md:max-w-lg">
      <div className="flex flex-col items-center justify-center p-2 md:p-4">
        {/* Informasi Promo */}
        <div className="flex items-center justify-center mb-4">
          <span className="bg-maroon-500 text-white-500 px-3 py-1 rounded-full text-xs md:text-sm text-center">Promo 99rb Berakhir Hari {new Date("2024-10-27").toLocaleDateString("id-ID")}</span>
        </div>

        {/* Container Box */}
        <div className="p-2 md:p-4 rounded-lg shadow-lg flex flex-col items-center bg-white-500">
          {/* Harga Promo */}
          <div className="flex items-center justify-between w-full mb-2 md:mb-4">
            <div className="text-xs md:text-lg font-bold text-gray-400 line-through">Rp 1.000.000</div>
            <div className="text-xl md:text-3xl font-extrabold text-red-600">Rp 99.000</div>
          </div>

          {/* Timer Hitung Mundur dan Tombol */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {/* Timer */}
            <div className="flex items-center justify-center space-x-3 text-lg md:text-xl font-semibold text-blue-800 mb-2 md:mb-0">
              <div className="text-center">
                <span className="font-extrabold text-maroon-500">{timeLeft.hours}</span>
                <span className="text-xs font-normal"> Jam</span>
              </div>
              <div className="text-center">
                <span className="font-extrabold text-maroon-500">{timeLeft.minutes}</span>
                <span className="text-xs font-normal"> Menit</span>
              </div>
              <div className="text-center">
                <span className="font-extrabold text-maroon-500">{timeLeft.seconds}</span>
                <span className="text-xs font-normal"> Detik</span>
              </div>
            </div>

            {/* Tombol Aksi di Sebelah Kanan */}
            <a href="https://daftarpromo.orderonline.id/flashsale99">
              <button className="bg-maroon-500 text-white-500 px-4 py-2 rounded-full hover:bg-maroon-600 transition-colors font-bold text-sm md:text-base">Ambil Promo</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;

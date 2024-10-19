import { useEffect, useState } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // atur target waktu 3 jam ke depan
    const targetDate = new Date().setHours(new Date().getHours() + 3);

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setTimeLeft(timeLeft);
    };

    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer); // Bersihkan interval saat komponen unmount
  }, []);

  return (
    <div className="fixed ml-20 bottom-10 z-50"> {/* Tambah z-index */}
      <div className="flex flex-col items-center justify-center p-4">
        {/* Informasi Promo */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <span className="bg-maroon-500 text-white-500 px-4 py-2 rounded-full">
            Promo 99rb Berakhir Hari Rabu (16 Oktober)
          </span>
        </div>

        {/* Container Box */}
        <div className="p-4 rounded-lg shadow-lg flex flex-col items-center bg-white-500">
          {/* Harga Promo */}
          <div className="flex items-center justify-between w-full mb-4">
            <div className="text-2xl font-bold text-gray-200 line-through">Rp 1.000.000</div>
            <div className="text-4xl font-extrabold text-red-600">Rp 99.000</div>
          </div>

          {/* Timer Hitung Mundur dan Tombol */}
          <div className="flex items-center justify-between w-full">
            {/* Timer */}
            <div className="flex items-center space-x-2 text-xl font-semibold text-blue-800">
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
            <a href="https://www.example.com">
            <button className="ml-5 bg-maroon-500 text-white-500 px-6 py-2 rounded-full hover:bg-maroon-600 transition-colors font-bold">
              Ambil Promo
            </button>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;

import Image from "next/image";

const Timer = () => {
  return (
    <div className="fixed right-6 translate-x-1/2 bottom-14 z-50 w-full max-w-xs md:max-w-lg">
      <div className="flex-col items-center justify-center p-2 md:p-4">
        {/* Tombol Aksi */}
        <a href="https://wa.me/6283856567166" target="_blank" rel="noopener noreferrer">
          <button className="flex items-center bg-hijau-500 text-white-500 px-4 py-2 rounded-full hover:bg-hijau-600 transition-colors font-bold text-sm md:text-base shadow-lg mr-1">
            <Image src="/assets/Icon/wa.png" alt="Chat Icon" width={24} height={24} className="rounded-full" />
            <h1 className="ml-2">Chat with Us</h1>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Timer;

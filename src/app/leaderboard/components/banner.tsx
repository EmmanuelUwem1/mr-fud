"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative py-12 w-full lg:h-80 rounded-[20px] overflow-hidden flex items-center center">
      {/* Background Image */}
      <Image
        src="/Leaderboards Banner Mobile 3.png"
        alt="Banner background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="z-0"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 px-4 sm:px-8 md:px-16 flex font-bold flex-col items-start justify-center w-[22rem] ">
        <h1 className="text-xl md:text-2xl text-[#FF0000] ">Reward</h1>
        <h1 className="text-xl md:text-2xl text-white">Leaderboards</h1>
      </div>
    </section>
  );
}

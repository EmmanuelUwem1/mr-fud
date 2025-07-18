"use client";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative py-12 w-full lg:h-80 rounded-[20px] overflow-hidden flex items-center center">
      {/* Background Image */}
      <Image
        src="/banner.png"
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
      <div className="relative z-20 px-4 sm:px-8 md:px-16 flex flex-col items-start w-[22rem] gap-4 sm:gap-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white GasoekOne-Regular">
          The Club for tomorrow’s meme kings
        </h1>

        <div className="relative inline-block h-full hover:opacity-90 transition-class ">
          {/* White background layer */}
          <div className="absolute w-full h-full bg-white rounded-[6px] -bottom-0.5 -right-0.5 z-0" />

          {/* Red foreground button */}
          <Link
            href="/create-club"
            className="relative z-10 p-3 bg-[#FF0E32] text-white font-medium rounded-[6px] text-base shadow-md inline-block"
          >
            Launch Memecoin
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import RatingBar from "@/app/feed/components/rating-bar";

export default function GraduatedCard() {
  return (
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden shadow-lg text-white p-4 border-[2px] border-[#923A07] bg-[#291403] flex flex-col items-center justify-center">
      {/*  Background Image */}
      <Image
        src="/texture.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-15"
        priority
      />

      {/*  Radial Gradient on the Right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial from-[#A72D12] via-[#a78212] to-[#da920e] opacity-30" />
      </div>

      {/*  Content Layer */}
      <div className="z-10 flex items-center justify-between w-full">
        {/* Left Content */}
        <div className="flex w-1/2 flex-col space-y-2">
          <span className="text-xs uppercase tracking-wide text-[#06D57B] font-bold">
            100% Graduated
          </span>
          <h3 className="text-lg font-semibold">This token is now on DEX</h3>
          <p className="text-sm text-gray-300">
            Target: <span className="font-medium text-white">120 BNB</span>
          </p>
        </div>

        {/* Right Image */}
        <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
          <Image
            src="/cat rocket 1.png"
            alt="Rocket"
            layout="fill"
            objectFit="cover"
          />
        </div>
          </div>
          {/*  Rating Bar */}
            <div className="w-full mt-4 pr-4">
              <RatingBar rating={100} />
              </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import RatingBar from "@/app/feed/components/rating-bar";

interface GraduatedCardProps {
  targetAmount?: number | string;
  percent?: number | string;
  isGraduated?: boolean;
  notPassedBondingCurve?: boolean;
}
export default function GraduatedCard({isGraduated, notPassedBondingCurve}: GraduatedCardProps) {
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

      {/* Radial Gradient - Top Left */}
      {/* <div className="absolute top-0 left-0 w-1/2 h-full z-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(139, 0, 0, 0.4), transparent 70%)",
          }}
        />
      </div> */}

      {/* Radial Gradient - Top Right */}
      <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(180, 130, 20, 0.4), transparent 70%)",
          }}
        />
      </div>

      {/*  Content Layer */}
      <div className="z-10 flex items-center justify-between w-full">
        {/* Left Content */}
        {!notPassedBondingCurve && (
          <div className="flex w-1/2 flex-col">
            <span className="text-[#FFFFFF] font-extralight text-3xl geometric">
              100%
            </span>
            <span className="GasoekOne-Regular font-normal text-xl">
              Graduated
            </span>
            <h3 className="text-xs font-normal">
              {" This token is now on"}{" "}
              <span className="text-[#FF3C38]">DEX</span>{" "}
            </h3>
            <div className="text-sm font-bold text-[#E3E3E3]">
              Target: <span className="text-[#FF3C38]">120 BNB</span>
            </div>
          </div>
        )}
        {notPassedBondingCurve && (
          <div className="flex w-1/2 flex-col">
            <span className="text-[#FFFFFF] font-extralight text-3xl geometric">
             100%
            </span>
            <span className="GasoekOne-Regular font-normal text-xl">
              Not Passed Bonding Curve
            </span>
            <h3 className="text-xs font-normal">
              {"This token did not graduate through the"}{" "}
              <span className="text-[#FF3C38]">bonding curve</span>{" "}
            </h3>
            {/* <div className="text-sm font-bold text-[#E3E3E3]">
              Target: <span className="text-[#FF3C38]">120 BNB</span>
            </div> */}
          </div>
        )}

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
      <div className="w-full mt-2 pr-4">
        <RatingBar rating={100} />
      </div>
    </div>
  );
}

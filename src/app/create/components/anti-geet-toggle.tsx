"use client";
import React, { useState } from "react";
import Image from "next/image";

const AntiGeetToggle: React.FC = () => {
  const [selected, setSelected] = useState<"green" | "black" | null>("green");

  return (
    <div className="flex gap-4 w-full flex-wrap md:flex-nowrap">
      {/* Green Card */}
      <div
        onClick={() => setSelected("green")}
        className={`cursor-pointer p-4 rounded-xl w-full h-32 flex items-center justify-start bg-[#021302] text-white font-extralight text-sm transition-all
          ${
            selected === "green"
              ? "border border-[#0FBF38]"
              : "border border-transparent"
          }`}
      >
        <span className="relative flex items-center h-20 w-full justify-center">
          <Image
            alt=""
            src={"/cat 2 1.png"}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </span>
        <p>
          <b className="font-semibold">Anti - FUD ON:</b> Users will be
          penalized 25% by selling before graduation. 50% of this penalty will
          be added to liquidity.
        </p>
      </div>

      {/* Black Card */}
      <div
        onClick={() => setSelected("black")}
        className={`cursor-pointer p-4 rounded-xl w-full h-32 flex items-center justify-start bg-[#080808] text-white font-extralight transition-all
          ${
            selected === "black"
              ? "border border-[#FF3C38]"
              : "border border-transparent"
          }`}
      >
        <span className="relative flex items-center h-full w-full justify-center">
          <Image
            alt=""
            src={"/cat 3 1.png"}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </span>
        <p>
          <b className="font-semibold">Anti - FUD OFF:</b> 
          Users can buy and sell freely before graduation.
        </p>
      </div>
    </div>
  );
};

export default AntiGeetToggle;

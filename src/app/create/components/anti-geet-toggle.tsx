"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTokenForm } from "../context/TokenFormContext";

const AntiGeetToggle: React.FC = () => {
  const [selected, setSelected] = useState<"green" | "black" | null>("green");
  const { setPayload } = useTokenForm();

  return (
    <div className="flex gap-4 w-full flex-wrap md:flex-nowrap">
      {/* Green Card */}
      <div
        onClick={() => {
          setSelected("green");
          setPayload({ isAntiGeet: true });
        }}
        className={`cursor-pointer p-4 rounded-xl w-full h-32 flex gap-6 items-center justify-start text-white font-extralight sm:text-sm text-xs transition-all
          ${
            selected === "green"
              ? "border bg-[#021302] border-[#0FBF38]"
              : "border bg-[#020213] border-transparent"
          }`}
      >
        <span className="relative flex items-center h-20 w-20 aspect-square  justify-center">
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
        onClick={() => {
          setSelected("black");
          setPayload({ isAntiGeet: false });
        }}
        className={`cursor-pointer text-xs sm:text-sm p-4 rounded-xl w-full h-32 flex gap-6 items-center justify-start text-white font-extralight transition-all
          ${
            selected === "black"
              ? "border bg-[#130202] border-[#FF3C38]"
              : "border bg-[#020213] border-transparent"
          }`}
      >
        <span className="relative flex items-center h-20 w-20 aspect-square justify-center">
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

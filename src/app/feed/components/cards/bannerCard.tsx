"use client";
import React, { useState } from "react";
import {
  formatWalletAddress,
  formatMarketCap,
  formatTimeAgo,
  copyToClipboard,
} from "@/lib/utils";
import Image from "next/image";
import RatingBar from "../rating-bar";
import { useRipple } from "@/hooks/useRipple";

type BannerTokenCardProps = {
  ticker: string;
  name: string;
  ca: string;
  marketCap: number;
  createdBy: string;
  rating: number;
  image: string;
  id: string;
  createdTime: string;
  position: number; 
};

export default function BannerTokenCard({
  ticker,
  name,
  ca,
  marketCap,
  createdBy,
  rating,
  image,
  id,
  createdTime,
  position,
}: BannerTokenCardProps) {
  const [retryCount, setRetryCount] = useState(0);
  const handleError = () => {
    if (retryCount < 5) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1000);
    }
  };

  const cacheBuster = retryCount ? `?retry=${retryCount}` : "";
  const ripple = useRipple();

  // Generate random market cap between $10M and $500M
  const randomMarketCap =
    Math.floor(Math.random() * (500_000 - 200_000 + 1)) + 1_000;

  return (
    <div
      className="bg-[#004A7C] text-white border-[2px] border-[#05E02B] rounded-[15px] py-3 sm:pl-3 pl-3 pr-3 shadow-md flex flex-col justify-between h-fit gap-2 w-full relative"
      onClick={ripple}
    >
      {/*  Badge */}
      <div className="z-30 absolute -top-6 sm:-top-8 md:-top-10 lg:-top-14 aspect-[98/82] h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-16 lg:h-20 lg:w-24 flex items-center justify-center self-center">
        <Image
          src={`/badges/${position}.png`}
          alt={`Rank ${position}`}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          quality={100}
          className="drop-shadow-lg"
          priority
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col w-full gap-3 items-center justify-start">
        <div className="flex w-full h-56 rounded-[10px] bg-[#1a1a236f] relative overflow-hidden aspect-square">
          <Image
            src={`${image}${cacheBuster}`}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            onError={handleError}
          />
        </div>

        <div className="flex flex-col w-full items-start text-left justify-start gap-0.5">
          <span className="text-sm text-[#E3E3E3] font-normal flex items-center w-full justify-between gap-2">
            <span className="GasoekOne-Regular">${ticker}</span>
            <span className="text-xs overflow-ellipsis w-20 text-[#A2DAEC]">
              {formatTimeAgo(createdTime)}
            </span>
          </span>

          <div className="flex w-full items-center justify-between">
            <h2 className="text-sm text-[#87DDFF] font-semibold">{name}</h2>
            <p className="text-xs text-[#87DDFF] cursor-pointer flex items-center font-medium justify-start gap-2">
              ca:{" "}
              <span className="font-normal text-[#E3E3E3]">
                {formatWalletAddress(ca)}
              </span>
              <span
                className="relative h-4 w-4 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  copyToClipboard(ca);
                }}
              >
                <Image
                  src="/copy.png"
                  alt="copy"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </span>
            </p>
          </div>

          <p className="text-sm w-full flex justify-between items-center">
            <span className="font-normal text-[#00C3FE]">Market Cap:</span>{" "}
            {formatMarketCap(randomMarketCap)}
          </p>

          <p className="text-xs w-full flex justify-between items-center">
            <span className="font-normal text-[#00C3FE]">Created by:</span>{" "}
            {formatWalletAddress(createdBy)}
          </p>
        </div>
      </div>

      <RatingBar rating={rating} theme="green" />
    </div>
  );
}

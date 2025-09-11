"use client";
import React from "react";
import { formatWalletAddress } from "@/lib/utils";
import Image from "next/image";
import RatingBar from '../rating-bar'
import { copyToClipboard } from "@/lib/utils";
import { formatMarketCap } from "@/lib/utils";
import { useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRipple } from "@/hooks/useRipple";
import useUseRating from "@/lib/data/rating";

type TokenCardProps = {
  className?:string;
  ticker: string;
  name: string;
  ca: string;
  marketCap: number;
  createdBy: string;
  rating?: number;
  image: string;
  id: string;
  createdTime: string;
};

export default function TokenCard({
  ticker,
  name,
  ca,
  marketCap,
  createdBy,
  image,
  id,
  createdTime,
  className,
}: TokenCardProps) {
  const rating = useUseRating();

  const [retryCount, setRetryCount] = useState(0);
  const handleError = () => {
    if (retryCount < 5) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1000); // Retry after 1 second
    }
  };

  const cacheBuster = retryCount ? `?retry=${retryCount}` : "";

  const router = useRouter();

  const ripple = useRipple();

  // Generate random market cap between $10M and $500M
  const randomMarketCap =
    Math.floor(Math.random() * (800_000 - 200_000 + 1)) + 200_000;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        onClick={() => router.push(`/token/${id}`)}
        // className="token-gradient-wrapper cursor-pointer"
        className={`cursor-pointer ${className}`}
      >
        <div
          className="bg-[#004A7C] text-white rounded-[15px] py-3 sm:pl-3 pl-3 pr-3 sm:pr-6 shadow-md flex flex-col justify-between gap-2 w-full h-full relative overflow-hidden"
          onClick={ripple}
        >
          {/* Header */}
          <div className="flex w-full gap-3 items-center justify-start">
            {/* image */}
            <div className="flex aspect-square w-full rounded-[10px] bg-[#1a1a236e] relative overflow-hidden">
              <Image
                src={`${image}${cacheBuster}`}
                alt={""}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                onError={handleError}
              />
            </div>
            <div className="flex flex-col w-full items-start text-left justify-start gap-1">
              <span className="text-lg text-[#E3E3E3] font-normal  flex items-center w-full justify-between gap-2">
                <span className="GasoekOne-Regular w-[80px] overflow-hidden text-ellipsis whitespace-nowrap block">
                  ${ticker.toUpperCase()}
                </span>

                <span className="text-xs overflow-ellipsis w-20 text-[#A2DAEC]">
                  {formatTimeAgo(createdTime)}
                </span>
              </span>
              <h2 className="text-base text-[#A2DAEC] font-semibold">{name}</h2>
              <p className="text-base text-[#A2DAEC] cursor-pointer flex items-center font-medium justify-start gap-2">
                ca:{" "}
                <span className="font-normal text-[#E3E3E3] text-sm">
                  {formatWalletAddress(ca)}
                </span>
                <span
                  className="relative h-4 w-4 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents navigation
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
              <p className="text-sm w-full flex justify-between items-center">
                <span className="font-normal text-[#00C3FE]">Market Cap:</span>{" "}
                {formatMarketCap(randomMarketCap)}
              </p>

              <p className="text-sm w-full flex justify-between items-center">
                <span className="font-normal text-[#00C3FE]">Created by:</span>{" "}
                {formatWalletAddress(createdBy)}
              </p>
            </div>
          </div>

          <RatingBar rating={rating} theme={"green"} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

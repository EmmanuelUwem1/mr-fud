"use client";
import Image from "next/image";
import Link from "next/link";
import { formatWalletAddress } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

type FeaturedCardProps = {
  title: string;
  price: number;
  chain: string;
  ca: string;
  image: string;
    ticker: string;
  type?: "a" | "b";
  id: string;
};

export default function FeaturedCard({
  title,
  price,
  ticker,
  ca,
  image,
  id,
  type = "a",
}: FeaturedCardProps) {
   const [retryCount, setRetryCount] = useState(0);
 const handleError = () => {
   if (retryCount < 5) {
     setTimeout(() => {
       setRetryCount((prev) => prev + 1);
     }, 1000); // Retry after 1 second
   }
 };

 const cacheBuster = retryCount ? `?retry=${retryCount}` : "";

  return (
    <Link
      href={`/token/${id}`}
      className={`card-gradient-wrapper ${type === "b" ? "card-type-b" : ""}`}
    >
      <div className="w-fit max-w-[200px] sm:max-w-[252px] bg-[#0C0C0C] rounded-[15px] flex gap-4 justify-between p-2 text-white h-fit">
        {/* Left: Image */}
        <div className="w-24 aspect-square rounded-[9px] relative overflow-hidden bg-[#1a1a23]">
          <Image
            src={`${image}${cacheBuster}`}
            alt={""}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            onError={handleError}
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-1 sm:gap-3 justify-center w-full">
          <h2 className="text-base font-normal GasoekOne-Regular">${ticker}</h2>
          <p
            className={`text-sm font-medium flex items-center justify-start gap-2 bg-gradient-to-r ${
              type === "a"
                ? "from-[#FFBD72] to-[#F16824]"
                : "from-[#FA3C39] to-[#FFA393]"
            } bg-clip-text text-transparent`}
          >
            buy <span className="">{price.toFixed(4)} BSC</span>
          </p>

          <p className="text-xs text-[#A0A0A0] cursor-pointer flex items-center justify-start gap-2">
            CA:{" "}
            <span className="font-medium text-[#E3E3E3]">
              {formatWalletAddress(ca)}
            </span>
            <span
              className="relative h-3 w-3 flex items-center justify-center"
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
        </div>
      </div>
    </Link>
  );
}

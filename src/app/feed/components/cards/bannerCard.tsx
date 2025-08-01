"use client";
import React from "react";
import { formatWalletAddress } from "@/lib/utils";
import Image from "next/image";
import RatingBar from '../rating-bar'
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";
import { formatMarketCap } from "@/lib/utils";
import { useState } from "react";
import { formatTimeAgo } from "@/lib/utils";

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
  createdTime ,
}: BannerTokenCardProps) {
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
   <div className="bg-[#141414] text-white rounded-[15px] py-3 sm:pl-3 pl-3 pr-3 sm:pr-6 shadow-md flex flex-col justify-between h-72 gap-2 w-full">
     {/* Header */}
     <div className="flex flex-col w-full gap-3 items-center justify-start">
       {/* image */}
       <div className="flex w-full h-36 rounded-[10px] bg-[#1a1a23] relative overflow-hidden">
         <Image
           src={`${image}${cacheBuster}`}
           alt={""}
                    layout="fill"
                     objectFit="cover"
           objectPosition="top"
           onError={handleError}
         />
       </div>
       <div className="flex flex-col w-full items-start text-left justify-start gap-0.5">
         <span className="text-sm text-[#E3E3E3] font-normal  flex items-center w-full justify-between gap-2">
           <span className="GasoekOne-Regular"> ${ticker}</span>
           <span className="text-xs overflow-ellipsis w-20 text-[#A0A0A0]">
             {formatTimeAgo(createdTime)}
           </span>
         </span>
         <div className="flex w-full items-center justify-between">
           <h2 className="text-sm text-[#A0A0A0] font-semibold">{name}</h2>
           <p className="text-xs text-[#A0A0A0] cursor-pointer flex items-center font-medium justify-start gap-2">
             CA:{" "}
             <span className="font-normal text-[#E3E3E3]">
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
                 src="/copy-red.png"
                 alt="copy"
                 layout="fill"
                 objectFit="contain"
                 objectPosition="center"
               />
             </span>
           </p>
         </div>
         <p className="text-sm w-full flex justify-between items-center">
           <span className="font-normal text-[#FF3C38]">Market Cap:</span>{" "}
           {formatMarketCap(marketCap)}
         </p>

         <p className="text-xs w-full flex justify-between items-center">
           <span className="font-medium text-[#FF3C38]">Created by:</span>{" "}
           {formatWalletAddress(createdBy)}
         </p>
       </div>
     </div>

     <RatingBar rating={rating} />
   </div>
 );

}

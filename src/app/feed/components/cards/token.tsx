"use client";
import React from "react";
import { formatWalletAddress } from "@/lib/utils";
import Image from "next/image";
type TokenCardProps = {
  ticker: string;
  name: string;
  ca: string;
  marketCap: string;
  createdBy: string;
  rating: number;
};

export default function TokenCard({
  ticker,
  name,
  ca,
  marketCap,
  createdBy,
  rating,
}: TokenCardProps) {
 return (
   <div className="token-gradient-wrapper">
     <div className="bg-[#141414] text-white rounded-[15px] py-3 pl-3 pr-6 shadow-md flex flex-col justify-between gap-2 w-full h-full">
       {/* Header */}
       <div className="flex w-full gap-3 items-center justify-start">
         {/* image */}
         <div className="flex aspect-square w-full rounded-[10px] bg-[#1a1a23] relative"></div>
         <div className="flex flex-col w-full items-start text-left justify-start gap-1">
           <span className="text-lg text-[#E3E3E3] font-normal GasoekOne-Regular">
             ${ticker}
           </span>
           <h2 className="text-base text-[#A0A0A0] font-semibold">{name}</h2>
           <p className="text-base text-[#A0A0A0] cursor-pointer flex items-center font-medium justify-start gap-2">
             CA:{" "}
             <span className="font-normal text-[#E3E3E3]">
               {formatWalletAddress(ca)}
             </span>
             <span className="relative h-4 w-4 flex items-center justify-center">
               <Image
                 src="/copy-red.png"
                 alt="copy"
                 layout="fill"
                 objectFit="contain"
                 objectPosition="center"
               />
             </span>
           </p>
           <p className="text-sm">
             <span className="font-normal text-[#FF3C38]">Market Cap:</span>{" "}
             {marketCap}
           </p>

           <p className="text-sm">
             <span className="font-medium text-[#FF3C38]">Created by:</span>{" "}
             {formatWalletAddress(createdBy)}
           </p>
         </div>
       </div>

       {/* Footer */}
       <div className="flex justify-between items-center">
         <p className="text-sm font-medium text-white">Rating</p>
         <span className="text-sm font-bold text-[#FF7A7A]">{rating}%</span>
       </div>
     </div>
   </div>
 );

}

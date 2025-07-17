"use client";
import React from "react";
import { formatWalletAddress } from "@/lib/utils";

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
     <div className="bg-[#141414] text-white rounded-[15px] p-5 shadow-md flex flex-col gap-4 w-full">
       {/* Header */}
       <div className="flex items-center justify-between">
         <span className="text-lg text-[#E3E3E3] px-3 py-1 font-bold">
           ${ticker}
         </span>
         <h2 className="text-base text-[#A0A0A0] font-semibold">{name}</h2>
       </div>

       {/* Info List */}
       <div className="flex flex-col gap-2 text-sm font-light">
         <p>
           <span className="font-medium text-[#FF3C38]">Market Cap:</span>{" "}
           {marketCap}
         </p>
         <p>
           <span className="font-medium text-white">CA:</span>{" "}
           {formatWalletAddress(ca)}
         </p>
         <p>
           <span className="font-medium text-[#FF3C38]">Created by:</span>{" "}
           {createdBy}
         </p>
       </div>

       {/* Footer */}
       <div className="flex justify-between items-center mt-4">
         <p className="text-sm font-medium text-white">Rating</p>
         <span className="text-sm font-bold text-[#FF7A7A]">{rating}%</span>
       </div>
     </div>
   </div>
 );

}

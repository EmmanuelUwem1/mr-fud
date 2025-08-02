"use client";
import { copyToClipboard, formatDateToCustom, formatWalletAddress } from "@/lib/utils";
import Image from "next/image";

interface WalletAndDateFlexProps {
    ca: string;
    createdDate: string;
}
export default function WalletAndDateFlex({ca, createdDate}: WalletAndDateFlexProps) {
  return (
    <div className="flex items-center flex-wrap sm:flex-nowrap font-semibold justify-between sm:justify-end gap-3">
             <button
               onClick={() => copyToClipboard(ca)}
               className="text-xs relative flex items-center justify-center gap-2 cursor-pointer bg-[#2A2A2A] rounded-[5px] px-3 py-2"
             >
               {formatWalletAddress(ca)}
               <span className="relative h-3.5 w-4">
                 <Image
                   src={"/copy-white.png"}
                   layout="fill"
                   objectFit="contain"
                   objectPosition="center"
                   alt="copy"
                 />
               </span>
             </button>
             <button className="text-xs relative flex items-center justify-center gap-2 cursor-pointer bg-[#2A2A2A] rounded-[5px] px-3 py-2">
               <span className="relative h-3.5 w-4">
                 <Image
                   src={"/clock.png"}
                   layout="fill"
                   objectFit="contain"
                   objectPosition="center"
                   alt="clock"
                 />
               </span>
               {formatDateToCustom(createdDate)}
             </button>
           </div>
  );
}
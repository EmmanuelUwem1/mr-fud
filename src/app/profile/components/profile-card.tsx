"use client";
import { useEffect } from "react";
// import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";

export default function ProfileCard() {

  const { isConnected, address } = useAccount();
  const router = useRouter();

      // Redirect if wallet is not connected
      useEffect(() => {
        if (!isConnected) {
          router.replace("/connect"); // redirect to connect (authentication) page
        }
       
      }, [isConnected, router]);
    
  return (
    <div className="bg-[#141414] p-6 my-8 rounded-[18px] shadow-lg w-full max-w-2xl">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
        User Profile
      </h2>

      <div className="flex items-center w-full flex-wrap md:flex-nowrap gap-4 justify-start">
        <span className="relative flex items-center justify-center w-full h-72 aspect-square rounded-[9px] bg-[#1a1a23]">
          {/* <Image alt="" src={} /> */}
        </span>

        <div className="flex flex-col items-start justify-center gap-5 w-full">
          {/* first row (user name) */}

          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-[#777777] font-medium md:text-sm text-xs">
                Username
              </h2>
              <p className="text-lg md:text-xl font-bold">87mK0</p>
            </div>
            <button className="px-6 py-2 bg-[#FF3C38] text-xs text-white rounded-[4px] cursor-pointer font-medium hover:bg-[#D92C2A] transition-class">
              Edit
            </button>
          </div>

          {/* second row (user address) */}
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-[#777777] font-medium md:text-sm text-xs">
              Wallet Address
            </h2>
            <p className="text-xs font-bold">{address ? address : " "}</p>
            <button
              className="bg-[#1E1E1E] p-2 rounded-[10px] font-medium text-xs cursor-pointer my-2"
              onClick={() => {
                if (address) {
                    copyToClipboard(address);
                }
              }}
            >
              copy wallet address
            </button>
          </div>

          {/* third row volume and rewards */}
          <div className="flex items-center justify-start gap-8">
              {/* volume */}
            <div className="flex flex-col justify-start items">
              <h2 className="text-[#777777] font-medium md:text-sm text-xs">
                Volume
              </h2>
              <p className="text-lg md:text-xl font-bold">$0</p>
            </div>
              {/* reward */}
            <div className="flex flex-col justify-start items">
              <h2 className="text-[#777777] font-medium md:text-sm text-xs">
                Reward
              </h2>
              <p className="text-lg md:text-xl font-bold">$0</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
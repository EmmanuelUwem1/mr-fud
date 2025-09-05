"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { copyToClipboard } from "@/lib/utils";
import CoinsTabs from "./coins-tabs";
import EditProfileModal from "./modals/EditProfileModal";
import { useUser } from "@/context/userContext";
import { modal } from "@/context/AppKitProvider";

export default function ProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("87mK0"); // fallback username

  const { isConnected, address } = useAccount();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!isConnected) {
      modal.open();
      return;
    }
  }, [isConnected]);

  useEffect(() => {
    if (user) {
      setUsername("");
    }
  }, [user]);

  return (
    <>
      <div className="bg-[#004A7C] p-6 my-8 rounded-[18px] shadow-lg w-full max-w-2xl overflow-hidden">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
          User Profile
        </h2>

        <div className="flex items-center w-full flex-wrap sm:flex-nowrap gap-4 justify-start">
          <span className="relative flex items-center justify-center w-full h-full max-w-60 aspect-square rounded-[9px] bg-[#1a1a23]">
            <Image
              alt="Profile Picture"
              // user?.userProfile?.profilePicture || 
              src={"/Image holder.png"}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>

          <div className="flex flex-col items-start justify-center gap-5 w-full">
            {/* Username */}
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start justify-start">
                <h2 className="text-[#b6b6b6] font-medium md:text-sm text-xs">
                  Username
                </h2>
                <p className="text-lg md:text-xl font-bold">{username}</p>
              </div>
              <button
                className="px-6 py-2 bg-[#00C3FE] text-xs text-white rounded-[4px] cursor-pointer font-medium hover:opacity-80 transition-class"
                onClick={() => setIsModalOpen(true)}
              >
                Edit
              </button>
            </div>

            {/* Wallet Address */}
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-[#b6b6b6] font-medium md:text-sm text-xs">
                Wallet Address
              </h2>
              <p className="text-xs font-bold overflow-x-auto whitespace-nowrap max-sm:max-w-60">
                {address || " "}
              </p>
              <button
                className="bg-[#1e1e1e94] p-2 rounded-[10px] font-medium text-xs cursor-pointer my-2"
                onClick={() => address && copyToClipboard(address)}
              >
                copy wallet address
              </button>
            </div>

            {/* Volume & Rewards */}
            <div className="flex items-center justify-start gap-8">
              <div className="flex flex-col justify-start items">
                <h2 className="text-[#b6b6b6] font-medium md:text-sm text-xs">
                  Volume
                </h2>
                <p className="text-lg md:text-xl font-bold">
                  ${user?.tradingStats?.totalVolume?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="flex flex-col justify-start items">
                <h2 className="text-[#b6b6b6] font-medium md:text-sm text-xs">
                  Reward
                </h2>
                <p className="text-lg md:text-xl font-bold">
                  ${user?.totalRewards?.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coins Tabs */}
        <CoinsTabs />
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newUsername) => {
          setUsername(newUsername);
          setIsModalOpen(false);
        }}
        currentUsername={username}
      />
    </>
  );
}

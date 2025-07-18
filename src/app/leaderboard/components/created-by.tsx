"use client";

import { formatWalletAddress, formatDaysAgo } from "@/lib/utils";
import Avatar from "@/components/avaters/avater-circle";

type CreatedByProps = {
  wallet?: string;
  createdAt?: string | number | Date;
  avatarUrl?: string;
};

const CreatedBy = ({
  wallet = "0x4FC12345678901818", // default wallet
  createdAt = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  avatarUrl,
}: CreatedByProps) => {
  return (
    <div className="flex w-fit items-center justify-between space-x-3 text-white text-sm">
      {/* Label */}
      <span className="text-[#FF3C38] text-xs font-medium">Created by:</span>

      {/* Avatar */}
      <Avatar size={33} bg="#FF7F7F" />

      {/* Wallet + Time */}
      <div className="flex flex-col items-start">
        <span className="font-medium">{formatWalletAddress(wallet)}</span>
        <span className="text-white/60 text-xs">
          {formatDaysAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CreatedBy;

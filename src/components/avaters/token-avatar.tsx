"use client";

import Image from "next/image";

type TokenAvatarProps = {
  index: number; // Updated to number type
  imageUrl: string;
  ticker: string;
  name: string;
};

const TokenAvatar = ({ index, imageUrl, ticker, name }: TokenAvatarProps) => {
  // Format index to 3-digit string
  const formattedIndex = String(index + 1).padStart(3, "0");

  return (
    <div className="flex items-center space-x-3">
      {/* Index on the left */}
      <div className="text-xs font-semibold text-white/70 w-10 text-center">
        {formattedIndex}
      </div>

      {/* Token Image in the middle */}
      <div className="relative w-10 h-10">
        <Image
          src={imageUrl}
          alt={`${name} Logo`}
          layout="fill"
          className="rounded-full object-cover"
          priority
        />
      </div>

      {/* Ticker & Name on the right */}
      <div>
        <div className="text-sm font-bold text-white uppercase">{ticker}</div>
        <div className="text-xs text-white/60">{name}</div>
      </div>
    </div>
  );
};

export default TokenAvatar;

"use client";
// import Image from "next/image";


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
      <div className="text-lg font-normal text-[#777777] w-10 text-center geometric">
        {formattedIndex}
      </div>

      <div className="relative w-10 h-10 flex items-center justify-center rounded-full">
        {/* Outer Gradient Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(to right, #FA3C39, #FFA393)",
          }}
        />

        {/* Inner White Circle with Black Border */}
        <div
          className="z-10 rounded-full"
          style={{
            width: "90%", // adjust to taste
            height: "90%",
            backgroundColor: "#FFFFFF",
            border: "2px solid black",
          }}
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

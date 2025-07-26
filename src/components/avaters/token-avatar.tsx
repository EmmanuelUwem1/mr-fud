"use client";
import Image from "next/image";

type TokenAvatarProps = {
  index: number;
  imageUrl: string;
  ticker: string;
  name: string;
};

const TokenAvatar = ({ index, imageUrl, ticker, name }: TokenAvatarProps) => {
  const formattedIndex = String(index + 1).padStart(3, "0");

  return (
    <div className="flex items-center space-x-3">
      {/* Index */}
      <div className="text-lg font-normal text-[#777777] w-10 text-center geometric">
        {formattedIndex}
      </div>

      {/* Avatar Container */}
      <div className="relative w-10 h-10 flex items-center justify-center rounded-full">
        {/* Gradient Outer Ring */}
        <div
          className="absolute inset-0 rounded-full p-[2px]"
          style={{
            background: "linear-gradient(to right, #FA3C39, #FFA393)",
          }}
        >
          {/* Black Border Container */}
          <div className="bg-black rounded-full w-full h-full flex items-center justify-center">
            {/* Image Wrapper */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black">
              <Image
                alt={`${name} image`}
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker & Name */}
      <div>
        <div className="text-sm font-bold text-white uppercase">{ticker}</div>
        <div className="text-xs text-white/60">{name}</div>
      </div>
    </div>
  );
};

export default TokenAvatar;

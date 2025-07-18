"use client";
// import Image from "next/image";

const formatMarketCap = (cap: number): string => {
  if (cap >= 1_000_000_000) {
    return `$${(cap / 1_000_000_000).toFixed(1)}B+`;
  } else if (cap >= 1_000_000) {
    return `$${(cap / 1_000_000).toFixed(1)}M+`;
  } else if (cap >= 1_000) {
    return `$${(cap / 1_000).toFixed(1)}K+`;
  }
  return `$${cap}+`;
};

const LeaderboardCard = ({
  index = 0,
  ticker = "BSC",
  name = "Ethereum",
  marketCap = "3200000000", // Pass in as a number
  creator = "0x4FC...1818",
  //   imageUrl = "https://via.placeholder.com/64",
}) => {
  const formattedIndex = String(index + 1).padStart(3, "0");
  const formattedCap = formatMarketCap(Number(marketCap));

  return (
    <div
      className="relative p-6 rounded-xl shadow-lg backdrop-blur-md 
      bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] 
      from-[#19367C]/30 to-transparent text-white w-full max-w-sm mx-auto"
    >
      <div className="absolute top-4 left-4 text-2xl font-bold text-white/90">
        #{formattedIndex}
      </div>

      <div className="flex items-center space-x-4 mb-4">
        {/* image */}
        <div>
          <div className="text-lg font-semibold uppercase">{ticker}</div>
          <div className="text-sm text-white/70">{name}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-white/70">Market Cap:</span>
          <span className="text-sm font-medium">{formattedCap}</span>
        </div>
        <div className="flex justify-between truncate">
          <span className="text-sm text-white/70">Created By:</span>
          <span className="text-sm font-medium truncate">{creator}</span>
        </div>
      </div>

      <button
        className="mt-6 w-full bg-green-500 hover:bg-green-600 
        text-white font-semibold py-2 px-4 rounded-full transition"
      >
        Buy Now
      </button>
    </div>
  );
};

export default LeaderboardCard;

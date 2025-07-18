"use client";
import CreatedBy from "../created-by";
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
    <div className="relative py-6 rounded-[14px] shadow-lg bg-[#0A0A0A] text-white w-full max-w-sm mx-auto">
      <div className="flex px-6 pb-3 flex-col items-start justify-start gap-4 border-b border-b-[#221C28]">
        <div className=" text-3xl font-light text-[#ffffff] geometric">
          {formattedIndex}
        </div>

        <div className="flex items-center space-x-4 mb-4">
          {/* image */}
          <div>
            <span className="text-lg text-[#E3E3E3] font-normal GasoekOne-Regular">
              ${ticker}
            </span>
            <div className="text-base font-semibold text-[#A0A0A0]">{name}</div>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text-sm text-white/70">mc </span>
          <span className="text-sm font-medium">{formattedCap}</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-3 px-6">
        <CreatedBy />

        <button
          className=" w-fit bg-green-500 hover:bg-green-600 
        text-white font-semibold text-sm py-2 px-4 rounded-full transition-class"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default LeaderboardCard;

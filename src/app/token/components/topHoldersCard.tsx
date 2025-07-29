import React from "react";

const topHolders = [
  { address: "0x4FC...1818", percent: 40.2 },
  { address: "0x928...cccc", percent: 25.5 },
  { address: "0xa22...dead", percent: 13.7 },
  { address: "0xbe9...9999", percent: 8.6 },
];

function TopHoldersCard() {
  return (
    <div className="bg-[#1C1C1C] border border-black rounded-[18px] p-6 w-full text-white">
      <h3 className="text-lg font-bold mb-4">Top Holders</h3>
      <div className="space-y-3">
        {topHolders.map((holder, index) => (
          <div key={index} className="flex items-center gap-4 text-sm">
            {/* Index */}
            <div className="w-8 text-gray-400 font-bold">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Wallet */}
            <div className="flex-1 text-white font-mono truncate">
              {holder.address}
            </div>

            {/* Percent Bar */}
            <div className="relative w-[40%] h-4 rounded-md overflow-hidden">
              <div
                className="absolute top-0 right-0 h-full bg-[#333333] rounded-md"
                style={{ width: `${holder.percent}%` }}
              />
              <span className="absolute right-2 text-xs font-semibold">
                {holder.percent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopHoldersCard;

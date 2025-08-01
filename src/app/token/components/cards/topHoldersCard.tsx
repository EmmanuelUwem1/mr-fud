"use client";
import Image from "next/image";
const topHolders = [
  { address: "0x4FC...1818", percent: 40.2 },
  { address: "0x928...cccc", percent: 25.5 },
  { address: "0xa22...dead", percent: 13.7 },
  { address: "0xbe9...9999", percent: 8.6 },
];

function TopHoldersCard() {
  return (
    <div className="bg-[#1C1C1C] border border-black rounded-[18px] p-6 w-full text-white">
      <h3 className="text-lg font-semibold mb-6">Top Holders</h3>
      <div className="space-y-3 text-xs font-semibold w-full">
        {topHolders.map((holder, index) => (
          <div key={index} className="flex items-center gap-4 text-[#626262]">
            {/* Index */}
            <div className="w-8 text-[#FFFFFF]">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Wallet */}
            <div className="flex font-mono truncat gap-2 items-center justify-start">
              <span className="relative h-5 flex w-5 items-center justify-center">
                <Image alt="" src={"/Blue cat 2 1.png"} layout="fill" objectFit="contain" objectPosition="center"/>
              </span>{" "}
              {holder.address}
            </div>

            {/* Percent Bar */}
            <div className="relative w-[70%] h-6 py-1 rounded-md overflow-hidden">
              <div
                className="absolute top-0 right-0 h-full bg-[#262626] rounded-md"
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

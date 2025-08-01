"use client";
import CreatedBy from "../created-by";
import { formatMarketCap } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Helper to determine background color based on index
const getGradientColor = (index: number): string => {
  switch (index) {
    case 0:
      return "#19367C";
    case 1:
      return "#410001";
    case 2:
      return "#412100";
    default:
      return "#1a1a23"; // fallback or generic color
  }
};

const LeaderboardCard = ({
  index = 0,
  ticker = "BSC",
  name = "Ethereum",
  marketCap = "3200000000",
  creator = "0x4FC...1818",
  imageUrl,
  createdDate,
  id,
}: {
  index: number;
  ticker: string;
  name: string;
  marketCap: string | number;
    creator: string;
    imageUrl: string;
    createdDate: string;
  id: string;
}) => {
  const formattedIndex = String(index + 1).padStart(3, "0");
  const formattedCap = formatMarketCap(Number(marketCap));
  const gradientColor = getGradientColor(index);

  return (
    <div className="relative py-6 rounded-[14px] shadow-lg bg-[#0A0A0A] text-white w-full md:max-w-sm mx-auto z-10 overflow-hidden">
      {/* background radial gradient */}
      <div
        className="absolute -top-[20%] -left-[20%] w-full h-full rounded-full blur-xl -z-1"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
        }}
      ></div>

      <div className="flex items-center justify-between gap-3 border-b border-b-[#221C28] pb-3 px-4">
        {/* left section */}
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="text-3xl font-light text-[#ffffff] geometric">
            {formattedIndex}
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div>
              <span className="text-lg text-[#E3E3E3] font-normal GasoekOne-Regular">
                ${ticker}
              </span>
              <div className="text-base font-semibold text-[#A0A0A0]">
                {name}
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <span className="text-sm text-white/70">mc</span>
            <span className="text-sm font-medium">{formattedCap}</span>
          </div>
        </div>

        {/* right section (image placeholder) */}
        <div className="flex aspect-square w-full rounded-[10px] bg-[#1a1a23] relative overflow-hidden">
          <Image alt="" src={imageUrl} layout="fill" objectPosition="center" objectFit="cover" />
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-3 px-4">
        <CreatedBy wallet={creator } createdAt={createdDate} />
        <Link href={`/token/${id}`} className="w-fit bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2 px-4 rounded-full transition-class">
          Buy
        </Link>
      </div>
    </div>
  );
};

export default LeaderboardCard;

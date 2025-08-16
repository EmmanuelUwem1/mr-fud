"use client";
import Image from "next/image";
import { formatDaysAgo } from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";

type BannerCampaignCardProps = {
  title: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  creator: string;
    position: number;

};

const BannerCampaignCard: React.FC<BannerCampaignCardProps> = ({
  title,
  bannerUrl,
  startDate,
  endDate,
  createdDate,
  creator,
    position,

}) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const isLive = now >= start;

  const formattedStart = start.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const formattedEnd = end.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const formattedRange = `${formattedStart} – ${formattedEnd}`;

  return (
    <div className="relative w-full max-w-[420px] h-full flex flex-col items-center">
      {/*  Badge  */}
      <div className="z-30 absolute -top-6 sm:-top-8 md:-top-10 lg:-top-14 aspect-[98/82] h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-16 lg:h-20 lg:w-24 flex items-center justify-center">
        <Image
          src={`/badges/${position}.png`}
          alt={`Rank ${position}`}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          quality={100}
          className="drop-shadow-lg"
        />
      </div>

      {/* Card */}
      <div className="cardonebg border md:border-[3px] border-[#05E02B] rounded-[4px] sm:rounded-[12px] overflow-hidden shadow-md w-full pb-2">
        {/* Banner Image */}
        <div className="aspect-[315/199] w-full relative bg-[#00000094]">
          <Image
            src={bannerUrl}
            alt={`${title} banner`}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="rounded-t-[15px]"
          />

          {/* Top Overlay */}
          <div className="absolute top-0 left-0 w-full flex justify-between lg:gap-4 md:gap-3 gap-2 items-center sm:px-3 px-2 py-2 md:py-3 lg:py-4 text-white text-[6px] lg:text-xs sm:text-[8px] md:text-[10px] font-medium">
            <span className="bg-[#FFFFFF] text-black px-1 sm:px-3 py-1 lg:px-4 lg:py-2 rounded-md">
              {formattedRange}
            </span>
            <span
              className={`font-extralight px-1 sm:px-3 py-1 lg:px-4 lg:py-2 rounded-md ${
                isLive
                  ? "bg-[#B20808] shadow-[0_0_8px_#E00505]"
                  : "bg-[#D0740B] shadow-[0_0_8px_#FF8E16C4]"
              }`}
            >
              {isLive ? "Live" : "Upcoming"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:py-4 sm:py-2 px-2 sm:px-4 md:px-2 sm:space-y-1 lg:space-y-2 text-[#F8F8F8]">
          <h3 className="md:text-lg text-[8px] sm:text-xs lg:text-xl font-bold text-[#000000]">
            {title}
          </h3>
          <div className="flex w-full sm:gap-1 items-center justify-between text-[4px] sm:text-[8px] md:text-[10px] lg:text-sm">
            <span className="lg:w-24 w-10 sm:w-full">{formatDaysAgo(createdDate)}</span>
            <span className="lg:w-28 w-10 sm:w-full">
              By: {formatWalletAddress(creator)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCampaignCard;

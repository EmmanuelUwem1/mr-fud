"use client";
import Image from "next/image";
import { formatDaysAgo } from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";
import Link from "next/link";

type CampaignCardProps = {
  title: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  createdDate: string;
    creator: string;
    id: string;
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  bannerUrl,
  startDate,
  endDate,
  createdDate,
    creator,
  id,
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
    <Link href={`/campaigns/${id}`} className="cardonebg border mx-auto border-[#05E02B] rounded-[12px] overflow-hidden h-full shadow-md w-full max-w-96 pb-3">
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
        <div className="absolute top-0 left-0 w-full flex justify-between gap-4 items-center px-4 py-2 md:py-4 text-white text-xs font-medium">
          <span className="bg-[#FFFFFF] text-black px-3 py-2 rounded-md">
            {formattedRange}
          </span>
          <span
            className={`font-extralight px-3 py-2 rounded-md ${
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
      <div className="px-4 pt-3 space-y-2 text-[#F8F8F8]">
        <h3 className="text-lg md:text-xl font-bold text-[#000000]">{title}</h3>

        {/* Created Info */}
        <div className="flex justify-between text-sm">
          <span>{formatDaysAgo(createdDate)}</span>
          <span>By: {formatWalletAddress(creator)}</span>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;

"use client";
import Image from "next/image";
import { formatDaysAgo } from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";
import Link from "next/link";
import SocialLinks from "../socialLinks";
import { useRipple } from "@/hooks/useRipple";
type CampaignCardProps = {
  title: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  creator: string;
  id: string;
  description?: string;
  twitter?: string;
  website?: string;
  telegram?: string;
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  bannerUrl,
  startDate,
  endDate,
  createdDate,
  creator,
  id,
  twitter,
  website,
  telegram,
  description = "",
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
const ripple = useRipple();
  return (
    <Link
      href={`/campaigns/${id}`}
      className="group relative cardonebg border mx-auto border-[#05E02B] rounded-[12px] h-full overflow-hidden shadow-md w-full max-w-96 pb-3" onClick={ripple}
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7E436] to-[#05E02B] text-white p-[6px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center">
        <div className="absolute inset-1 cardbg text-white p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex rounded-[12px] flex-col justify-center items-center text-center">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm mb-4">{title}</p>
          <div className="text-xs space-y-1">
            <p>{description || " no description provided"}</p>
            <SocialLinks
              twitter={twitter}
              website={website}
              telegram={telegram}
            />
            <button className="px-4 py-3 w-full rounded-full bg-[#00C3FE]">
              View more
            </button>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="aspect-[315/199] w-full relative bg-[#00000094] z-10">
        <Image
          src={bannerUrl}
          alt={`${title} banner`}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="rounded-t-[15px]"
        />

        {/* Top Overlay */}
        <div className="absolute top-0 left-0 w-full flex justify-between gap-4 items-center px-4 py-3 md:py-4 text-white text-xs font-medium z-10">
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
      <div className="px-4 pt-3 space-y-2 text-[#F8F8F8] z-10">
        <h3 className="text-lg md:text-xl font-bold text-[#000000]">{title}</h3>
        <div className="flex justify-between text-sm">
          <span>{formatDaysAgo(createdDate)}</span>
          <span>By: {formatWalletAddress(creator)}</span>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;

"use client";
import { LabelValuePair } from "../labelValuePair";
import Bar from "../bar";
import { formatMarketCap } from "@/lib/utils";
import ProjectProfileCard from "./project-card";
import Image from "next/image";

interface TokenStatsProps {
  mCap: number | string;
  tokenName: string;
  tokenCreatedDate?: string;
  tokenImage: string;
  tokenId?: string;
  creatorReward?: string;
    referalReward?: string;
    isCompleted: boolean;
    twitter?: string;
    website?: string;
    telegram?: string;
    
}

export default function ProjectStatsCard({mCap, creatorReward, referalReward, tokenImage, tokenName, isCompleted, twitter, website, telegram }: TokenStatsProps) {

  return (
    <div className="px-3 flex w-full justify-center lg:justify-start items-end gap-3 text-white flex-wrap lg:flex-nowrap">
      <ProjectProfileCard imageUrl={tokenImage} />
      {/* Stats */}
      <div className="flex px-3 items-center justify-center lg:justify-start w-full flex-wrap-reverse">
        <div className="flex h-full flex-nowrap items-center gap-3 sm:gap-4 w-full justify-center lg:justify-start">
          <LabelValuePair label="Mcap" value={formatMarketCap(mCap)} />

          {creatorReward && referalReward && (
            <>
              {" "}
              <Bar />
              <LabelValuePair label="Creator reward" value="2.5 BNB" />
              <Bar />
              <LabelValuePair label="Referral" value="2.98 BNB" />
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="font-semibold text-lg">{tokenName}</span>
          {isCompleted ? (
            <span className="bg-[#0BDB2E] shadow-[0_0_8px_#05E02B] px-3 py-2 rounded-md">
              Complete
            </span>
          ) : (
            <span className="bg-[#D0740B] shadow-[0_0_8px_#FF8E16C4] px-3 py-2 rounded-md">
              Upcoming
            </span>
          )}
        </div>
      </div>
      {/* Social Links */}
      <div className="flex bg-[#0091CA] border border-[#FFFFFF] rounded-[10px] gap-2 py-1 px-2 items-center">
        {twitter && (
          <>
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image src="/icons/x.png" alt="Twitter" width={20} height={20} />
            </a>
            |
          </>
        )}
        {telegram && (
          <>
            {" "}
            <a
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image
                src="/icons/telegram.png"
                alt="Telegram"
                width={20}
                height={20}
              />
            </a>
            |
          </>
        )}
        {website && (
          <>
            {" "}
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image
                src="/icons/website.png"
                alt="Website"
                width={20}
                height={20}
              />
            </a>
            |
          </>
        )}
      </div>
    </div>
  );
}

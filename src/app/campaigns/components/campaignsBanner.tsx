"use client";
import { useTokens } from "@/context/TokensContext";
import Link from "next/link";
import BannerCampaignCard from "./cards/bannerCampaignCard";


export default function Banner() {
  const { tokens, loading } = useTokens();

  const topThree = tokens.slice(0, 3);

  return (
    <section className="relative py-12 w-full h-30 sm:h-46 md:h-60 lg:h-[320px] mt-18 sm:mt-24 md:mt-36 rounded-[20px] flex flex-col items-center justify-center bg-pattern">
      {loading ? (
        <div className="z-20 text-white text-sm animate-pulse">
          Loading campaigns...
        </div>
      ) : (
        <>
          <div className="z-20 gap-2 sm:gap-4 flex justify-center items-start w-full px-6 lg:gap-8 sm:px-10">
            {/* Left card (index 0) */}
            <Link
              href={`/campaigns/${topThree[1]._id}`}
              className="w-full max-w-[20rem] relative transition-transform -translate-y-6 md:-translate-y-10 lg:-translate-y-16"
            >
              <BannerCampaignCard
                title={topThree[1].name}
                bannerUrl={topThree[1].image}
                startDate={topThree[1].createdAt}
                endDate={topThree[1].createdAt}
                createdDate={topThree[1].createdAt}
                creator={topThree[1].creatorWallet}
                position={2}
              />
            </Link>

            {/* Center card (index 1) */}
            <Link
              href={`/campaigns/${topThree[0]._id}`}
              className="w-full max-w-[20rem] relative transition-transform -translate-y-12 md:-translate-y-18 lg:-translate-y-28 z-10"
            >
              <BannerCampaignCard
                title={topThree[0].name}
                bannerUrl={topThree[0].image}
                startDate={topThree[0].createdAt}
                endDate={topThree[0].createdAt}
                createdDate={topThree[0].createdAt}
                creator={topThree[0].creatorWallet}
                position={1}
              />
            </Link>

            {/* Right card (index 2) */}
            <Link
              href={`/campaigns/${topThree[2]._id}`}
              className="w-full max-w-[20rem] relative transition-transform -translate-y-6 md:-translate-y-10 lg:-translate-y-16"
            >
                <BannerCampaignCard
                  
                title={topThree[2].name}
                bannerUrl={topThree[2].image}
                startDate={topThree[2].createdAt}
                endDate={topThree[2].createdAt}
                createdDate={topThree[2].createdAt}
                creator={topThree[2].creatorWallet}
                position={3}
              />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

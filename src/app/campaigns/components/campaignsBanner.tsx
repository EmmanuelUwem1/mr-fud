"use client";
import { useCampaigns } from "@/context/campaignsContext";
import BannerCampaignCard from "./cards/bannerCampaignCard";
import { useRouter } from "next/navigation";


export default function Banner() {
  const { campaigns, loading } = useCampaigns();

  const router = useRouter();

  const topThree = campaigns.slice(0, 3);
    if (!campaigns) {
    return (
      <p className="text-center text-[#87DDFF] py-20 col-span-full">
        No campaigns available.
      </p>
    );
  }

  return (
    <section className="relative py-12 w-full h-30 sm:h-46 md:h-60 lg:h-[320px] mt-4 sm:mt-24 md:mt-36 rounded-[20px] flex flex-col items-center justify-center bg-pattern">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400" />
        </div>
      ) : (
        <>
          <div className="z-20 gap-2 sm:gap-4 flex justify-center items-start w-full px-6 lg:gap-8 sm:px-10">
            {/* Left card (index 0) */}
            <div
              onClick={() => router.push(`/campaigns/${topThree[1]._id}`)}
              className="w-full max-w-[20rem] relative transition-transform -translate-y-6 md:-translate-y-10 lg:-translate-y-16"
            >
              <BannerCampaignCard
                title={topThree[1].coinName}
                bannerUrl={topThree[1].image}
                startDate={topThree[1].startDate}
                endDate={topThree[1].endDate}
                createdDate={topThree[1].createdAt}
                creator={topThree[1].creatorWallet || ""}
                position={2}
                twitter={topThree[1].twitter}
                telegram={topThree[1].telegram}
                website={topThree[1].website}
                description={topThree[1].description}
              />
            </div>

            {/* Center card (index 1) */}
            <div
              onClick={() => router.push(`/campaigns/${topThree[0]._id}`)}
              className="w-full max-w-[20rem] relative transition-transform -translate-y-12 md:-translate-y-18 lg:-translate-y-28 z-10"
            >
              <BannerCampaignCard
                title={topThree[0].coinName}
                bannerUrl={topThree[0].image}
                startDate={topThree[0].startDate}
                endDate={topThree[0].endDate}
                createdDate={topThree[0].createdAt}
                creator={topThree[0].creatorWallet || ""}
                position={1}
                twitter={topThree[0].twitter}
                telegram={topThree[0].telegram}
                website={topThree[0].website}
                description={topThree[0].description}
              />
            </div>

            {/* Right card (index 2) */}
            <div
              onClick={() => router.push(`/campaigns/${topThree[2]._id}`)}
              className="w-full max-w-[20rem] relative transition-transform -translate-y-6 md:-translate-y-10 lg:-translate-y-16"
            >
              <BannerCampaignCard
                title={topThree[2].coinName}
                bannerUrl={topThree[2].image}
                startDate={topThree[2].startDate}
                endDate={topThree[2].endDate}
                createdDate={topThree[2].createdAt}
                creator={topThree[2].creatorWallet as string || ""}
                position={3}
                twitter={topThree[2].twitter}
                telegram={topThree[2].telegram}
                website={topThree[2].website}
                description={topThree[2].description}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

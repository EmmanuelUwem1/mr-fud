"use client";
import {  useState } from "react";
import { useCampaigns } from "@/context/campaignsContext";
import SearchBar from "@/components/searchBar";
import CampaignCard from "./cards/campaignCard";
import Image from "next/image";


const tabOptions = [
  { text: "Live", image: "/Group.png", active: "/local_fire_department.png" },
  {
    text: "Upcoming",
    image: "/Vector-rocket.png",
    active: "/Vector-black.png",
  },
  { text: "Meme", image: "/pet-white.png", active: "/pet.png" },
  { text: "AI ", image: "/magic-star.png", active: "/ai-black.png" },
];

export default function CampaignsSection() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const { campaigns, loading } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const handleTabClick = (tabText: string) => {
    setLocalLoading(true);
    setActiveTab(tabText);
    setTimeout(() => {
      setLocalLoading(false);
    }, 500);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    `${campaign.coinName} `
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

const today = new Date();

const sortedCampaigns = filteredCampaigns.filter((campaign) => {
  const endDate = new Date(campaign.endDate);

  switch (activeTab) {
    case "Live":
      return endDate < today; // Campaigns that have ended
    case "Upcoming":
      return endDate >= today; // Campaigns still ongoing or in future
    case "Meme":
      return true; // Show all campaigns
    case "AI ":
      return false; // Show none
    default:
      return true;
  }
});

    if (!campaigns) {
      return (
        <div className="text-center m-auto text-[#87DDFF] py-10">
          Campaign not found.
        </div>
      );
    }

  return (
    <section className="w-full py-10 flex flex-col gap-8">
      {/* Tabs Navigation */}
      <div className="w-full flex justify-center lg:justify-between lg:flex-nowrap flex-wrap">
        <div className="flex gap-2 md:gap-4 justify-start sm:justify-center items-center w-full mb-4 lg:mb-0 border-[#F8F8F8] flex-nowrap overflow-x-auto">
          {tabOptions.map((tab) => (
            <button
              key={tab.text}
              onClick={() => handleTabClick(tab.text)}
              className={`px-5 text-xs py-2 rounded-full border transition-class whitespace-nowrap sm:text-sm font-medium bg-[#02021399] border-[#494952] cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.text
                  ? "bg-white text-black"
                  : " text-white hover:bg-white hover:text-black"
              }`}
            >
              <span className="relative w-4 h-4 flex-shrink-0">
                <Image
                  src={activeTab === tab.text ? tab.active : tab.image}
                  alt={`${tab.text} icon`}
                  fill
                  className="object-contain"
                />
              </span>
              {tab.text}
            </button>
          ))}
        </div>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          className="max-sm:rounded-[12px] rounded-full mx-auto my-auto"
        />
      </div>

      {/* Campaign Cards Grid */}
      {localLoading || loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
        </div>
      ) : sortedCampaigns.length === 0 ? (
        <p className="text-center text-[#87DDFF] col-span-full py-20">
          No campaigns available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center place-items-center gap-6 w-full">
          {sortedCampaigns.map((campaign) => (
            <CampaignCard
              id={campaign._id}
              key={campaign._id}
              title={campaign.campaignTitle}
              bannerUrl={campaign.image}
              startDate={campaign.startDate}
              createdDate={campaign.createdAt}
              creator={campaign.creatorWallet}
              endDate={campaign.endDate}
              description={campaign.description}
              twitter={campaign.twitter}
              website={campaign.website}
              telegram={campaign.telegram}
            />
          ))}
        </div>
      )}
    </section>
  );
}

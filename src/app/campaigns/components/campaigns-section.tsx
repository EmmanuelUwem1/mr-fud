"use client";
import { useState } from "react";
import { useTokens } from "@/context/TokensContext";
import SearchBar from "@/components/searchBar";
import CampaignCard from "./cards/campaignCard";


const tabOptions = [
  { text: "Live", image: "/Vector-fire.png" },
  { text: "Upcoming", image: "/trend-up.png" },
  { text: "Meme", image: "/trend-up.png" },
  { text: "AI ", image: "/Vector-rocket.png" },
];

export default function CampaignsSection() {
  const [activeTab, setActiveTab] = useState("Live");
  const { tokens, loading } = useTokens();
  const [searchTerm, setSearchTerm] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const handleTabClick = (tabText: string) => {
    setLocalLoading(true);
    setActiveTab(tabText);
    setTimeout(() => {
      setLocalLoading(false);
    }, 500);
  };

  const filteredTokens = tokens.filter((token) =>
    `${token.name} ${token.contractAddress}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedTokens = [...filteredTokens];

  switch (activeTab) {
    case "Trending":
    case "Market Cap":
      sortedTokens.sort(
        (a, b) =>
          b.currentPrice * b.totalSupply - a.currentPrice * a.totalSupply
      );
      break;
    case "Newly Launched":
      sortedTokens.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      break;
  }
    if (!tokens) {
      return (
        <div className="text-center m-auto text-red-500 py-10">
          Campaign not found.
        </div>
      );
    }

  return (
    <section className="w-full py-10 flex flex-col gap-8">
      {/* Tabs Navigation */}
      <div className="w-full overflow-x-auto">
        <div className="flex mx-auto gap-2 md:gap-4 justify-center items-center w-full mb-4 border-[#F8F8F8] flex-wrap">
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
              {tab.text}
            </button>
          ))}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Campaign Cards Grid */}
      {localLoading || loading ? (
        <p className="text-center text-gray-400">Loading campaigns...</p>
      ) : sortedTokens.length === 0 ? (
        <p className="text-center text-gray-400 col-span-full">
          No campaigns available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center place-items-center gap-6 w-full">
          {sortedTokens.map((token) => (
            <CampaignCard
              id={token._id}
              key={token._id}
              title={token.name}
              bannerUrl={token.image}
              startDate={token.createdAt}
              createdDate={token.createdAt}
              creator={token.creatorWallet}
              endDate={token.createdAt}
              description={token.description}
              twitter={ token.twitter}
              website={token.website}
              telegram={token.telegram}
            />
          ))}
        </div>
      )}
    </section>
  );
}

"use client";
import { useState } from "react";
import { useTokens } from "@/context/TokensContext";
import SearchBar from "@/components/searchBar";
import CampaignCard from "./cards/campaignCard";


const tabOptions = [
  { text: "Trending", image: "/Vector-fire.png" },
  { text: "Market Cap", image: "/trend-up.png" },
  { text: "Newly Launched", image: "/trend-up.png" },
  { text: "Graduated", image: "/Vector-rocket.png" },
  { text: "About to Graduate", image: "/Vector-rocket.png" },
];

export default function CampaignsSection() {
  const [activeTab, setActiveTab] = useState("Trending");
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

  return (
    <section className="w-full py-10 flex flex-col gap-8">
      {/* Tabs Navigation */}
      <div className="w-full overflow-x-auto">
        <div className="flex mx-auto gap-2 md:gap-4 justify-center items-center w-full mb-4 border-[#F8F8F8] flex-wrap">
          {tabOptions.map((tab) => (
            <button
              key={tab.text}
              onClick={() => handleTabClick(tab.text)}
              className={`px-5 py-2 rounded-full border transition-class whitespace-nowrap text-sm font-medium tabs-gradient-wrapper cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.text
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {sortedTokens.map((token) => (
            <CampaignCard
              key={token._id}
              title={token.name}
              bannerUrl={token.image}
              startDate={new Date(token.createdAt).toLocaleDateString()}
              endDate={new Date(token.createdAt).toLocaleDateString()} // Replace with actual endDate if available
              twitter={token.twitter}
              website={token.website}
              telegram={token.telegram}
            />
          ))}
        </div>
      )}
    </section>
  );
}

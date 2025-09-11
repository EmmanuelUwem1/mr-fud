"use client";
import TokenCard from "./cards/token";
import TokensSkeleton from "./loaders/TokensSkeleton"; 
import { useState } from "react";
import { useTokens } from "@/context/TokensContext";
import SearchBar from "@/components/searchBar";
import Image from "next/image";

const tabOptions = [
  { text: "Trending", image: "/Group.png", active: "/Vector-fire.png" },
  { text: "Market Cap", image: "/trend-up.png", active: "/trend-up-black.png" },
  {
    text: "Newly Launched",
    image: "/trend-up.png",
    active: "/trend-up-black.png",
  },
  {
    text: "Graduated",
    image: "/Vector-rocket.png",
    active: "/Vector-black.png",
  },
  {
    text: "About to Graduate",
    image: "/Vector-rocket.png",
    active: "/Vector-black.png",
  },
];

export default function TokensSection() {
  const [activeTab, setActiveTab] = useState("Trending");
  const { tokens, loading } = useTokens();
  const [searchTerm, setSearchTerm] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const handleTabClick = (tabText: string) => {
    setLocalLoading(true);
    setActiveTab(tabText);
    setTimeout(() => {
      setLocalLoading(false);
    }, 500); // half second delay
  };

  const filteredTokens = tokens.filter((token) =>
    `${token.name} ${token.contractAddress}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  let sortedTokens: typeof filteredTokens = [];

  switch (activeTab) {
    case "Trending":
      sortedTokens = [...filteredTokens].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;

    case "Market Cap":
      sortedTokens = [...filteredTokens].sort(
        (a, b) =>
          b.currentPrice * b.totalSupply - a.currentPrice * a.totalSupply
      );
      break;

    case "Newly Launched":
      sortedTokens = [...filteredTokens].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;

    case "Graduated":
    case "About to Graduate":
      sortedTokens = []; // Show none
      break;

    default:
      sortedTokens = [...filteredTokens];
      break;
  }

const seenContracts = new Set<string>();
const seenNames = new Set<string>();

const uniqueSortedTokens = sortedTokens.filter((token) => {
  const ca = token.contractAddress.toLowerCase();
  const name = token.name.toLowerCase();

  if (seenContracts.has(ca) || seenNames.has(name)) {
    return false; // Skip duplicates
  }

  seenContracts.add(ca);
  seenNames.add(name);
  return true;
});


  return (
    <section className="w-full py-10 flex flex-col items-center gap-8">
      {/* Tabs Navigation */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 max-w-7xl">
        <div className="flex overflow-x-auto gap-2 md:gap-4 justify-start items-center w-full max-md:mb-4 flex-nowrap">
          {tabOptions.map((tab) => (
            // tabs-gradient-wrapper
            <button
              key={tab.text}
              onClick={() => handleTabClick(tab.text)}
              className={`sm:px-5 px-3 py-2 rounded-full border transition-class whitespace-nowrap text-xs sm:text-sm font-medium bg-[#02021399] border-[#494952] cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.text
                  ? "bg-white text-black"
                  : "text-white hover:bg-white hover:text-black"
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
          className="rounded-full mx-auto my-auto"
        />
      </div>

      {localLoading || loading ? (
        <TokensSkeleton />
      ) : sortedTokens.length === 0 ? (
        <p className="text-center text-[#87DDFF] py-20 col-span-full">
          No tokens available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {uniqueSortedTokens.map((token) => (
            <TokenCard
              key={token._id}
              ticker={token.ticker}
              name={token.name}
              ca={token.contractAddress}
              marketCap={token.currentPrice * token.totalSupply}
              createdBy={token.creatorWallet}
              image={token.image}
              id={token._id}
              createdTime={token.createdAt}
            />
          ))}
        </div>
      )}
    </section>
  );
}

"use client";
import TokenCard from "./cards/token";
import TokensSkeleton from "./loaders/TokensSkeleton"; 
import { useState } from "react";
import { useTokens } from "@/context/TokensContext";
import SearchBar from "@/components/searchBar";

const tabOptions = [
  { text: "Trending", image: "/Vector-fire.png" },
  { text: "Market Cap", image: "/trend-up.png" },
  { text: "Newly Launched", image: "/trend-up.png" },
  { text: "Graduated", image: "/Vector-rocket.png" },
  { text: "About to Graduate", image: "/Vector-rocket.png" },
];

export default function TokensSection() {
  const [activeTab, setActiveTab] = useState("Trending");
  const { tokens, loading } = useTokens();
  const [searchTerm, setSearchTerm] = useState("");
  const [localLoading, setLocalLoading] = useState(false);


  const handleTabClick = (tabText:string) => {
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
  
const sortedTokens = [...filteredTokens]; 

switch (activeTab) {
  case "Trending":
    sortedTokens.sort(
      (a, b) => b.currentPrice * b.totalSupply - a.currentPrice * a.totalSupply
    );
    break;

  case "Market Cap":
    sortedTokens.sort(
      (a, b) => b.currentPrice * b.totalSupply - a.currentPrice * a.totalSupply
    );
    break;

  case "Newly Launched":
    sortedTokens.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    break;

  // case "Graduated":
  //   sortedTokens.sort((a, b) => {
  //     if (a.isGraduated === b.isGraduated) return 0;
  //     return a.isGraduated ? -1 : 1;
  //   });
  //   break;

  // case "About to Graduate":
    // sortedTokens
    //   .filter((token) => !token.isGraduated)
    //   .sort(
    //     (a, b) =>
    //       b.currentPrice * b.totalSupply - a.currentPrice * a.totalSupply
    //   );
    // break;

  default:
    break;
}



  return (
    <section className="w-full py-10 flex flex-col gap-8">
      {/* Tabs Navigation */}
      <div className="w-full overflow-x-auto">
        <div className="flex mx-auto gap-2 md:gap-4 justify-center items-center w-full mb-4 flex-wrap">
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
              {/* <span className="relative w-4 h-4 flex-shrink-0">
                <Image
                  src={tab.image}
                  alt={`${tab.text} icon`}
                  fill
                  className="object-contain"
                />
              </span> */}
              {tab.text}
            </button>
          ))}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {localLoading || loading ? (
        <TokensSkeleton />
      ) : sortedTokens.length === 0 ? (
        <p className="text-center text-gray-400 col-span-full">
          No tokens available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {sortedTokens.map((token) => (
            <TokenCard
              key={token._id}
              ticker={token.ticker}
              name={token.name}
              ca={token.contractAddress}
              marketCap={token.currentPrice * token.totalSupply}
              createdBy={token.creatorWallet}
              rating={80}
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

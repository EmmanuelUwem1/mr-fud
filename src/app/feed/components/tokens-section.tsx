"use client";
import TokenCard from "./cards/token";
import TokensSkeleton from "./loaders/TokensSkeleton"; 
import { useState } from "react";
import Image from "next/image";
import { useTokens } from "@/context/TokensContext";

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

  return (
    <section className="w-full py-10 flex flex-col gap-8">
      {/* Tabs Navigation */}
      <div className="w-full overflow-x-auto">
        <div className="flex mx-auto gap-4 justify-center items-center w-full mb-4 border-[#F8F8F8] flex-wrap">
          {tabOptions.map((tab) => (
            <button
              key={tab.text}
              onClick={() => setActiveTab(tab.text)}
              className={`px-5 py-2 rounded-full border transition-class whitespace-nowrap text-sm font-medium tabs-gradient-wrapper cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.text
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
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
        </div>
      </div>

      {/* Tokens Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <TokensSkeleton />
        ) : tokens.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No tokens available.
          </p>
        ) : (
          tokens.map((token) => (
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
          ))
        )}
      </div>
    </section>
  );
}

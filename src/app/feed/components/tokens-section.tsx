"use client";
import TokenCard from "./cards/token";
import { Mocktokens } from "@/lib/data/mock-tokens";
import { useState } from "react";

const tabOptions = [
  "Trending",
  "Market Cap",
  "Newly Launched",
  "Graduated",
  "About to Graduate",
];

export default function TokensSection() {
  const [activeTab, setActiveTab] = useState("Trending");

  return (
    <section className="w-full py-10 flex flex-col gap-8">
      {/* Tabs Navigation */}
      <div className="w-full overflow-x-auto">
        <div className="flex lg:mx-auto gap-4 justify-start lg:justify-center items-center min-w-[600px] sm:min-w-full">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full border border-white transition-class whitespace-nowrap text-sm font-medium cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
              }`}
            >
              {tab}
              {/* Icon placeholder to be added later */}
            </button>
          ))}
        </div>
      </div>

      {/* Tokens Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Mocktokens.map((token) => (
          <TokenCard
            key={token.ca}
            ticker={token.ticker}
            name={token.name}
            ca={token.ca}
            marketCap={token.marketCap}
            createdBy={token.createdBy}
            rating={token.rating}
          />
        ))}
      </div>
    </section>
  );
}

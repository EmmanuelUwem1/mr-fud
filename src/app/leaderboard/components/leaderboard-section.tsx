"use client";

import { useState } from "react";
import LeaderboardCard from "./cards/leaderboard-card";
import LeaderboardTable from "./leaderboard-table";

type TopToken = {
  index: string;
  ticker: string;
  name: string;
  marketCap: string;
  creator: string;
  imageUrl: string;
};

const topThreeTokens: TopToken[] = [
  {
    index: "001",
    ticker: "ETH",
    name: "Ethereum",
    marketCap: "3200000000",
    creator: "0x4FC...1818",
    imageUrl: "/images/eth.png",
  },
  {
    index: "002",
    ticker: "BTC",
    name: "Bitcoin",
    marketCap: "885000000",
    creator: "0x91A...FF2E",
    imageUrl: "/images/btc.png",
  },
  {
    index: "003",
    ticker: "SOL",
    name: "Solana",
    marketCap: "460000000",
    creator: "0x73D...990A",
    imageUrl: "/images/sol.png",
  },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<
    "tokens" | "referrals" | "socials"
  >("tokens");

  const tabs = ["tokens", "referrals", "socials"];

  return (
    <>
      {/* Tabs */}
      <div className="flex w-full items-center justify-start py-4">
        <div className="flex p-2 rounded-full bg-[#262626]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`capitalize px-4 py-2 text-sm rounded-full transition-class cursor-pointer font-medium ${
                activeTab === tab
                  ? "bg-[#141414] text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Leaderboard Cards */}
      {activeTab === "tokens" && (
        <div className="flex items-center justify-center lg:flex-nowrap flex-wrap py-4 gap-4 w-full">
          {topThreeTokens.map((token, index) => (
            <LeaderboardCard
              key={index}
              index={index}
              ticker={token.ticker}
              name={token.name}
              marketCap={token.marketCap}
              creator={token.creator}
              // imageUrl={token.imageUrl}
            />
          ))}
        </div>
      )}

      {/* Leaderboard Table or Tab-specific content */}
      <section className="bg-[#141414] p-6 rounded-xl space-y-10 flex-col w-full">
        {activeTab === "tokens" && <LeaderboardTable />}
        {activeTab === "referrals" && (
          <div className="text-white text-center">
            Referral rankings coming soon 🚀
          </div>
        )}
        {activeTab === "socials" && (
          <div className="text-white text-center">
            Social engagement leaderboard loading... 🔗
          </div>
        )}
      </section>
    </>
  );
};

export default Leaderboard;

"use client";

import { useState } from "react";
import LeaderboardCard from "./cards/leaderboard-card";
import LeaderboardTable from "./leaderboard-table";
import { Tokens } from "@/lib/data/mock-tokens";



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
          {Tokens.slice(0, 3).map((token, index) => (
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

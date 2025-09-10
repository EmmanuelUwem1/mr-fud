"use client";
import { useState } from "react";
import LeaderboardCard from "./cards/leaderboard-card";
import LeaderboardTable from "./leaderboard-table";
// import { Tokens } from "@/lib/data/mock-tokens";
import { useTokens } from "@/context/TokensContext";




const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<
    "Marketcap" | "referrals" | "Creators"
  >("Marketcap");

    const { tokens, loading } = useTokens();
  

  const tabs = ["Marketcap", "referrals", "Creators"];

  return (
    <>
      {loading && (
        <div className="flex mx-auto justify-center items-center h-40">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
        </div>)
}
      {/* Tabs */}
      <div className="flex w-full items-center justify-start py-4">
        <div className="flex p-2 rounded-full cardthreebg">
          {/* bg-[#262626] */}
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`capitalize px-4 py-2 text-sm rounded-full transition-class cursor-pointer ${
                activeTab === tab
                  ? "bg-[#00C3FE] text-white font-medium"
                  : "text-[#FFFFFF] font-normal hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Top 3 Leaderboard Cards */}
      {activeTab === "Marketcap" && (
        <div className="flex items-center justify-center lg:flex-nowrap flex-wrap py-4 gap-4 w-full">
          {tokens.slice(0, 3).map((token, index) => (
            <LeaderboardCard
              key={token._id}
              index={index}
              ticker={token.ticker}
              name={token.name}
              marketCap={token.totalSupply * token.currentPrice}
              creator={token.creatorWallet}
              imageUrl={token.image}
              createdDate={token.createdAt}
              id={token._id}
            />
          ))}
        </div>
      )}
      {/* Leaderboard Table or Tab-specific content */}
      {/* bg-[#141414] */}
      <section className="cardthreebg rounded-xl space-y-10 flex-col w-full">
        {activeTab === "Marketcap" && <LeaderboardTable />}
        {activeTab === "referrals" && (
          <div className="text-white text-center py-4">
            Referral rankings coming soon
          </div>
        )}
        {activeTab === "Creators" && (
          <div className="text-white text-center py-4">coming soon</div>
        )}
      </section>
    </>
  );
};

export default Leaderboard;

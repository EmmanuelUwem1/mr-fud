"use client";

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
  return (
    <>
      <div className="flex items-center justify-center lg:flex-nowrap flex-wrap py-4 gap-4 w-full">
        {/* Top 3 Leaderboard Cards */}
        
          {topThreeTokens.map((token, index) => (
            <LeaderboardCard
              key={index}
              index={index}
              ticker={token.ticker}
              name={token.name}
              marketCap={token.marketCap}
              creator={token.creator}
              // imageUrl={token.imageUrl}
              // onBuyClick={() => console.log(`Buy ${token.ticker}`)}
            />
          ))}
        
      </div>
      <section className="bg-[#141414] p-6 rounded-xl space-y-10 flex-col w-full">
        {/* Rest of the Leaderboard Table */}
        <LeaderboardTable />
      </section>
    </>
  );
};

export default Leaderboard;

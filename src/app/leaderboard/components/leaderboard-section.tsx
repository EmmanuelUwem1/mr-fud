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
    <section className="bg-[#141414] p-6 rounded-xl space-y-10">
      {/* Top 3 Leaderboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topThreeTokens.map((token) => (
          <LeaderboardCard
            key={token.index}
            index={token.index}
            ticker={token.ticker}
            name={token.name}
            marketCap={token.marketCap}
            creator={token.creator}
            // imageUrl={token.imageUrl}
            // onBuyClick={() => console.log(`Buy ${token.ticker}`)}
          />
        ))}
      </div>

      {/* Rest of the Leaderboard Table */}
      <LeaderboardTable />
    </section>
  );
};

export default Leaderboard;

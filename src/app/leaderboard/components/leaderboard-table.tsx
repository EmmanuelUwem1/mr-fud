"use client";

import TokenAvatar from "@/components/avaters/token-avatar";
import MarketCap from "@/components/market-cap";
import UserAvatar from "@/components/avaters/user-avatar";

type TokenData = {
  index: string;
  imageUrl: string;
  ticker: string;
  name: string;
  marketCap: string;
  changePercent: string;
  createdBy: {
    imageUrl: string;
    username: string;
    subtitle: string;
  };
};

// 👇🏽 Example Mock Data
const mockTokens: TokenData[] = [
  {
    index: "001",
    imageUrl: "/images/eth.png",
    ticker: "ETH",
    name: "Ethereum",
    marketCap: "3200000",
    changePercent: "12.3",
    createdBy: {
      imageUrl: "/images/emmanuel.png",
      username: "Emmanuel.eth",
      subtitle: "0x4FC...1818",
    },
  },
  {
    index: "002",
    imageUrl: "/images/btc.png",
    ticker: "BTC",
    name: "Bitcoin",
    marketCap: "885000000",
    changePercent: "-3.1",
    createdBy: {
      imageUrl: "/images/satoshi.png",
      username: "Satoshi",
      subtitle: "0x91A...FF2E",
    },
  },
  // Add more rows as needed
];

const LeaderboardTable = () => {
  return (
    <div className="w-full overflow-x-auto bg-[#141414] rounded-xl p-4">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="grid grid-cols-3 text-[#777777] text-base font-medium pb-3 border-b border-[#221C28]">
          <div>Token</div>
          <div>Created By</div>
          <div>Market Cap</div>
        </div>

        {/* Rows */}
        {mockTokens.map((token, i) => (
          <div
            key={i}
            className="grid grid-cols-3 py-4 border-t border-[#221C28] items-center"
          >
            <TokenAvatar
              index={i}
              imageUrl={token.imageUrl}
              ticker={token.ticker}
              name={token.name}
            />
            <UserAvatar
              imageUrl={token.createdBy.imageUrl}
              username={token.createdBy.username}
              subtitle={token.createdBy.subtitle}
            />
            <MarketCap
              marketCap={token.marketCap}
              changePercent={token.changePercent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;

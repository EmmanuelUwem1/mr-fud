"use client";

import TokenAvatar from "@/components/avaters/token-avatar";
import MarketCap from "@/components/market-cap";
import UserAvatar from "@/components/avaters/user-avatar";
import { mockTokens } from "@/lib/data/mock-tokens";


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

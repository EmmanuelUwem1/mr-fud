"use client";
import Link from "next/link";
import TokenAvatar from "@/components/avaters/token-avatar";
import MarketCap from "@/components/market-cap";
import UserAvatar from "@/components/avaters/user-avatar";
// import { mockTokens } from "@/lib/data/mock-tokens";
import { useTokens } from "@/context/TokensContext";
import {formatDaysAgo} from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";


const LeaderboardTable = () => {
      const { tokens, loading } = useTokens();
  
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
        {tokens.map((token, i) => (
          <Link 
            href={`/token/${token._id}`}
            key={i}
            className="grid grid-cols-3 py-4 border-t border-[#221C28] items-center cursor-pointer hover:bg-[#1d1d1d] transition-class"
          >
            <TokenAvatar
              index={i}
              imageUrl={token.image}
              ticker={token.ticker}
              name={token.name}
            />
            <UserAvatar
              // imageUrl={token.createdBy}
              username={formatWalletAddress(token.creatorWallet)}
              subtitle={formatDaysAgo(token.createdAt)}
            />
            <MarketCap
              marketCap={token.totalSupply * token.currentPrice}
              // changePercent={}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;

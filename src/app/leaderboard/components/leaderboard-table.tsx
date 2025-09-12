"use client";

import { useTokens } from "@/context/TokensContext";

import TokenRow from "./token-row";


const LeaderboardTable = () => {
  const { tokens, loading } = useTokens();
  // Generate random market cap between $10M and $500M
  const randomMarketCap =
    Math.floor(Math.random() * (500_000 - 440_000 + 1)) + 1_000;

  return (
    <div className="w-full overflow-x-auto max-h-[calc(100vh-6rem)] box-bg rounded-xl p-4">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="grid grid-cols-3 text-[#87DDFF] text-base font-medium pb-3  border-[#38B9FF]">
          <div>Token</div>
          <div>Created By</div>
          <div>Market Cap</div>
        </div>

        {/* Rows */}
        {tokens.map((token, i) => (
          <TokenRow token={token} index={i} key={i} />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;

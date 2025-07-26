"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TokenStatsCard from "../components/TokenStatsCard";
import TradingViewWidget from "../components/TradingViewWidget";
import BuySellCard from "../components/BuySellCard";
import TokenDescription from "../components/TokenDescription";
import CommentThread from "../components/CommentThread";
import { useParams } from "next/navigation";
// import { Mocktokens } from "@/lib/data/mock-tokens";
import Token from "../components/token";
import { motion } from "framer-motion";
import { useAccount, useBalance } from "wagmi";
import { useTokens } from "@/context/TokensContext";
import BackButton from "@/components/buttons/backButton"


export default function TokenPage() {
  const { tokens, loading } = useTokens();
  
  const router = useRouter();
  const { id } = useParams();
  const token = tokens.find((t) => t._id === id);
  const { address, isConnected } = useAccount();



  const { data: balanceData } = useBalance({
    address,
    token: undefined, // native token (BNB)
    chainId: 56, // BSC Mainnet
  });

  const userBalance = balanceData?.formatted ?? "0";

  // Simulated token data — replace with actual API or contract data
  const [tokenData, setTokenData] = useState({
    price: 0.5231,
    marketCap: ((token?.currentPrice ?? 0) * (token?.totalSupply ?? 0)),
    volume24h: 120000,
    creatorReward: 5,
    referralReward: 2,
    description:
      token?.description || "",
    symbol: token?.ticker || "TKN",
    title: token?.name || "Token Name",
  });

  // Sample user balance and comments
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Promising token!",
      replies: [
        { id: "r1", text: "Absolutely!", replies: [] }
      ],
    },
    { id: "2", text: "Can we use this for staking?", replies: [] },
  ]);

  const handleBuy = (amount: string) => {
    // Interact with smart contract to buy
    console.log("Buying", amount);
  };

  const handleSell = (amount: string) => {
    // Interact with smart contract to sell
    console.log("Selling", amount);
  };

  return token ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl w-full mx-auto space-y-6 px-4 sm:px-8 md:px-16 py-8"
    >
      {/* Back Button */}
      <BackButton />
      {/* Stats + Price Chart */}
      <Token
        address={token?.contractAddress || ""}
        tokenName={token?.name || ""}
        tokenTicker={token?.ticker || ""}
        image={token?.image || ""}
      />
      <TokenStatsCard mCap={tokenData.marketCap} />
      <div className="flex items-start justify-start gap-4 w-full flex-wrap lg:flex-nowrap">
        <TradingViewWidget symbol={`${tokenData.symbol}`} />

        {/* Buy/Sell Tabs */}
        <BuySellCard
          balance={Number(userBalance)}
          onBuy={handleBuy}
          onSell={handleSell}
          tokenName={tokenData.title}
          tokenPrice={token?.currentPrice || 0}
          tokenChain={"BSC"}
        />
      </div>
      {/* Token Description */}
      <TokenDescription
        description={tokenData.description}
        twitter={token.twitter || "#"}
        telegram={token.telegram || "#"}
      />

      {/* Comment Thread */}
      <CommentThread
        comments={comments}
        isConnected={isConnected}
        ca={token?.contractAddress || ""}
        createdDate={token?.createdAt || ""}
      />
    </motion.div>
  ) : (
    <div className="flex items-center justify-center h-screen"></div>
  );
}

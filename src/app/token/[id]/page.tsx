"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TokenStatsCard from "../components/TokenStatsCard";
import TradingViewWidget from "../components/TradingViewWidget";
import BuySellCard from "../components/BuySellCard";
import TokenDescription from "../components/TokenDescription";
import CommentThread from "../components/CommentThread";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";


export default function TokenPage() {
  const router = useRouter();
const { id } = useParams();
  const { address, isConnected } = useAccount();

  // Simulated token data — replace with actual API or contract data
  const [tokenData, setTokenData] = useState({
    price: 0.5231,
    marketCap: 2340000,
    volume24h: 120000,
    creatorReward: 5,
    referralReward: 2,
    description:
      "This token powers a decentralized ecosystem built for real-time data sharing.",
    symbol: "BSC-TKN",
  });

  // Sample user balance and comments
  const [userBalance, setUserBalance] = useState(10.0); // BNB
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-8 md:px-16 py-8">
      {/* Stats + Price Chart */}
      <TokenStatsCard {...tokenData} />
      <TradingViewWidget symbol={`BINANCE:${tokenData.symbol}`} />

      {/* Buy/Sell Tabs */}
      <BuySellCard
        balance={userBalance}
        onBuy={handleBuy}
        onSell={handleSell}
      />

      {/* Token Description */}
      <TokenDescription description={tokenData.description} />

      {/* Comment Thread */}
      <CommentThread comments={comments} isConnected={isConnected} />
    </div>
  );
}

"use client";
import {  useState } from "react";
import TokenStatsCard from "./components/cards/TokenStatsCard";
// import TradingViewWidget from "./components/TradingViewWidget";
import BuySellCard from "./components/cards/BuySellCard";
import TokenDescription from "./components/TokenDescription";
import CommentThread from "./components/CommentThread";
// import { Mocktokens } from "@/lib/data/mock-tokens";
import Token from "./components/token";
import { motion } from "framer-motion";
import { useAccount, useBalance } from "wagmi";
import BackButton from "@/components/buttons/backButton";
import GraduatedCard from "./components/cards/graduated";
import AntiFudCard from "./components/cards/anti-fud-card";
import TopHoldersCard from "./components/cards/topHoldersCard";
import TestTradingViewWidget from "./components/testTradingViewWidget";


export default function TokenPage() {
//   const { tokens, loading } = useTokens();
  
//   const router = useRouter();
//   const { id } = useParams();
//   const token = tokens.find((t) => t._id === id);
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
      name:"Ocicat",
    marketCap:0,
    volume24h: 120000,
    creatorReward: 5,
    referralReward: 2,
    contractAddress:"",
      symbol: "OCC",
    ticker:"OCC",
      title: "Ocicat",
      image: "/cat_bg.jpg",
      description: "Dreamers coin",
      twitter: "#",
      telegram: "#",
    currentPrice:0.000000008,
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


  
  return tokenData ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w76xl w-full mx-auto space-y-6 px-4 sm:px-8 md:px-16 py-8 pb-18 bg-[#0D0D0D]"
    >
      {/* Back Button */}
      <BackButton />
      {/* Stats + Price Chart */}
      <Token
        address={tokenData?.contractAddress || ""}
        tokenName={tokenData.name || ""}
        tokenTicker={tokenData.ticker || ""}
        image={tokenData.image || ""}
        // tokenCreatedDate={tokenData.createdAt || ""}
        // tokenId={token?._id || ""}
      />
      <TokenStatsCard
        mCap={tokenData.marketCap}
        tokenName={tokenData?.name || ""}
        tokenTicker={tokenData?.ticker || ""}
        tokenImage={tokenData?.image || ""}
        // tokenCreatedDate={tokenData?.createdAt || ""}
        // tokenId={tokenData?._id || ""}
      />
      <div className="flex items-start justify-start gap-4 w-full flex-wrap lg:flex-nowrap">
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <div className="flex w-full lg:flex-nowrap flex-wrap items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-4 w-full">
              {/* <TradingViewWidget pairAddress={token.contractAddress} /> */}
              <TestTradingViewWidget symbol={`${tokenData.symbol}`} />

              <div className="hidden lg:flex lg:flex-col w-full items-start justify-start gap-4">
                {/* Token Description */}
                <TokenDescription
                  description={tokenData.description || ""}
                  twitter={tokenData.twitter || ""}
                  telegram={tokenData.telegram || ""}
                  ca={tokenData?.contractAddress || ""}
                //   createdDate={tokenData?.createdAt || ""}
                />

                {/* Comment Thread */}
                <CommentThread
                  comments={comments}
                  isConnected={isConnected}
                  ca={tokenData?.contractAddress || ""}
                //   createdDate={token?.createdAt || ""}
                  tokenName={tokenData?.name || "token name"}
                />
              </div>
            </div>

            <div className="max-sm:hidden flex flex-nowrap lg:flex-col gap-4 items-start justify-start">
              {/* Buy/Sell Tabs */}
              <BuySellCard
                balance={Number(userBalance)}
                tokenName={tokenData?.name || ""}
                tokenPrice={tokenData?.currentPrice || 0}
                tokenChain={"BSC"}
                tokenCa={tokenData?.contractAddress || ""}
                tokenImage={tokenData?.image}
                tokenTicker={tokenData.ticker}
              />
              <div className="flex flex-col items-start justify-start gap-4">
                <GraduatedCard />
                <AntiFudCard antiFudEnabled={ true} />
                <div className="lg:flex w-full items-center justify-center hidden">
                  <TopHoldersCard />
                </div>
              </div>
            </div>
            <div className="sm:flex lg:hidden w-full items-center justify-center hidden">
              <TopHoldersCard />
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-col w-full items-start justify-start gap-4">
          {/* Token Description */}
          <TokenDescription
            ca={tokenData?.contractAddress || ""}
            // createdDate={tokenData?.createdAt || ""}
            description={tokenData?.description || ""}
            twitter={tokenData.twitter}
            telegram={tokenData.telegram}
          />

          <div className="max-sm:flex hidden w-full flex-wrap sm:flex-col gap-4 items-start justify-start">
            {/* Buy/Sell Tabs */}
            <BuySellCard
              balance={Number(userBalance)}
              tokenName={tokenData?.name || ""}
              tokenPrice={tokenData?.currentPrice || 0}
              tokenChain={"BSC"}
              tokenCa={tokenData?.contractAddress || ""}
              tokenImage={tokenData?.image}
              tokenTicker={tokenData.ticker}
            />
            <GraduatedCard />
            <AntiFudCard antiFudEnabled={true} />
          </div>

          {/* Comment Thread */}
          <CommentThread
            comments={comments}
            isConnected={isConnected}
            ca={tokenData?.contractAddress || ""}
            // createdDate={tokenD?.createdAt || ""}
            tokenName={tokenData.name || "token name"}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    <div className="flex items-center justify-center h-screen"></div>
  );
}

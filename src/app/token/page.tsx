"use client";
import {  useState,useEffect } from "react";
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
import { fetchOcicatTokenPrice } from "@/lib/api";
import { toast } from "react-hot-toast";


export default function TokenPage() {
  // Simulated token data — replace with actual API or contract data
  const [tokenData, setTokenData] = useState({
    price: 0.000000005231,
    name: "Ocicat coin",
    marketCap: 0,
    volume24h: 120000,
    creatorReward: 5,
    referralReward: 2,
    contractAddress: "",
    symbol: "OCC",
    ticker: "Ocicat",
    title: "Ocicat coin",
    image: "/cat_bg.jpg",
    description: "Dreamers coin",
    twitter: "#",
    telegram: "#",
    currentPrice: 0.000000008,
  });

  const { address, isConnected } = useAccount();



useEffect(() => {
  async function fetchPrice() {
    await toast.promise(
      fetchOcicatTokenPrice().then((response) => {
        const tokenInfo =
          response["0xe53d384cf33294c1882227ae4f90d64cf2a5db70"];
        if (!tokenInfo) throw new Error("Token data missing");

        setTokenData((prev) => ({
          ...prev,
          price: tokenInfo.usd,
          currentPrice: tokenInfo.usd,
          marketCap: tokenInfo.usd_market_cap,
          volume24h: tokenInfo.usd_24h_vol,
          contractAddress: "0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70",
        }));
      }),
      {
        loading: "Fetching Ocicat price...",
        success: "Price updated successfully! 🐾",
        error: "Failed to fetch Ocicat price.",
      }
    );
  }

  fetchPrice();
}, []);



  const { data: balanceData } = useBalance({
    address,
    token: undefined, // native token (BNB)
    chainId: 56, // BSC Mainnet
  });

  const userBalance = balanceData?.formatted ?? "0";

  // Sample user balance and comments
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Promising token!",
      replies: [{ id: "r1", text: "Absolutely!", replies: [] }],
    },
    { id: "2", text: "Can we use this for staking?", replies: [] },
  ]);

  return tokenData ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w76xl w-full mx-auto space-y-6 px-4 sm:px-8 md:px-16 py-8 pb-18"
    >
      {/* Back Button */}
      <BackButton />
      {/* Stats + Price Chart */}
      <Token
        address={tokenData?.contractAddress || ""}
        tokenName={tokenData.name || ""}
        tokenTicker={tokenData.ticker || ""}
              image={tokenData.image || ""}
              tokenPrice={tokenData.price}
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
              <TestTradingViewWidget />

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
                <AntiFudCard antiFudEnabled={true} />
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

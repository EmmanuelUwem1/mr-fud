"use client";
import React, { useMemo } from "react";
import {  useState } from "react";
import TokenStatsCard from "../components/cards/TokenStatsCard";
import BuySellCard from "../components/cards/BuySellCard";
import TokenDescription from "../components/TokenDescription";
import CommentThread from "../components/CommentThread";
import { useParams } from "next/navigation";
import Token from "../components/token";
import { motion } from "framer-motion";
import { useAccount, useBalance } from "wagmi";
import { useTokens } from "@/context/TokensContext";
import BackButton from "@/components/buttons/backButton";
import GraduatedCard from "../components/cards/graduated";
import AntiFudCard from "../components/cards/anti-fud-card";
import TopHoldersCard from "../components/cards/topHoldersCard";
import TestTradingViewWidget from "../components/testTradingViewWidget";
import { useUser } from "@/context/userContext";
import useUseRating from "@/lib/data/rating";


export default function TokenPage() {
  // Generate a random rating once per render
  const rating = useUseRating();

  const { tokens, loading } = useTokens();

  const { id } = useParams();
  const token = tokens.find((t) => t._id === id);
  const { address, isConnected } = useAccount();

  const { user } = useUser();
  const tokenBalance =
    user?.tokenHoldings?.find(
      (holding) => holding.tokenAddress === token?.contractAddress
    )?.balance || 0;

  const { data: balanceData } = useBalance({
    address,
    token: undefined, // native token (BNB)
    chainId: 56, // BSC Mainnet
  });

  const userBalance = balanceData?.formatted ?? "0";
  const randomMarketCap =
    Math.floor(Math.random() * (500_000 - 440_000 + 1)) + 1_000;

  // Simulated token data — replace with actual API or contract data
  const [tokenData] = useState({
    price: 0.5231,
    marketCap: randomMarketCap,
    volume24h: 120000,
    creatorReward: 5,
    referralReward: 2,

    symbol: token?.ticker || "TKN",
    title: token?.name || "Token Name",
  });

  return token ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full mx-auto space-y-6 px-4 sm:px-8 md:px-16 py-8 pb-18
      }`}
    >
      {/* Back Button */}
      <BackButton />
      {/* Stats + Price Chart */}
      <Token
        address={token?.contractAddress || ""}
        tokenName={token?.name || ""}
        tokenTicker={token?.ticker || ""}
        image={token?.image || ""}
        tokenCreatedDate={token?.createdAt || ""}
        tokenId={token?._id || ""}
        referalCode={address && address}
        rating={2}
      />
      <TokenStatsCard
        mCap={tokenData.marketCap}
        tokenName={token?.name || ""}
        tokenTicker={token?.ticker || ""}
        tokenImage={token?.image || ""}
        tokenCreatedDate={token?.createdAt || ""}
        tokenId={token?._id || ""}
        referalCode={address && address}
        referalReward="0"
        creatorReward="0"
        rating={2}
      />
      <div className="flex items-start justify-start gap-4 w-full flex-wrap lg:flex-nowrap">
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <div className="flex w-full lg:flex-nowrap flex-wrap items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-4 w-full">
              {/* <TradingViewWidget pairAddress={token.contractAddress} /> */}
              <TestTradingViewWidget pairAddress={token.contractAddress} />

              <div className="hidden lg:flex lg:flex-col w-full items-start justify-start gap-4">
                {/* Token Description */}
                <TokenDescription
                  description={token.description || ""}
                  twitter={token.twitter || ""}
                  telegram={token.telegram || ""}
                  ca={token?.contractAddress || ""}
                  createdDate={token?.createdAt || ""}
                  website={token.website || ""}
                />

                {/* Comment Thread */}
                <CommentThread
                  // comments={comments}
                  isConnected={isConnected}
                  ca={token?.contractAddress || ""}
                  createdDate={token?.createdAt || ""}
                  tokenName={token?.name || "token name"}
                />
              </div>
            </div>

            <div className="max-sm:hidden flex flex-nowrap lg:flex-col gap-4 items-start justify-start w-full lg:max-w-96">
              {/* Buy/Sell Tabs */}
              <BuySellCard
                BNBbalance={Number(userBalance)}
                tokenBalance={tokenBalance}
                tokenName={token?.name || ""}
                tokenPrice={token?.currentPrice || 0}
                tokenChain={"BSC"}
                tokenCa={token?.contractAddress || ""}
                tokenImage={token?.image}
                tokenTicker={token.ticker}
              />
              <div className="flex flex-col items-start justify-start gap-4 w-full">
                <GraduatedCard notPassedBondingCurve={false} rating={rating} />
                <AntiFudCard antiFudEnabled={token.isAntiGeet} />
                <div className="lg:flex w-full items-center justify-center hidden">
                  <TopHoldersCard tokenCa={token.contractAddress} />
                </div>
              </div>
            </div>
            <div className="sm:flex lg:hidden w-full items-center justify-center hidden">
              <TopHoldersCard tokenCa={token.contractAddress} />
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-col w-full items-start justify-start gap-4">
          {/* Token Description */}
          <TokenDescription
            ca={token?.contractAddress || ""}
            createdDate={token?.createdAt || ""}
            description={token?.description || ""}
            twitter={token.twitter}
            telegram={token.telegram}
            website={token.website || ""}
          />

          <div className="max-sm:flex hidden w-full flex-wrap sm:flex-col gap-4 items-start justify-start">
            {/* Buy/Sell Tabs */}
            <BuySellCard
              BNBbalance={Number(userBalance)}
              tokenBalance={tokenBalance}
              tokenName={token?.name || ""}
              tokenPrice={token?.currentPrice || 0}
              tokenChain={"BSC"}
              tokenCa={token?.contractAddress || ""}
              tokenImage={token?.image}
              tokenTicker={token.ticker}
            />
            <GraduatedCard rating={rating} notPassedBondingCurve={false} />
            <AntiFudCard antiFudEnabled={token.isAntiGeet} />
          </div>

          {/* Comment Thread */}
          <CommentThread
            isConnected={isConnected}
            ca={token?.contractAddress || ""}
            createdDate={token?.createdAt || ""}
            tokenName={token.name || "token name"}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-[#0D0D0D]"></div>
  );
}

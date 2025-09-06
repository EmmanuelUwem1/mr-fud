"use client";
import {  useState,useEffect,useRef } from "react";
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
import TopHoldersCard from "./components/cards/topHoldersCard";
import TestTradingViewWidget from "./components/testTradingViewWidget";
import { fetchOcicatTokenPrice } from "@/lib/api";
import { toast } from "react-hot-toast";
import { CONSTANTS } from "@/web3/config/constants";
import { useTradeStore } from "@/store/tradeStore";
import { useOcicatBalance } from "@/web3/hooks/ocicat/useOcicatBalance";
import { fromWei } from "@/lib/utils";


export default function OcicatTokenPage() {
  const { address, isConnected } = useAccount();
    const hasFetched = useRef(false);
  const tokenCa = CONSTANTS.OCICAT_TOKEN_ADDRESS;
const trades = useTradeStore((state) => state.trades);
  const { balance } = useOcicatBalance();
  const userOcicatBalance = balance ? Number(fromWei(Number(balance),6)): 0;


 const [tokenData, setTokenData] = useState({
   price: 0.00000005231,
   name: "Ocicat coin",
   marketCap: 5114975,
   volume24h: 45000,
   liquidity: 140300.21,
   creatorReward: 5,
   referralReward: 2,
   contractAddress: "",
   symbol: "OCC",
   ticker: "Ocicat",
   title: "Ocicat coin",
   image: "/cat_bg.jpg",
   description:
     "Ocicat is a unique deflationary token that powers the DREAMERS CLUB through the instrumentality of the DAO governance. Ocicat has created the platform that empowers systems through the DAO, NFT and MrFUD bonding curve token launches",
   twitter: "https://twitter.com/ocicatcoin",
   telegram: "https://t.me/ocicatcoin",
   website:"https://www.ocicat.club",
   currentPrice: 0,
   changePerDay: 0,
   createdAt: "2023-01-20T16:40:40.443Z",
 });

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  async function fetchPrice() {
    await toast.promise(
      fetchOcicatTokenPrice().then((data) => {
        setTokenData((prev) => ({
          ...prev,
          ...data,
        }));
      }),
      {
        loading: "Updating",
        success: "Updated 🐾",
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

 

  return tokenData ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full mx-auto space-y-6 px-4 sm:px-8 md:px-16 py-8 pb-18`}
    >
      {/* Back Button */}
      <BackButton />
      {/* Stats + Price Chart */}
      <Token
        address={tokenCa || ""}
        tokenName={tokenData.name || ""}
        tokenTicker={tokenData.ticker || ""}
        image={tokenData.image || ""}
        tokenPrice={tokenData.price}
        changePerDay={tokenData.changePerDay || 0}
        tokenCreatedDate={tokenData.createdAt || ""}
        // tokenId={token?._id || ""}
      />
      <TokenStatsCard
        mCap={tokenData.marketCap.toString()}
        tokenName={tokenData?.name || ""}
        tokenTicker={tokenData?.ticker || ""}
        tokenImage={tokenData?.image || ""}
        volumePerDay={(tokenData.volume24h || 0).toString()}
        tokenCreatedDate={tokenData?.createdAt || ""}
        rating={3}
        gainPercent={tokenData.changePerDay}
        liquidity={tokenData.liquidity.toString()}
        referalCode={address && address}
        // tokenId={tokenData?._id || ""}
      />
      <div className="flex items-start justify-start gap-4 w-full flex-wrap lg:flex-nowrap">
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <div className="flex w-full lg:flex-nowrap flex-wrap items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-4 w-full">
              {/* <TradingViewWidget pairAddress={token.contractAddress} /> */}
              <TestTradingViewWidget symbol={tokenData.ticker} />

              <div className="hidden lg:flex lg:flex-col w-full items-start justify-start gap-4">
                {/* Token Description */}
                <TokenDescription
                  description={tokenData.description || ""}
                  twitter={tokenData.twitter || ""}
                  telegram={tokenData.telegram || ""}
                  ca={tokenCa || ""}
                  website={tokenData.website}
                  createdDate={tokenData?.createdAt || ""}
                />

                {/* Comment Thread */}
                <CommentThread
                  // comments={comments}
                  isConnected={isConnected}
                  ca={tokenCa || ""}
                  createdDate={tokenData?.createdAt || ""}
                  tokenName={tokenData?.name || "token name"}
                />
              </div>
            </div>

            <div className="max-sm:hidden flex flex-nowrap lg:flex-col gap-4 items-start justify-start w-full lg:max-w-96">
              {/* Buy/Sell Tabs */}
              <BuySellCard
                BNBbalance={Number(userBalance)}
                tokenBalance={userOcicatBalance}
                tokenName={tokenData?.name || ""}
                tokenPrice={tokenData.price}
                tokenChain={"BSC"}
                tokenCa={tokenCa || ""}
                tokenImage={tokenData?.image}
                tokenTicker={tokenData.ticker}
              />
              <div className="flex flex-col items-start justify-start gap-4 w-full">
                <GraduatedCard notPassedBondingCurve={true} />
                {/* <AntiFudCard antiFudEnabled={true} /> */}
                <div className="lg:flex w-full items-center justify-center hidden">
                  <TopHoldersCard tokenCa={tokenCa} />
                </div>
              </div>
            </div>
            <div className="sm:flex lg:hidden w-full items-center justify-center hidden">
              <TopHoldersCard tokenCa={tokenCa} />
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-col w-full items-start justify-start gap-4">
          {/* Token Description */}
          <TokenDescription
            ca={tokenCa || ""}
            createdDate={tokenData?.createdAt || ""}
            description={tokenData?.description || ""}
            twitter={tokenData.twitter}
            telegram={tokenData.telegram}
            website={tokenData.website}
          />

          <div className="max-sm:flex hidden w-full flex-wrap sm:flex-col gap-4 items-start justify-start">
            {/* Buy/Sell Tabs */}
            <BuySellCard
              BNBbalance={Number(userBalance)}
              tokenBalance={userOcicatBalance}
              tokenName={tokenData?.name || ""}
              tokenPrice={tokenData.price}
              tokenChain={"BSC"}
              tokenCa={tokenCa || ""}
              tokenImage={tokenData?.image}
              tokenTicker={tokenData.ticker}
            />
            <GraduatedCard notPassedBondingCurve={true} />
            {/* <AntiFudCard antiFudEnabled={true} /> */}
          </div>

          {/* Comment Thread */}
          <CommentThread
            // comments={comments}
            isConnected={isConnected}
            ca={tokenCa || ""}
            createdDate={tokenData?.createdAt || ""}
            tokenName={tokenData.name || "token name"}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    <div
      className={`flex items-center justify-center h-screen bg-[#0D0D0D]`}
    ></div>
  );
}

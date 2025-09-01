"use client";
import { useEffect, useState } from "react";
import { useTradeStore } from "@/store/tradeStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { formatWalletAddress } from "@/lib/utils";
import { formatNumberToLocaleString } from "@/lib/utils";
type Props = {
  tokenImage?: string; 
  tokenName?: string;
};

export default function TradeNotification({ tokenImage="/cat_bg.jpg" , tokenName="Ocicat"}: Props) {
  const trades = useTradeStore((state) => state.trades);
  const [currentTrade, setCurrentTrade] = useState(trades[0] || null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (trades.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (index + 1) % trades.length;
      setIndex(nextIndex);
      setCurrentTrade(trades[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [trades, index]);

  if (!currentTrade) return null;

  const isBuy = currentTrade.action === "buy";
  const traderAddress = isBuy ? currentTrade.buyer : currentTrade.seller;



  return (
    <div className="w-full text-white text-[8px] sm:text-sm z-50 px-4 py-4 mb-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrade.hash}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center sm:space-x-4 space-x-2 font-medium"
        >
          {/* Token Image */}
          <Image
            src={tokenImage}
            alt="Token"
            width={32}
            height={32}
            className="rounded-full"
          />

          {/* Trade Info */}
          <span
            className={`font-medium ${
              isBuy ? "text-[#67C94D]" : "text-[#FA3C39]"
            }`}
          >
            {isBuy ? "BUY" : "SELL"}
          </span>
          <span className="font-medium">
            {formatNumberToLocaleString(currentTrade.amount)} {tokenName}
          </span>
          <span className="text-[#87DDFF]">for</span>
          <span>{currentTrade.bnbAmount.toFixed(4)} BNB</span>

          {/* Trader Address Button */}
          <span className="bg-[#67C94D] text-white p-1.5  sm:p-2.5 rounded-md sm:text-xs font-normal">
            {formatWalletAddress(traderAddress)}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

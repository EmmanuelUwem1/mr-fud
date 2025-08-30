"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useTradeStore } from "@/store/tradeStore";
import { AnimatePresence, motion } from "framer-motion";
import { fetchOcicatTradesFromNodeReal } from "@/lib/api/nodeRealTrades";

interface TradeTableProps {
  token: string;
}

function formatAddress(address?: string): string {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "—";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function TradesTable({ token }: TradeTableProps) {
  const trades = useTradeStore((state) => state.trades);
  const setTrades = useTradeStore((state) => state.setTrades);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        const trades = await fetchOcicatTradesFromNodeReal(20);
        setTrades(trades);
      } catch (err) {
        console.error("Failed to load trades:", err);
      }
    };

    loadTrades();
  }, []);

  return (
    <div className="w-full bg-[#1C1C1C] border border-black rounded-[18px] text-white h-[450px] flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
        <table className="min-w-[600px] w-full max-w-6xl table-auto border-collapse">
          <thead className="sticky top-0 bg-[#1C1C1C] z-10">
            <tr className="text-xs font-semibold text-[#FFFFFF]">
              <th className="text-left min-w-[120px] px-3 pb-4 pt-6">Trader</th>
              <th className="text-left min-w-[100px] px-3 pb-4 pt-6">Action</th>
              <th className="text-left min-w-[80px] px-3 pb-4 pt-6">BNB</th>
              <th className="text-left min-w-[100px] px-3 pb-4 pt-6">
                ${token}
              </th>
              <th className="text-left min-w-[200px] px-3 pb-4 pt-6">Date</th>
              <th className="text-left min-w-[40px] px-3 pb-4 pt-6">Tx</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {trades.map((trade, idx) => {
                const RowComponent = idx === 0 ? motion.tr : "tr";
                const traderAddress =
                  trade.buyer ?? trade.seller ?? trade.initiator ?? "";

                return (
                  <RowComponent
                    key={`${trade.hash}-${trade.time}`}
                    initial={idx === 0 ? { opacity: 0, y: 10 } : undefined}
                    animate={idx === 0 ? { opacity: 1, y: 0 } : undefined}
                    exit={idx === 0 ? { opacity: 0, y: 10 } : undefined}
                    transition={idx === 0 ? { duration: 0.4 } : undefined}
                    className="border-t border-t-[#2A2A2A] text-xs font-semibold transition-class"
                  >
                    <td className="py-4 px-3 text-[#626262]">
                      {formatAddress(traderAddress)}
                    </td>
                    <td
                      className={`py-4 px-3 font-semibold ${
                        trade.action === "buy"
                          ? "text-[#4ADE80]"
                          : "text-[#D92C2A]"
                      }`}
                    >
                      {trade.action === "buy" ? "Buy" : "Sell"}
                    </td>
                    <td className="py-4 px-3 text-left">
                      {Number(trade.bnbAmount || 0).toFixed(4)}
                    </td>
                    <td className="py-4 px-3 text-left">
                      {trade.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-3">{formatDate(trade.time)}</td>
                    <td className="py-4 px-3">
                      <a
                        href={`https://bscscan.com/tx/${trade.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-7 w-7 flex items-center justify-center cursor-pointer"
                      >
                        <Image
                          src="/Frame 75.png"
                          alt="Tx"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                        />
                      </a>
                    </td>
                  </RowComponent>
                );
              })}
            </AnimatePresence>

            {trades.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-sm text-[#888]">
                      Loading trades...
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradesTable;

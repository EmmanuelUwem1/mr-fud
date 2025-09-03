"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTradeStore } from "@/store/tradeStore";
import { AnimatePresence, motion } from "framer-motion";
import { CONSTANTS } from "@/web3/config/constants";
import { fetchOcicatTradesFromNodeReal } from "@/lib/api/nodeRealTrades";

const OCICAT_CA = CONSTANTS.OCICAT_TOKEN_ADDRESS.toLowerCase();

interface TradeTableProps {
  token: string;
  ca: string;
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

function TradesTable({ token, ca }: TradeTableProps) {
  const isOcicat = ca.toLowerCase() === OCICAT_CA;

  // Zustand store for Ocicat
  const tradesStore = useTradeStore((state) => state.trades);
  const setTrades = useTradeStore((state) => state.setTrades);
  const setLoaded = useTradeStore((state) => state.setLoaded);
  const loadedStore = useTradeStore((state) => state.loaded);

  // Local state for other tokens
  const [localTrades, setLocalTrades] = useState([]);
  const [localLoaded, setLocalLoaded] = useState(false);

  useEffect(() => {
    const loadTrades = async () => {
      if (isOcicat) {
        try {
          const trades = await fetchOcicatTradesFromNodeReal(20);
          setTrades(trades ?? []);
          setLoaded(true);
        } catch (err) {
          console.error("Failed to refetch Ocicat trades:", err);
        }
      } else {
        try {
          // const trades = await fetchLaunchpadTrades(ca, 20);
          setLocalTrades([]);
          setLocalLoaded(true);
        } catch (err) {
          console.error("Failed to load trades for token:", token, err);
        }
      }
    };

    loadTrades();
  }, [ca, token, isOcicat, setTrades, setLoaded]);

  const trades = isOcicat ? tradesStore : localTrades;
  const loaded = isOcicat ? loadedStore : localLoaded;

  return (
    <div className="w-full box-bg rounded-[18px] text-white h-[450px] flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
        <table className="min-w-[600px] w-full max-w-6xl table-auto border-collapse">
          <thead className="sticky top-0 box-bg z-10">
            <tr className="text-xs font-semibold text-[#FFFFFF]">
              <th className="text-left min-w-[160px] px-3 pb-4 pt-6">Trader</th>
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
                    className="border-t border-t-[#38B9FF] text-xs font-semibold transition-class"
                  >
                    <td className="py-4 px-3 text-[#87DDFF] font-normal">
                      <div className="flex items-center justify-start gap-2">
                        <span className="relative h-5 w-5 flex items-center justify-center">
                          <Image
                            alt=""
                            src={"/Blue cat 2 1.png"}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            priority
                          />
                        </span>
                        {formatAddress(traderAddress)}
                      </div>
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
                      {Number(trade.bnbAmount || 0).toFixed(5)}
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
                          priority
                        />
                      </a>
                    </td>
                  </RowComponent>
                );
              })}
            </AnimatePresence>

            {!loaded && (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            )}
            {loaded && trades.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    no trades found
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

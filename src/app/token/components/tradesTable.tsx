"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { fetchOcicatTrades } from "@/lib/api/trades";
import axios from "axios";

interface TradeTableProps {
  token: string;
}

type OcicatTrade = {
  hash: string;
  time: string;
  buyer: string;
  seller: string;
  initiator: string;
  amount: number;
  amountInUSD: number;
  price: number;
  priceInUSD: number;
  action: "buy" | "sell";
  bnbAmount: number;
  bnbAmountInUSD: number;
};

function formatAddress(address: string): string {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "—";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TradesTable({ token }: TradeTableProps) {
  const [trades, setTrades] = useState<OcicatTrade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        setLoading(true);
        const data = await fetchOcicatTrades();
        setTrades(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadTrades();
  }, []);

  return (
    <div className="w-full bg-[#1C1C1C] border border-black rounded-[18px] text-white h-[400px] flex flex-col">
      {loading ? (
        <div className="text-center text-[#888] py-6">Loading trades...</div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <table className="min-w-[600px] w-full max-w-6xl table-auto border-collapse">
            <thead>
              <tr className="text-xs font-semibold text-[#FFFFFF]">
                <th className="text-left min-w-[120px] px-3 pb-4">Trader</th>
                <th className="text-left min-w-[100px] px-3 pb-4">Action</th>
                <th className="text-right min-w-[80px] px-3 pb-4">BNB</th>
                <th className="text-right min-w-[100px] px-3 pb-4">${token}</th>
                <th className="text-left min-w-[160px] px-3 pb-4">Date</th>
                <th className="text-left min-w-[40px] px-3 pb-4">Tx</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, idx) => (
                <tr
                  key={idx}
                  className="border-t border-t-[#2A2A2A] text-xs font-semibold transition-class"
                >
                  <td className="py-4 px-3 text-[#626262]">
                    {formatAddress(
                      trade.buyer || trade.seller || trade.initiator
                    )}
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
                  <td className="py-4 px-3 text-right">
                    {Number(trade.bnbAmount || 0).toFixed(4)}
                  </td>
                  <td className="py-4 px-3 text-right">
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
                </tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-[#888]">
                    No trades found for {token}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TradesTable;

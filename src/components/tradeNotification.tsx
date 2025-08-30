import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Trade = {
  hash: string;
  time: string;
  buyer: string;
  seller: string;
  initiator?: string;
  amount: number;
  bnbAmount: number;
  action: "buy" | "sell";
  symbol?: string; // optional for flexibility
  price?: number; // optional for flexibility
};

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

export default function TradeNotification({ trade }: { trade: Trade | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trade) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trade?.hash]);

  return (
    <AnimatePresence>
      {visible && trade && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 bg-[#1C1C1C] text-white p-4 rounded-lg shadow-lg z-50 w-[300px] border border-[#333]"
        >
          <p className="text-sm mb-1">
            🐾 <strong>{trade.symbol ?? "Ocicat"}</strong> trade
            {trade.price !== undefined && <> at ${trade.price.toFixed(4)}</>}
          </p>
          <p className="text-xs mb-1">
            {trade.action === "buy" ? "Bought" : "Sold"} {trade.amount} tokens
          </p>
          <p className="text-xs mb-1">BNB: {trade.bnbAmount.toFixed(4)}</p>
          <p className="text-[10px] text-gray-400 mb-2">
            {formatDate(trade.time)}
          </p>
          <a
            href={`https://bscscan.com/tx/${trade.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline text-xs"
          >
            View on BscScan
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

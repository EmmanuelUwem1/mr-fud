import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Trade = {
  hash: string;
  time: string;
  amount: number;
  price: number;
  symbol: string;
};

export default function TradeNotification({ trade }: { trade: Trade | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trade) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trade]);

  return (
    <AnimatePresence>
      {visible && trade && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-lg shadow-lg z-50"
        >
          <p className="text-sm">
            🐾 <strong>{trade.symbol}</strong> trade at $
            {trade.price.toFixed(4)}
          </p>
          <p className="text-xs">Amount: {trade.amount}</p>
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

import { useState } from "react";

interface BuySellCardProps {
  balance: number;
  onBuy: (amount: string) => void;
  onSell: (amount: string) => void;
}

export default function BuySellCard({ balance, onBuy, onSell }: BuySellCardProps) {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const maxAmount = balance.toString();

  return (
    <div className="card p-4 rounded-md bg-[#1C1C1C] text-white">
      <div className="mb-4">
        <button
          onClick={() => setTab("buy")}
          className={tab === "buy" ? "text-green-500" : ""}
        >
          Buy
        </button>
        <button
          onClick={() => setTab("sell")}
          className={tab === "sell" ? "text-red-500" : ""}
        >
          Sell
        </button>
      </div>
      <input
        type="number"
        value={amount}
        placeholder="Amount in BNB"
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <button onClick={() => setAmount(maxAmount)}>Max</button>
      <button
        className="mt-2 bg-blue-500 rounded px-3 py-1"
        onClick={() => (tab === "buy" ? onBuy(amount) : onSell(amount))}
      >
        {tab === "buy" ? "Buy" : "Sell"}
      </button>
    </div>
  );
}

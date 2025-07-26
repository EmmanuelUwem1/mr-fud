"use client";
import { useState } from "react";

interface BuySellCardProps {
  balance: number;
  onBuy: (amount: string) => void;
  onSell: (amount: string) => void;
  tokenName: string;
}

export default function BuySellCard({
  balance,
  onBuy,
  onSell,
  tokenName,
}: BuySellCardProps) {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const maxAmount = balance.toString();

  return (
    <div className="w-96 p-4 rounded-md bg-[#141414] text-white space-y-4">
      {/* Buy/Sell Tabs */}
      <div className="bg-[#2A2A2A] rounded-full flex w-full items-center">
        <button
          onClick={() => setTab("buy")}
          className={`flex items-center w-full justify-center font-semibold text-xs rounded-full cursor-pointer py-3.5 px-3 ${
            tab === "buy" ? "bg-[#06D57B]" : ""
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTab("sell")}
          className={`flex items-center cursor-pointer w-full justify-center font-semibold text-xs rounded-full py-3.5 px-3 ${
            tab === "sell" ? "bg-[#fe3c3cf4]" : ""
          }`}
        >
          Sell
        </button>
      </div>

      {/* Balance Info */}
      <div className="text-xs flex w-full justify-between items-center gap-3 font-semibold text-[#626262]">
        Quantity{" "}
        <span className="text-white flex items-center justify-end gap-1">
          <span className=" text-[#626262] ">Balance</span>
          {balance ? balance.toFixed(5) : ""} BNB
        </span>
      </div>

      {/* Amount Input Section */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400"></label>
        <input
          type="number"
          min="0"
          step="0.0001"
          inputMode="decimal"
          value={amount}
          placeholder="0.00"
          onChange={(e) => setAmount(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          className="input w-full bg-[#2A2A2A] text-white px-3 py-4 rounded-[7px] placeholder-gray-500 border-none appearance-none"
        />

        {/* Quick Actions */}
        <div className="flex font-medium text-xs items-center justify-between mt-2 space-x-2">
          <button
            onClick={() => setAmount("0")}
            className="text-xs bg-[#2A2A2A] text-gray-200 px-3 py-2 rounded-full hover:bg-[#3A3A3A] cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => setAmount("1")}
            disabled={balance < 1}
            className={`text-xs px-3 py-2 cursor-pointer rounded-full ${
              balance >= 1
                ? "bg-[#2A2A2A] text-gray-200 hover:bg-[#3A3A3A]"
                : "bg-[#0A0A0A] text-[#434343] cursor-not-allowed"
            }`}
          >
            1 BNB
          </button>
          <button
            onClick={() => setAmount("5")}
            disabled={balance < 5}
            className={`text-xs px-3 py-2 cursor-pointer rounded-full ${
              balance >= 5
                ? "bg-[#2A2A2A] text-gray-200 hover:bg-[#3A3A3A]"
                : "bg-[#0A0A0A] text-[#434343] cursor-not-allowed"
            }`}
          >
            5 BNB
          </button>
          <button
            onClick={() => setAmount(maxAmount)}
            className="text-xs cursor-pointer font-medium px-3 py-2 rounded-full bg-[#1F1F1F] hover:bg-[#2A2A2A]"
          >
            Max
          </button>
        </div>
      </div>

      {/* Fee & Hint Section */}
      {/* <div className="text-xs text-gray-400">
        Estimated Price Impact: <span className="text-yellow-400">~0.12%</span>
      </div>
      <div className="text-xs text-gray-400">
        Network Fee: <span className="text-white">0.0002 BNB</span>
      </div> */}

      {/* Submit Button */}
      <button
        className={`mt-2 flex cursor-pointer items-center w-full justify-center rounded-full px-3 py-3.5 text-xs font-semibold ${
          tab === "buy" ? "bg-[#06D57B]" : "bg-[#fe3c3cf4]"
        } text-white`}
        onClick={() => (tab === "buy" ? onBuy(amount) : onSell(amount))}
      >
        {tab === "buy" ? "Buy" : "Sell"}
        {" " + tokenName}
      </button>
    </div>
  );
}

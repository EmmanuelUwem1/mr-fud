"use client";
import { useState } from "react";
import { buyToken } from "@/lib/api";
import { sellToken } from "@/lib/api";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

interface BuySellCardProps {
  balance: number;
  tokenName: string;
  tokenPrice: number; 
  tokenChain: string; 
  tokenCa: string;
}

export default function BuySellCard({
  balance,
  tokenName,
  tokenPrice,
  tokenChain,
  tokenCa,
}: BuySellCardProps) {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
const {  address, } = useAccount();
const [loading, setLoading] = useState(false);


  const maxAmount = balance.toString();
async function onBuy(amount: string) {
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    toast.error("Please enter a valid amount to buy.");
    return;
  }

  const amountInBNB = parseFloat(amount);
  const amountInToken = amountInBNB / tokenPrice;

  const data = {
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdev",
    wallet: address as `0x${string}`,
    tokenAddress: tokenCa,
    amountInChainCurrency: amountInBNB,
    amountInToken,
    price: tokenPrice,
    value: amountInBNB * tokenPrice,
    chain: tokenChain,
  };

  setLoading(true);
  try {
    const response = await buyToken(data);
    if (response?.success) {
      toast.success(
        `Successfully bought ${amountInToken.toFixed(4)} ${tokenName}`
      );
      setAmount("");
    }
    else {
      toast.error("Failed to buy token. Please try again.");
    }
  } catch (error) {
    console.error("Error buying token:", error);
    toast.error("Failed to buy token. Please try again.");
  } finally {
    setLoading(false);
  }
}

async function onSell(amount: string) {
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    toast.error("Please enter a valid amount to sell.");
    return;
  }

  const amountInBNB = parseFloat(amount);
  const amountInToken = amountInBNB / tokenPrice;

  const data = {
    txHash: "mock-tx-hash",
    wallet: address as `0x${string}`,
    tokenAddress: tokenCa,
    amountInChainCurrency: amountInBNB,
    amountInToken,
    price: tokenPrice,
    value: amountInBNB * tokenPrice,
    chain: tokenChain,
  };

  setLoading(true);
  try {
    const response = await sellToken(data);
    if (response?.success) {
      toast.success(`Successfully sold ${amountInToken.toFixed(4)} ${tokenName}`);
      setAmount("");
    }
    else {
      toast.error("Failed to sell token. Please try again.");
    }
  } catch (error) {
    console.error("Error selling token:", error);
    toast.error("Failed to sell token. Please try again.");
  } finally {
    setLoading(false);
  }
}

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
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (val > balance) return; 
            setAmount(e.target.value);
          }}
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

      {/*  Preview */}
      {amount && !isNaN(parseFloat(amount)) && tokenPrice > 0 && (
        <div className="text-xs text-[#999999] font-medium">
          ≈ {parseFloat(amount) / tokenPrice} {tokenName}
        </div>
      )}

      <button
        disabled={loading}
        className={`mt-2 flex items-center justify-center w-full rounded-full px-3 py-3.5 text-xs font-semibold cursor-pointer ${
          tab === "buy" ? "bg-[#06D57B]" : "bg-[#fe3c3cf4]"
        } text-white ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        onClick={() => (tab === "buy" ? onBuy(amount) : onSell(amount))}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="white"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        ) : (
          `${tab === "buy" ? "Buy" : "Sell"} ${tokenName}`
        )}
      </button>
    </div>
  );
}

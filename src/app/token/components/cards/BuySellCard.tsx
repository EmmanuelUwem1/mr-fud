"use client";
import { useState } from "react";
import { buyToken, sellToken } from "@/lib/api";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
  const [modalOpen, setModalOpen] = useState(false);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const maxAmount = balance.toString();

  const handleTransaction = async () => {
    const isBuy = tab === "buy";
    const action = isBuy ? onBuy : onSell;
    await action(amount);
  };

  async function onBuy(amount: string) {
    if (!amount || isNaN(+amount) || +amount <= 0) {
      toast.error("Enter a valid amount to buy.");
      return;
    }
    const amountInBNB = parseFloat(amount);
    const amountInToken = amountInBNB / tokenPrice;
    const data = {
      txHash: "0xBUYMOCKTX",
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
      const res = await buyToken(data);
      if (res?.success) {
        toast.success(`Bought ${amountInToken.toFixed(4)} ${tokenName}`);
        setAmount("");
        setModalOpen(false);
      } else toast.error("Failed to buy token.");
    } catch {
      toast.error("Error while buying.");
    } finally {
      setLoading(false);
    }
  }

  async function onSell(amount: string) {
    if (!amount || isNaN(+amount) || +amount <= 0) {
      toast.error("Enter a valid amount to sell.");
      return;
    }
    const amountInBNB = parseFloat(amount);
    const amountInToken = amountInBNB / tokenPrice;
    const data = {
      txHash: "0xSELLMOCKTX",
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
      const res = await sellToken(data);
      if (res?.success) {
        toast.success(`Sold ${amountInToken.toFixed(4)} ${tokenName}`);
        setAmount("");
        setModalOpen(false);
      } else toast.error("Failed to sell token.");
    } catch {
      toast.error("Error while selling.");
    } finally {
      setLoading(false);
    }
  }

  const inputSection = (
    <>
      <div className="text-xs flex justify-between text-[#626262] font-semibold mb-2">
        Quantity
        <span>Balance: {balance.toFixed(5)} BNB</span>
      </div>

      <input
        type="number"
        min="0"
        step="0.0001"
        value={amount}
        placeholder="0.00"
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          if (val > balance) return;
          setAmount(e.target.value);
        }}
        className="w-full bg-[#2A2A2A] text-white px-3 py-4 rounded-md placeholder-gray-500 mb-3"
      />

      <div className="flex justify-between text-xs space-x-2 font-medium">
        <button
          onClick={() => setAmount("0")}
          className="bg-[#2A2A2A] text-gray-200 px-3 py-2 rounded-full"
        >
          Reset
        </button>
        <button
          onClick={() => setAmount("1")}
          disabled={balance < 1}
          className={`px-3 py-2 rounded-full ${
            balance >= 1
              ? "bg-[#2A2A2A] text-gray-200"
              : "bg-[#0A0A0A] text-[#434343] cursor-not-allowed"
          }`}
        >
          1 BNB
        </button>
        <button
          onClick={() => setAmount("5")}
          disabled={balance < 5}
          className={`px-3 py-2 rounded-full ${
            balance >= 5
              ? "bg-[#2A2A2A] text-gray-200"
              : "bg-[#0A0A0A] text-[#434343] cursor-not-allowed"
          }`}
        >
          5 BNB
        </button>
        <button
          onClick={() => setAmount(maxAmount)}
          className="px-3 py-2 bg-[#1F1F1F] rounded-full text-gray-200"
        >
          Max
        </button>
      </div>

      {amount && !isNaN(+amount) && tokenPrice > 0 && (
        <div className="text-xs text-[#999999] mt-2">
          ≈ {(parseFloat(amount) / tokenPrice).toFixed(4)} {tokenName}
        </div>
      )}

      <button
        disabled={loading}
        onClick={handleTransaction}
        className={`mt-4 w-full px-3 py-3.5 rounded-full text-xs font-semibold ${
          tab === "buy" ? "bg-[#06D57B]" : "bg-[#fe3c3cf4]"
        } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading
          ? "Loading..."
          : `${tab === "buy" ? "Buy" : "Sell"} ${tokenName}`}
      </button>
    </>
  );

  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:block w-96 p-4 rounded-md bg-[#141414] text-white space-y-4">
        <div className="bg-[#2A2A2A] rounded-full flex items-center">
          <button
            onClick={() => setTab("buy")}
            className={`w-full text-xs py-3.5 font-semibold rounded-full ${
              tab === "buy" ? "bg-[#06D57B]" : ""
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTab("sell")}
            className={`w-full text-xs py-3.5 font-semibold rounded-full ${
              tab === "sell" ? "bg-[#fe3c3cf4]" : ""
            }`}
          >
            Sell
          </button>
        </div>
        {inputSection}
      </div>

      {/* Mobile Tab Bar */}
      <div className="sm:hidden z-[1000] fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] flex items-center justify-between bg-[#2A2A2A] rounded-full">
        <button
          onClick={() => {
            setTab("buy");
            setModalOpen(true);
          }}
          className="text-xs text-white font-semibold flex w-full items-center justify-center bg-[#06D57B] px-5 py-4 rounded-full"
        >
          Buy
        </button>
        <button
          onClick={() => {
            setTab("sell");
            setModalOpen(true);
          }}
          className="text-xs flex w-full items-center justify-center text-white font-semibold px-5 py-4 rounded-full"
        >
          Sell
        </button>
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-[1100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] w-full max-w-sm p-5 rounded-xl text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-4">
                <div className="w-full flex items-center justify-center mb-2">
                  {" "}
                  <button
                    onClick={() => {
                      setTab("buy");
                      setModalOpen(true);
                    }}
                    className={`text-xs text-white font-semibold flex w-full items-center justify-center px-5 py-3 rounded-full ${
                      tab === "buy" ? "bg-[#06D57B]" : ""
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => {
                      setTab("sell");
                      setModalOpen(true);
                    }}
                    className={`text-xs text-white font-semibold flex w-full items-center justify-center px-5 py-3 rounded-full ${
                      tab === "sell" ? "bg-[#fe3c3cf4]" : ""
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>
              {inputSection}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

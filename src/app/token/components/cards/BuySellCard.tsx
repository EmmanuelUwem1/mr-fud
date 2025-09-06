"use client";
import { useState } from "react";
import { buyToken, sellToken } from "@/lib/api";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useBNBPrice } from "@/hooks/useBNBPrice";
import { generateFakeTxHash } from "@/lib/utils";
import { useUser } from "@/context/userContext";

interface BuySellCardProps {
  BNBbalance: number;
  tokenBalance: number;
  tokenName: string;
  tokenPrice: number;
  tokenChain: string;
  tokenCa: string;
  tokenImage: string;
  tokenTicker: string;
}

export default function BuySellCard({
  BNBbalance,
  tokenBalance,
  tokenName,
  tokenPrice,
  tokenChain,
  tokenCa,
  tokenImage,
  tokenTicker,
}: BuySellCardProps) {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedSlippage, setSelectedSlippage] = useState<string>("");
 const { price: bnbPriceUSD } = useBNBPrice();
const { refreshUser } = useUser();
  
  const isBuy = tab === "buy";
  const isSell = tab === "sell";
 const balance = isBuy ? BNBbalance : tokenBalance;
 const maxAmount = balance.toString();
 const inputAmount = parseFloat(amount);

const estimatedValue =
  (tokenPrice > 0 && bnbPriceUSD)
    ? isBuy
      ? (inputAmount *bnbPriceUSD)  / tokenPrice 
      : (inputAmount * tokenPrice )/ bnbPriceUSD
    : 0;



  const handleSlippageSelect = (value: string) => {
    setSelectedSlippage(value);
  };

  const handleTransaction = async () => {
    const action = isBuy ? onBuy : onSell;
    await action(amount);
  };

  async function onBuy(amount: string) {
    if (!amount || isNaN(+amount) || +amount <= 0) {
      toast.error("Enter a valid amount to buy.");
      return;
    }

    const amountInBNB = parseFloat(amount);
    const amountInToken =
      (tokenPrice > 0 && bnbPriceUSD) ? (inputAmount * bnbPriceUSD) / tokenPrice : 0;
    const valueInUSD = amountInBNB * bnbPriceUSD!;

    const data = {
      txHash: generateFakeTxHash(),
      wallet: address as `0x${string}`,
      tokenAddress: tokenCa,
      amountInChainCurrency: amountInBNB,
      amountInToken,
      price: tokenPrice,
      value: valueInUSD,
      chain: tokenChain,
    };

    const toastId = toast.loading("Processing purchase...");
    setLoading(true);

    try {
      const res = await buyToken(data);
      if (res?.success) {
        toast.success(`Bought ${amountInToken.toFixed(4)} ${tokenName}`, {
          id: toastId,
          duration: 4000,
        });
        setAmount("");
            await refreshUser();
        setModalOpen(false);

      } else {
        toast.error("Failed to buy token.", {
          id: toastId,
          duration: 4000,
        });
      }
    } catch {
      toast.error("Error while buying.", {
        id: toastId,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSell(amount: string) {
    if (!amount || isNaN(+amount) || +amount <= 0) {
      toast.error("Enter a valid amount to sell.");
      return;
    }

    const amountInToken = parseFloat(amount);
    const amountInBNB = tokenPrice > 0 ? amountInToken * tokenPrice : 0;

    const data = {
      txHash: generateFakeTxHash(),
      wallet: address as `0x${string}`,
      tokenAddress: tokenCa,
      amountInChainCurrency: amountInBNB,
      amountInToken,
      price: tokenPrice,
      value: amountInBNB,
      chain: tokenChain,
    };

    const toastId = toast.loading("Processing sale...");
    setLoading(true);

    try {
      const res = await sellToken(data);
      if (res?.success) {
        toast.success(`Sold ${amountInToken.toFixed(4)} ${tokenName}`, {
          id: toastId,
          duration: 4000,
        });
        setAmount("");
            await refreshUser();
        setModalOpen(false);
      } else {
        toast.error("Failed to sell token.", {
          id: toastId,
          duration: 4000,
        });
      }
    } catch {
      toast.error("Error while selling.", {
        id: toastId,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  const inputSection = (
    <>
      <div className="text-xs flex gap-4 justify-between text-[#87DDFF] font-semibold mb-2">
        <span className="w-full">Quantity</span>

        <span className="w-full">
          Balance:
          <span className="text-white">
            {" "}
            {balance.toFixed(5)} {isBuy ? "BNB" : tokenTicker}
          </span>
        </span>
      </div>

      <div className="w-full flex px-3 gap-3 justify-between bg-[#2F6786] items-center">
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
          className="w-full h-16 text-white py-6 rounded-md placeholder-[#87DDFF] mb-3"
        />
        <div className="flex items-center justify-center gap-1 bg-[#489ECC] rounded-full py-2 px-3">
          <span className="relative flex items-center justify-center h-6 w-6 rounded-full overflow-hidden">
            <Image
              alt=""
              src={isSell ? tokenImage : "/bnb-logo.svg"}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
          <span className="text-white text-xs font-semibold">
            {isSell ? tokenTicker : "BNB"}
          </span>
        </div>
      </div>

      {isBuy && (
        <div className="flex justify-between text-[10px] sm:text-xs space-x-2 font-medium pt-3">
          <button
            onClick={() => setAmount("0")}
            className="bg-[#2F6786] text-gray-200 px-3 py-2 rounded-full"
          >
            Reset
          </button>
          <button
            onClick={() => setAmount(`0.1`)}
            className={`px-3 py-2 rounded-full ${
              balance >= 1
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
            disabled={balance < 0.1}
          >
            0.1 BNB
          </button>
          <button
            onClick={() => setAmount(`0.5`)}
            className={`px-3 py-2 rounded-full ${
              balance >= 5
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
            disabled={balance < 0.5}
          >
            0.5 BNB
          </button>
          <button
            onClick={() => setAmount(`1`)}
            className={`px-3 py-2 rounded-full ${
              balance >= 5
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
            disabled={balance < 1}
          >
            1 BNB
          </button>
          <button
            onClick={() => setAmount(maxAmount)}
            className="px-3 py-2 bg-[#2F6786] rounded-full text-gray-200"
          >
            Max
          </button>
        </div>
      )}
      {isSell && (
        <div className="flex justify-between text-xs space-x-2 font-medium pt-3">
          <button
            onClick={() => setAmount("0")}
            className="bg-[#2F6786] text-gray-200 px-3 py-2 rounded-full"
          >
            Reset
          </button>
          <button
            onClick={() => setAmount(`${balance / 4}`)}
            disabled={balance < 0}
            className={`px-3 py-2 rounded-full ${
              balance >= 1
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
          >
            25%
          </button>
          <button
            onClick={() => setAmount(`${balance / 2}`)}
            disabled={balance < 0}
            className={`px-3 py-2 rounded-full ${
              balance >= 5
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
          >
            50%
          </button>
          <button
            onClick={() => setAmount(`${(balance * 3) / 4}`)}
            disabled={balance < 0}
            className={`px-3 py-2 rounded-full ${
              balance >= 5
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
          >
            75%
          </button>
          <button
            onClick={() => setAmount(maxAmount)}
            className="px-3 py-2 bg-[#2F6786] rounded-full text-gray-200"
          >
            Max
          </button>
        </div>
      )}

      {
        <>
          <div className="text-xs flex justify-between items-center text-[#87DDFF] font-semibold mt-2">
            <span>Min Received</span>
            <span>
              {!isNaN(estimatedValue)
                ? `${estimatedValue.toFixed(4)} ${isBuy ? tokenTicker : "BNB"}`
                : "--"}
            </span>
          </div>

          <div className="text-xs flex justify-between items-center text-[#87DDFF] font-semibold mt-2">
            <span>Advance settings</span>
            <span
              className={`relative flex items-center justify-center h-5 w-5 cursor-pointer ml-auto transition-class ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              <Image
                alt="collapse toggle"
                src={"/Reveal arrow.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </span>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-[#38B9FF] rounded-md py-4 mt-2"
              >
                <div className="text-xs text-[#87DDFF] mb-3 px-4">
                  Max Slippage
                </div>
                <input
                  type="text"
                  value={selectedSlippage}
                  readOnly
                  placeholder="Enter custom slippage"
                  className="w-full h-14 bg-[#2F6786] text-white text-sm px-3 py-4 mb-3 outline-none"
                />
                <div className="grid grid-cols-4 gap-2 px-2">
                  {["1%", "2.5%", "5%", "Max"].map((label) => (
                    <button
                      key={label}
                      className={`py-2 text-xs transition-colors bg-[#013253] text-gray-200 hover:opacity-80 px-3 rounded-full ${
                        selectedSlippage === label ? "bg-[#434343]" : ""
                      }`}
                      onClick={() => handleSlippageSelect(label)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      }

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
      <div className="hidden sm:block w-full max-w-96 p-4 rounded-[18px] box-bg text-white space-y-4 transition-class">
        <div className="bg-[#013253] rounded-full flex items-center">
          <button
            onClick={() => {
              setTab("buy");
              setAmount("");
            }}
            className={`w-full text-xs py-3.5 font-semibold rounded-full ${
              tab === "buy" ? "bg-[#06D57B]" : ""
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => {
              setTab("sell");
              setAmount("");
            }}
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
      <div className="sm:hidden z-[1000] fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] flex items-center justify-between bg-[#013253] rounded-full">
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
            className="fixed inset-0 bg-[#0077D3] bg-opacity-80 z-[1100] flex items-center justify-center p-4 transition-class"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="box-bg w-full max-w-sm p-5 rounded-xl text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-4">
                <div className="w-full flex items-center justify-center mb-2">
                  <button
                    onClick={() => {
                      setTab("buy");
                      setAmount("");
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
                      setAmount("");
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

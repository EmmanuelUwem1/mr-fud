"use client";
import { useState, useEffect } from "react";
import { buyToken, sellToken } from "@/lib/api";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/context/wagmi.config";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useBNBPrice } from "@/hooks/useBNBPrice";
import { generateFakeTxHash } from "@/lib/utils";
import { useUser } from "@/context/userContext";
import { CONSTANTS } from "@/web3/config/constants";
import { useSwapOcicatForBNB } from "@/web3/hooks/pancakeSwap/useSwapOcicatForBNB";
import { useSwapBNBForOcicat } from "@/web3/hooks/pancakeSwap/useSwapBNBForOcicat";
import { useApproveOcicat } from "@/web3/hooks/pancakeSwap/useApproveOcicat";
import { toWei } from "@/lib/utils";
import { useExpectedAmountOut } from "@/web3/hooks/pancakeSwap/useExpectedAmountOut";
import { formatNumber } from "@/lib/utils";
import { oasisTestnet } from "viem/chains";



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
  const OcicatTokenCa = CONSTANTS.OCICAT_TOKEN_ADDRESS;
  const isBuy = tab === "buy";
  const isSell = tab === "sell";
  const balance = isBuy ? BNBbalance : tokenBalance;
  const maxAmount = balance.toString();
  const inputAmount = parseFloat(amount);
  const { approve } = useApproveOcicat();
  const { swap: swapBNBForOcicat } = useSwapBNBForOcicat();
  const { swap: swapOcicatForBNB } = useSwapOcicatForBNB();
const { expectedAmountOut, fetchExpectedAmountOut, loading:loadingAmount } =useExpectedAmountOut();
  const [minRecieved, setMinRecieved] = useState<bigint | number>()




  const WBNB_ADDRESS = CONSTANTS.WBNB_CONTRACT_ADDRESS as `0x${string}`;
  const OCICAT_ADDRESS = CONSTANTS.OCICAT_TOKEN_ADDRESS as `0x${string}`;





useEffect(() => {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    

    const timeout = setTimeout(() => {
      const fetch = async () => {
        try {
          const path = isBuy
            ? [WBNB_ADDRESS, OCICAT_ADDRESS]
            : [OCICAT_ADDRESS, WBNB_ADDRESS];

          await fetchExpectedAmountOut({
            amountIn: toWei(amount, isBuy ? 18 : 6),
            path,
          });
        } catch (err) {
          console.error("Error fetching expected amount out:", err);
        }
      };

      fetch();
    }, 2000);
// 2-second debounce

  return () => clearTimeout(timeout); // cleanup on re-render
}, [amount, isBuy]);




  const estimatedValue =
    tokenPrice > 0 && bnbPriceUSD
      ? isBuy
        ? (inputAmount * bnbPriceUSD) / tokenPrice
        : (inputAmount * tokenPrice) / bnbPriceUSD
      : 0;

  const handleSlippageSelect = (value: string) => {
    setSelectedSlippage(value);
  };

  const calculateMinAmountOut = (
    expectedAmountOut: bigint,
    slippage: string
  ): bigint => {
    if (slippage.toLowerCase() === "max") {
      // No minimum enforced — accept any output
return BigInt(0);
    }

    let numericValue = parseInt(slippage?.replace("%", "") || "");

    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      numericValue = 10; // Default to 10% if invalid or not provided
    }

    const slippageFactor = BigInt(100 - numericValue);
return (expectedAmountOut * slippageFactor) / BigInt(100);
  };


  const handleTransaction = async () => {
    if (tokenCa === OcicatTokenCa) {
      try {
        const path = isBuy
          ? [WBNB_ADDRESS, OCICAT_ADDRESS]
          : [OCICAT_ADDRESS, WBNB_ADDRESS];

        setLoading(true);
        const inputDecimals = isBuy ? 18 : 6; // buying = input is BNB, selling = input is Ocicat
        fetchExpectedAmountOut({
          amountIn: toWei(amount, inputDecimals),
          path,
        });

        if (expectedAmountOut) {
          const minAmountOut = calculateMinAmountOut(
            expectedAmountOut,
            selectedSlippage
          );
          setMinRecieved(minAmountOut);
        }

        const amountIn = toWei(amount, inputDecimals);

        const minAmountOut = calculateMinAmountOut(
          typeof minRecieved === "bigint"
            ? minRecieved
            : BigInt(minRecieved || 0),
          selectedSlippage
        );

        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;


       if (isBuy) {
         await swapBNBForOcicat({
           amountInWei: amountIn,
           minAmountOut,
           path,
           deadline,
         });
       } else {
         try {
           // Step 1: Approve token transfer
           const approvalTxHash = await approve({ amount: amountIn });

           if (!approvalTxHash) {
             toast.error("Approval transaction failed — no hash returned.");
             return
           }
           // Step 2: Wait for approval to be mined
           await waitForTransactionReceipt(config, {
             hash: approvalTxHash,
             confirmations: 1,
           });
           toast.success(`amount in : ${amountIn}`)

           // Step 3: Execute the swap
           await swapOcicatForBNB({
             amountIn,
             minAmountOut,
             path,
             deadline,
           });
         } catch (error) {
           toast.error(
             `Sell failed: ${(error as Error)?.message || "Unknown error"}`,
             {
               icon: "❌",
               duration: 4000,
             }
           );
         }
       }


       setAmount("");
       await refreshUser();
       setModalOpen(false);
      } catch (err) {
          console.error("Swap error:", err);
        } finally {
          setLoading(false);
        }

    } else {
      const action = isBuy ? onBuy : onSell;
      await action(amount);
    }
  };

  async function onBuy(amount: string) {
    if (!amount || isNaN(+amount) || +amount <= 0) {
      toast.error("Enter a valid amount to buy.");
      return;
    }

    const amountInBNB = parseFloat(amount);
    const amountInToken =
      tokenPrice > 0 && bnbPriceUSD
        ? (inputAmount * bnbPriceUSD) / tokenPrice
        : 0;
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
        toast.success(`Bought ${formatNumber(amountInToken)} ${tokenName}`, {
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
            className="bg-[#2F6786] text-gray-200 px-2 py-2 rounded-full"
          >
            Reset
          </button>
          <button
            onClick={() => setAmount(`0.1`)}
            className={`px-2 py-2 rounded-full ${
              balance >= 0.1
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
            disabled={balance < 0.1}
          >
            0.1 BNB
          </button>
          <button
            onClick={() => setAmount(`0.5`)}
            className={`px-2 py-2 rounded-full ${
              balance >= 0.5
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
            disabled={balance < 0.5}
          >
            0.5 BNB
          </button>
          <button
            onClick={() => setAmount(`1`)}
            className={`px-2 py-2 rounded-full ${
              balance >= 1
                ? "bg-[#013253] text-gray-200"
                : "bg-[#0a0a0a53] text-[#868686] cursor-not-allowed"
            }`}
            disabled={balance < 1}
          >
            1 BNB
          </button>
          <button
            onClick={() => setAmount(maxAmount)}
            className="px-2 py-2 bg-[#2F6786] rounded-full text-gray-200"
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
            {loadingAmount ? (
              <div className="flex ml-auto justify-end items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
              </div>
            ) : (
              <span>
                {estimatedValue &&
                !isNaN(Number(estimatedValue)) &&
                estimatedValue !== 0
                  ? `${formatNumber(Number(estimatedValue))} ${
                      isBuy ? tokenTicker : "BNB"
                    }`
                  : "--"}
              </span>
            )}
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
                        selectedSlippage === label ? "bg-[#2F6786]" : ""
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
        className={`mt-4 w-full px-3 py-4 rounded-full text-xs font-semibold ${
          tab === "buy" ? "bg-[#06D57B]" : "bg-[#fe3c3cf4]"
        } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <div className="flex mx-auto justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
          </div>
        ) : (
          `${tab === "buy" ? "Buy" : "Sell"} ${tokenName}`
        )}
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
            className={`w-full text-xs py-4 font-semibold rounded-full ${
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
            className={`w-full text-xs py-4 font-semibold rounded-full ${
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
                    className={`text-xs text-white font-semibold flex w-full items-center justify-center px-5 py-4 rounded-full ${
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
                    className={`text-xs text-white font-semibold flex w-full items-center justify-center px-5 py-4 rounded-full ${
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

"use client";
import { useWriteContract, useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import routerAbi from "@/web3/ABIs/pancake-swap-v2-router-abi.json";
import { CONSTANTS } from "@/web3/config/constants";

export const useSwapOcicatForBNB = () => {
  const routerAddress =
    CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;
  const { writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();

  const swap = async ({
    amountIn,
    minAmountOut,
    path,
    deadline,
  }: {
    amountIn: bigint;
    minAmountOut: bigint;
    path: `0x${string}`[];
    deadline: number;
  }) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet to sell Ocicat.");
      return;
    }

    const toastId = toast.loading("Selling Ocicat for BNB...");

    return new Promise((resolve, reject) => {
      writeContract(
        {
          address: routerAddress,
          abi: routerAbi,
          functionName: "swapExactTokensForETHSupportingFeeOnTransferTokens",
          args: [amountIn, minAmountOut, path, address, deadline],
        },
        {
          onSuccess: (txHash: `0x${string}`) => {
            toast.success("Sale complete! 💰", {
              id: toastId,
              duration: 4000,
            });
            resolve(txHash);
          },
          onError: (error) => {
            toast.error(`${(error as Error)?.message || "Sale failed."}`, {
              id: toastId,
              icon: "❌",
              duration: 4000,
            });
            reject(error);
          },
        }
      );
    });
  };

  return { swap };
};

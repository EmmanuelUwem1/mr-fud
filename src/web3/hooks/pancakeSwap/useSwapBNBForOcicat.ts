"use client";
import { useWriteContract, useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import routerAbi from "@/web3/ABIs/pancake-swap-v2-router-abi.json";
import { CONSTANTS } from "@/web3/config/constants";

export const useSwapBNBForOcicat = () => {
  const routerAddress =
    CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;
  const { writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();

  const swap = async ({
    amountInWei,
    minAmountOut,
    path,
    deadline,
  }: {
    amountInWei: bigint;
    minAmountOut: bigint;
    path: `0x${string}`[];
    deadline: number;
  }) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet to buy Ocicat.");
      return;
    }

    return toast.promise(
      writeContractAsync({
        address: routerAddress,
        abi: routerAbi,
        functionName: "swapExactETHForTokens",
        args: [minAmountOut, path, address, deadline],
        value: amountInWei,
      }),
      {
        loading: "Swapping BNB for Ocicat...",
        success: "Swap successful! 🎉",
        error: "Swap failed. Please try again.",
      }
    );
  };

  return { swap };
};

"use client";
import { useWriteContract, useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import routerAbi from "@/web3/ABIs/pancake-swap-v2-router-abi.json";
import { CONSTANTS } from "@/web3/config/constants";

export const useSwapOcicatForBNB = () => {
  const routerAddress =
    CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;
  const { writeContractAsync } = useWriteContract();
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

    return toast.promise(
      writeContractAsync({
        address: routerAddress,
        abi: routerAbi,
        functionName: "swapExactTokensForETH",
        args: [amountIn, minAmountOut, path, address, deadline],
      }),
      {
        loading: "Selling Ocicat for BNB...",
        success: "Sale complete! 💰",
        error: "Sale failed. Try again.",
      }
    );
  };

  return { swap };
};

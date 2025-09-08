"use client";
import { useState } from "react";
import { usePublicClient } from "wagmi";
import { getContract } from "viem";
import routerAbi from "@/web3/ABIs/pancake-swap-v2-router-abi.json";
import { CONSTANTS } from "@/web3/config/constants";
import toast from "react-hot-toast";

export const useExpectedAmountOut = () => {
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState(false);
  const [expectedAmountOut, setExpectedAmountOut] = useState<bigint | null>(
    null
  );

  const routerAddress =
    CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;

  const fetchExpectedAmountOut = async ({
    amountIn,
    path,
  }: {
    amountIn: bigint;
    path: `0x${string}`[];
  }) => {
    if (!publicClient) {
      setExpectedAmountOut(null);
      return;
    }

    setLoading(true);


    try {
      const routerContract = getContract({
        address: routerAddress,
        abi: routerAbi,
        client: publicClient,
      });

      const amountsOut = (await routerContract.read.getAmountsOut([
        amountIn,
        path,
      ])) as bigint[];
      setExpectedAmountOut(amountsOut[1]);
    } catch (error) {
      setExpectedAmountOut(null);
    } finally {
      setLoading(false);
    }
  };

  return { expectedAmountOut, fetchExpectedAmountOut, loading };
};

"use client";
import { useReadContract } from "wagmi";
import routerAbi from '@/web3/ABIs/pancake-swap-v2-router-abi.json'
import { CONSTANTS } from "@/web3/config/constants";



export const useGetAmountsOut = ({
  amountIn,
  path,
}: {
  amountIn: bigint;
  path: `0x${string}`[];
}) => {
    const routerAddress = CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;
    
  return useReadContract({
    address: routerAddress,
    abi: routerAbi,
    functionName: "getAmountsOut",
    args: [amountIn, path],
  });
};

"use client";

import { useWriteContract } from "wagmi";
import { parseEther, createPublicClient, http } from "viem";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/countdown-adverts-contract-abi.json";
import { bsc } from "wagmi/chains";

const CONTRACT_ADDRESS = CONSTANTS.COUNTDOWN_CONTRACT_ADDRESS as `0x${string}`;

export function useCreateCountdown() {
  const { writeContractAsync, isPending } = useWriteContract();
  const queryClient = useQueryClient();

  const publicClient = createPublicClient({
    chain: bsc,
    transport: http(),
  });

  const createCountdown = async ({
    title,
    description,
    startTime,
    payableAmount,
    account,
  }: {
    title: string;
    description: string;
    startTime: bigint;
    payableAmount: string; // in ETH
    account: `0x${string}`; // wallet address
  }) => {
    const toastId = toast.loading("Creating countdown...");

    try {
      // Simulate transaction
      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "createCountdown",
        args: [title, description, startTime],
        value: parseEther(payableAmount),
        account,
      });

      // Send transaction and get hash
      const txHash = await writeContractAsync(request);

      toast.success("Countdown created on-chain 🎉", {
        id: toastId,
        duration: 4000,
      });

      queryClient.invalidateQueries();
      return txHash;
    } catch (error) {
      toast.error(`${(error as Error)?.message || "Transaction failed"}`, {
        id: toastId,
        icon: "❌",
        duration: 4000,
      });
      throw error;
    }
  };

  return {
    createCountdown,
    isPending,
  };
}

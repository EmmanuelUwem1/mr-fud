"use client";

import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { CONSTANTS } from "@/web3/config/constants";
import ocicatTokenABI from "@/web3/ABIs/ocicat-token-contract-abi.json";

export const useApproveOcicat = () => {
  const { writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();

  const tokenAddress = CONSTANTS.OCICAT_TOKEN_ADDRESS as `0x${string}`;
  const spender = CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;

  const approve = async ({ amount }: { amount: bigint }) => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to approve Ocicat.");
      return;
    }

    const toastId = toast.loading("Approving...");

    try {
      const txHash = await writeContractAsync({
        address: tokenAddress,
        abi: ocicatTokenABI,
        functionName: "approve",
        args: [spender, amount],
      });

      toast.success("Approved", {
        id: toastId,
        duration: 4000,
      });

      return txHash;
    } catch (error) {
      toast.error(`${(error as Error)?.message || "Approval failed."}`, {
        id: toastId,
        icon: "❌",
        duration: 4000,
      });
      throw error;
    }
  };

  return { approve };
};

"use client";
import { useWriteContract, useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { CONSTANTS } from "@/web3/config/constants";
import ocicatTokenABI from "@/web3/ABIs/ocicat-token-contract-abi.json";

export const useApproveOcicat = () => {
  const { writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();
  const tokenAddress = CONSTANTS.OCICAT_TOKEN_ADDRESS as `0x${string}`;
  const spender = CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;

  const approve = async ({ amount }: { amount: bigint }) => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to approve Ocicat.");
      return;
    }

    const toastId = toast.loading("Approving...");

    return new Promise((resolve, reject) => {
      writeContract(
        {
          address: tokenAddress,
          abi: ocicatTokenABI,
          functionName: "approve",
          args: [spender, amount],
        },
        {
          onSuccess: (txHash: `0x${string}`) => {
            toast.success("Approved ✅", {
              id: toastId,
              duration: 4000,
            });
            resolve(txHash);
          },
          onError: (error) => {
            toast.error(`${(error as Error)?.message || "Approval failed."}`, {
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

  return { approve };
};

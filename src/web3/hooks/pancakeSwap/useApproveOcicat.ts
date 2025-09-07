"use client";
import { useWriteContract, useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { CONSTANTS } from "@/web3/config/constants";
import ocicatTokenABI from "@/web3/ABIs/ocicat-token-contract-abi.json";

export const useApproveOcicat = () => {
  const { writeContractAsync } = useWriteContract();
    const { address, isConnected } = useAccount();
    const tokenAddress = CONSTANTS.OCICAT_TOKEN_ADDRESS as `0x${string}`;
    const spender = CONSTANTS.PANCAKE_SWAP_BSC_V2_ROUTER_ADDRESS as `0x${string}`;

  const approve = async ({
    amount,
  }: {
  
    amount: bigint;
  }) => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to approve Ocicat.");
      return;
    }

    return toast.promise(
      writeContractAsync({
        address: tokenAddress,
        abi: ocicatTokenABI,
        functionName: "approve",
        args: [spender, amount],
      }),
      {
        loading: "Approving.",
        success: "Approved",
        error: "Approval failed.",
      }
    );
  };

  return { approve };
};

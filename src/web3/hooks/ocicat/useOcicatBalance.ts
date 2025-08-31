import { useAccount, useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import OcicatABI from "@/web3/ABIs/ocicat-token-contract-abi.json";

const OCICAT_TOKEN_ADDRESS = CONSTANTS.OCICAT_TOKEN_ADDRESS;

export function useOcicatBalance() {
  const { address } = useAccount();

  const {
    data: balance,
    isLoading,
    error,
  } = useReadContract({
    address: OCICAT_TOKEN_ADDRESS as `0x${string}`,
    abi: OcicatABI,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
  });

  return {
    balance,
    isLoading,
    error,
  };
}

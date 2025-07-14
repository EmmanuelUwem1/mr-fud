import { useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useTotalSupply() {
  const result = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "totalSupply",
  });

  return {
    totalSupply: result.data?.toString(),
    tSILoading: result.isLoading,
    isError: result.isError,
  };
}

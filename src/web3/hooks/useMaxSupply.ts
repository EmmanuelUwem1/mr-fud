import { useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useMaxSupply() {
  const result = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "MAX_SUPPLY",
  });

  return {
    maxSupply: result.data?.toString(),
    mSILoading: result.isLoading,
    isError: result.isError,
  };
}

import { useAccount, useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useNFTBalance() {
  const { address, isConnected } = useAccount();

  const result = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  const balance = result.data ? BigInt(result.data.toString()) : BigInt(0);

  return {
    balance, // NFT balance as BigInt
    bILoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
}

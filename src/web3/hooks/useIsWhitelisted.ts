import { useAccount, useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useIsWhitelisted() {
  const { address, isConnected } = useAccount();

  const result = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "whitelist",
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Cast and derive values
  const eligibleAmount = result.data
    ? BigInt(result.data.toString())
    : BigInt(0);
  const isWhitelisted = eligibleAmount > BigInt(0);

  return {
    eligibleAmount, // full amount returned by contract
    isWhitelisted, // true if amount > 0
    amTLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
}

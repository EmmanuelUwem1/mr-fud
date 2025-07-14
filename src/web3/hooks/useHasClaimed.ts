import { useAccount, useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";
import { useIsWhitelisted } from "./useIsWhitelisted"; 

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useHasClaimed() {
  const { address, isConnected } = useAccount();

  // Get claimed amount
  const result = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "claimed",
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Get eligible whitelist amount
  const { eligibleAmount } = useIsWhitelisted();

  const claimedAmount = result.data
    ? BigInt(result.data.toString())
    : BigInt(0);
  const hasClaimed =
    eligibleAmount > BigInt(0) && claimedAmount >= eligibleAmount;

  return {
    claimedAmount,
    hasClaimed,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
}

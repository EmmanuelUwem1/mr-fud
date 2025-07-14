import { useWriteContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useBuyNFT() {
  const { writeContract, isPending, isError, error } = useWriteContract();
const queryClient = useQueryClient();
  const buy = async (payableAmount: bigint) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "buy",
        value: payableAmount,
      });

      toast.success("mint successful",
        {
          duration:4000,
        }
      )
       
     queryClient.invalidateQueries();
    } catch (err) {
       toast.error(
         `${(err as Error)?.message || "An unexpected error occured"}`,
         {
           icon: "❌",
           duration: 4000,
         }
       );
     
       
    }
  };

  return {
    buy,
    isPending,
    isError,
    error,
  };
}

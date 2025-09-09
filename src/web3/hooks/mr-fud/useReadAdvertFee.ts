import { useReadContracts } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi  from "@/web3/ABIs/countdown-adverts-contract-abi.json";


const CONTRACT_ADDRESS =CONSTANTS.COUNTDOWN_CONTRACT_ADDRESS as `0x${string}`;


export function useAdvertFee() {
  const { data, isPending, error } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "advertFee",
      },
    ],
  });

  return {
    advertFee: data?.[0]?.result,
    isLoading: isPending,
    isError: !!error,
  };
}

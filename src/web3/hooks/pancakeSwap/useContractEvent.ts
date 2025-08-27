// import { useWatchContractEvent } from "wagmi";
// import { formatUnits } from "viem";
// import pairAbi from "./PancakePairABI.json"; // your ABI file

// useWatchContractEvent({
//   address: "0x6dbda0963f03ed29458ebe9ba6ed9f8948125b9d", // Ocicat/BNB pair
//   abi: pairAbi,
//   eventName: "Swap",
//   listener: (log) => {
//     const { sender, amount0In, amount1In, amount0Out, amount1Out } = log.args;

//     const action = amount0In > 0n ? "Buy" : "Sell";
//     const amountBNB = formatUnits(amount0In > 0n ? amount0In : amount0Out, 18);
//     const amountOcicat = formatUnits(
//       amount1In > 0n ? amount1In : amount1Out,
//       9
//     ); // adjust decimals

//     console.log({
//       wallet: sender,
//       action,
//       amountBNB,
//       amountOcicat,
//       txHash: log.transactionHash,
//       blockNumber: log.blockNumber,
//     });
//   },
// });

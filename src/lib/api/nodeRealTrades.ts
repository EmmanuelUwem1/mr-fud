"use server"
import axios from "axios";

const NODE_REAL_GRAPHQL_URL =
  "https://open-platform.nodereal.io/bb044d1bf71048a1b5c027868de7d74c/pancakeswap-free/graphql";

const OCICAT_PAIR_ADDRESS = "0x1df65d3a75aecd000a9c17c97e99993af01dbcd1";

type RawSwap = {
  id: string;
  amount0In: string;
  amount1In: string;
  amount0Out: string;
  amount1Out: string;
  sender: string;
  to: string;
  timestamp: string;
};

export async function fetchOcicatTradesFromNodeReal(limit = 30) {
  const query = `
    {
      swaps(
        first: ${limit},
        orderBy: timestamp,
        orderDirection: desc,
        where: {
          pair: "${OCICAT_PAIR_ADDRESS}"
        }
      ) {
        id
        amount0In
        amount1In
        amount0Out
        amount1Out
        sender
        to
        timestamp
      }
    }
  `;

  try {
    const response = await axios.post(NODE_REAL_GRAPHQL_URL, { query });
    const swaps: RawSwap[] = response.data.data.swaps;

   return swaps.map((swap) => {
     const amount0In = parseFloat(swap.amount0In); // BNB in
     const amount1In = parseFloat(swap.amount1In); // Ocicat in
     const amount0Out = parseFloat(swap.amount0Out); // BNB out
     const amount1Out = parseFloat(swap.amount1Out); // Ocicat out

     const action =
       amount1In > 0 && amount0Out > 0
         ? "sell" // Ocicat in, BNB out
         : amount0In > 0 && amount1Out > 0
         ? "buy" // BNB in, Ocicat out
         : "buy"; // fallback

        
     return {
       hash: swap.id,
       time: new Date(parseInt(swap.timestamp) * 1000).toISOString(),
       buyer: swap.sender,
       seller: swap.to,
       amount: action === "buy" ? amount1Out : amount1In, // Ocicat amount
       bnbAmount: action === "buy" ? amount0In : amount0Out, // BNB amount
       action: action as "buy" | "sell",
     };
   });

  } catch (error) {
    console.error("Failed to fetch Ocicat trades from NodeReal:", error);
    
  }
}

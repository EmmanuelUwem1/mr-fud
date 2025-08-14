"use server";

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const OCICAT_TOKEN_ADDRESS = "0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70";


export interface CreateTokenPayload {
  name: string;
  ticker: string;
  isAntiGeet: boolean;
  chain: "BSC" | "ETH";
  description: string;
  creatorWallet: string;
  totalSupply: number;
  initialPrice: number;
  image: string;
  contractAddress: string;
  twitter?: string;
  website?: string;
  telegram?: string;
}

export async function createToken(payload : CreateTokenPayload) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/tokens/create`,
      payload
    );
      console.log("CreateToken response:", response.data);
    return {success:true, data: response.data};
  } catch (error) {
      if (axios.isAxiosError(error)) {
        
      console.error("CreateToken error:", error.response?.data || error.message);
        //   throw new Error(error.response?.data?.message || "Error creating token");
          return {success:false, error: error.response?.data || error.message};
    } else {
      console.error("CreateToken error:", (error as Error).message);
      throw new Error((error as Error).message || "Error creating token");
    }
  }
}

export async function fetchTokens() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/tokens/`);
    console.log("fetched tokens:", response.data);
    return response.data; 
  } catch (error) {
    console.error(
      "Error fetching tokens:",
       (error as Error).message
    );
    throw new Error("Failed to fetch tokens");
  }
};



type BuyPayload = {
  txHash: string;
  wallet: string;
  tokenAddress: string;
  amountInChainCurrency: number;
  amountInToken: number;
  price: number;
  value: number;
  chain: string;
};

export const buyToken = async (data: BuyPayload) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/transactions/buy`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
console.log("BuyToken response:", response.data);
   return {success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server error:", error.response.data);
    } else if (error instanceof Error) {
      console.error("Network error:", error.message);
    } else {
      console.error("An unknown error occurred during buyToken.");
    }
  }
};


export const sellToken = async (data: BuyPayload) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/transactions/sell`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
console.log("SellToken response:", response.data);
   return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server error:", error.response.data);
    } else if (error instanceof Error) {
      console.error("Network error:", error.message);
    } else {
      console.error("An unknown error occurred during SellToken.");
    }
  }
};






export async function fetchOcicatTokenPrice() {
  const apiUrl = process.env.NEXT_PUBLIC_COINGECKO_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
  const tokenAddress = OCICAT_TOKEN_ADDRESS;

  if (!apiUrl || !apiKey || !tokenAddress) {
    throw new Error("Missing CoinGecko API configuration");
  }

  try {
    const response = await axios.get(
      `${apiUrl}/simple/token_price/0x10ED43C718714eb63d5aA57B78B54704E256024E`,
      {
        params: {
          "x-cg-demo-api-key": apiKey,
          contract_addresses: tokenAddress,
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
          include_last_updated_at: true,
          precision: "2",
        },
      }
    );

    const data = response.data[tokenAddress.toLowerCase()];
    if (!data) {
      throw new Error("Token data not found in response");
    }

    console.log("Token price data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching token price:", error);
    throw new Error("Failed to fetch token price");
  }
}



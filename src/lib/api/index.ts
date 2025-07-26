"use server";

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL


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

export const buyToken = async (data: BuyPayload): Promise<void> => {
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

    console.log("Buy token response:", response.data);
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


export const sellToken = async (data: BuyPayload): Promise<void> => {
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

    console.log("Sell token response:", response.data);
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


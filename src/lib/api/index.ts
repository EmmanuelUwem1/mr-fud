"use server";

import axios from "axios";



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
      "http://localhost:3000/api/v1/tokens/create",
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("CreateToken error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error creating token");
    } else {
      console.error("CreateToken error:", (error as Error).message);
      throw new Error((error as Error).message || "Error creating token");
    }
  }
}

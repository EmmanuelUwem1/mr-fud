"use server";

import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL


export interface CreateTokenPayload {
  name: string;
  ticker: string;
  isAntiGeet: boolean;
  chain: "BSC" | "ETH";
  description: string;
  creatorWallet: string;
  totalSupply: number;
  initialPrice: number;
  hardcap: number;
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
          return {success:false, error: (error as import("axios").AxiosError).response?.data || (error as Error).message};
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





export interface CampaignPayload {
  coinName: string;
  ticker: string;
  description: string;
  campaignTitle: string;
  campaignBanner: string;
  creatorWallet: string;
  image: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  twitter?: string;
  website?: string;
  telegram?: string;
}



export async function createCampaign(
  campaignPayload: CampaignPayload
 ){
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/campaigns`,
      campaignPayload
    );
    console.log("CreateCampaign response:", response.data);
    const data = response.data;
    return {success:true,data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("CreateCampaign error:", error.response?.data || error.message);
      return {success:false, error: error.response?.data || error.message};
    }
    return {success:false, error: (error as Error).message || "Error creating campaign"};
  }
}






export async function fetchCampaigns() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/campaigns`);
    console.log("Fetched campaigns:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching campaigns:",
      (error as Error).message
    );
   
  }
}







export async function fetchOcicatTokenPrice() {
  const pairAddress = "0x1df65d3a75AeCd000A9c17c97E99993aF01DbcD1";
  const apiUrl = `https://api.dexscreener.com/latest/dex/pairs/bsc/${pairAddress}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.pair) {
      throw new Error("Token data not found in response");
    }

    const pair = data.pair;
    console.log(pair);

    return {
      price: parseFloat(pair.priceUsd),
      currentPrice: parseFloat(pair.priceUsd),
      marketCap: pair.marketCap,
      volume24h: pair.volume.h24,
      changePerDay: pair.priceChange.h24,
      liquidity: pair.liquidity.usd,
      contractAddress: pair.baseToken.address,
      image: pair.info.imageUrl,
      twitter:
        pair.info.socials.find(
          (s: { type: string; url: string }) => s.type === "twitter"
        )?.url || "",
      telegram:
        pair.info.socials.find(
          (s: { type: string; url: string }) => s.type === "telegram"
        )?.url || "",
    };
  } catch (error) {
     if (axios.isAxiosError(error)) {
       console.error(
         "Error fetching Ocicat token price:",
         error.response?.data || error.message
       );
       return { success: false, error: error.response?.data || error.message };
     }
     return {
       success: false,
       error: (error as Error).message || "Error fetching Ocicat token price",
     };
  }
}


export interface CreateCommentPayload {
  tokenAddress: string;
  walletAddress: string;
  content: string;
  parentComment: string | null; 
}


export async function createComment(
  payload:CreateCommentPayload
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/comments`,
      payload
    );
    console.log("Comment created:", response.data);
  } catch (error) {
    console.error("Error creating comment:", (error as Error).message);
   
  }
}


export async function fetchComments(tokenAddress: string) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/comments/token/${tokenAddress}`
    );
    return response.data; 
  } catch (error) {
     if (axios.isAxiosError(error)) {
       console.error(
         "Error fetching comments:",
         error.response?.data || error.message
       );
       return { success: false, error: error.response?.data || error.message };
     }
     return {
       success: false,
       error: (error as Error).message || "Error fetching comments",
     };
  }
}
export async function updateComment(
  id: string,
  wallet: string,
  content: string
) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/comments/${id}?wallet=${wallet}`,
      { content }
    );
    console.log("Comment updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", (error as Error).message);
    return {
      success: false,
      error: (error as Error).message || "Error updating comment",
    };
  }
}


export async function deleteComment(id: string, wallet: string) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/comments/${id}?wallet=${wallet}`
    );
    const data = response.data;
    console.log("Comment deleted:", response.data);
    return {data, success:true};
  } catch (error) {
    console.error("Error deleting comment:", (error as Error).message);
    return {
      success: false,
      error: (error as Error).message || "Error deleting comment",
    };
  }
}


export async function fetchUser(walletAddress: string) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/profile/${walletAddress}`
    );
    console.log("fetched user data ", response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
      return { success: false, error: error.response?.data || error.message };
    }
    return {
      success: false,
      error: (error as Error).message || "Error fetching user",
    };
  }
}



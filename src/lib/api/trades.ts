"use server"
import axios from "axios";


const BITQUERY_API_URL = "https://streaming.bitquery.io/graphql";
const BITQUERY_ACCESS_TOKEN =
  "ory_at_LB4v0lvd2EC6PkjVx_XAu0CCFxcoAncCiS54KkkKfg8.jr6zyx677C2y55XeTHT1DtMVjzPdwVRYgfEF2HEM6Lk";

type BitqueryResponse = {
  data: {
    EVM: {
      DEXTradeByTokens: {
        Block: {
          Time: string;
          Number: number;
        };
        Transaction: {
          Hash: string;
          From: string;
        };
        Trade: {
          Buyer: string;
          Seller: string;
          Amount: number;
          AmountInUSD: number;
          Price: number;
          PriceInUSD: number;
          Dex: {
            ProtocolName: string;
            ProtocolFamily: string;
            SmartContract: string;
          };
          Currency: {
            Name: string;
            Symbol: string;
            SmartContract: string;
          };
          Side: {
            Type: "buy" | "sell";
            Amount: number;
            AmountInUSD: number;
            Currency: {
              Name: string;
              Symbol: string;
              SmartContract: string;
            };
          };
        };
      }[];
    };
  };
};


const query = `
{
  EVM(network: bsc) {
    DEXTradeByTokens(
      orderBy: {descending: Block_Time}
      limit: {count: 100}
      where: {
        Trade: {
          Currency: {
            SmartContract: {
              is: "0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70"
            }
          }
          Side: {
            Currency: {
              SmartContract: {
                is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
              }
            }
          }
        }
      }
    ) {
      Block {
        Time
        Number
      }
      Transaction {
        Hash
        From
      }
      Trade {
        Buyer
        Seller
        Amount
        AmountInUSD
        Price
        PriceInUSD
        Dex {
          ProtocolName
          ProtocolFamily
          SmartContract
        }
        Currency {
          Name
          Symbol
          SmartContract
        }
        Side {
          Type
          Amount
          AmountInUSD
          Currency {
            Name
            Symbol
            SmartContract
          }
        }
      }
    }
  }
}
`;

export type OcicatTrade = {
  hash: string;
  time: string;
  buyer: string;
  seller: string;
  initiator: string;
  amount: number;
  amountInUSD: number;
  price: number;
  priceInUSD: number;
  action: "buy" | "sell";
  bnbAmount: number;
  bnbAmountInUSD: number;
};



// const BITQUERY_API_URL = "https://graphql.bitquery.io"; 

export async function fetchOcicatTrades(): Promise<OcicatTrade[]> {
  try {
    const response = await axios.post(
      BITQUERY_API_URL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BITQUERY_ACCESS_TOKEN}`,
        },
      }
    );

    const trades = response.data?.data?.EVM?.DEXTradeByTokens || [];
    console.log(" Fetched trades:", trades);

    return trades.map(
      (entry: BitqueryResponse["data"]["EVM"]["DEXTradeByTokens"][number]) => ({
        hash: entry.Transaction?.Hash,
        time: entry.Block?.Time,
        buyer: entry.Trade?.Buyer,
        seller: entry.Trade?.Seller,
        initiator: entry.Transaction?.From,
        amount: entry.Trade?.Amount,
        amountInUSD: entry.Trade?.AmountInUSD,
        price: entry.Trade?.Price,
        priceInUSD: entry.Trade?.PriceInUSD,
        action: entry.Trade?.Side?.Type,
        bnbAmount: entry.Trade?.Side?.Amount,
        bnbAmountInUSD: entry.Trade?.Side?.AmountInUSD,
      })
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(" Axios error:", error.response?.data || error.message);
      throw new Error("Failed to fetch Ocicat trades");
    } else {
      console.error(" Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
}
import { createClient } from "graphql-ws";
import { useTradeStore } from "@/store/tradeStore";
import toast from "react-hot-toast";
import { CONSTANTS } from "@/web3/config/constants";

const OCICAT_CA = CONSTANTS.OCICAT_TOKEN_ADDRESS.toLowerCase();

const token = process.env.NEXT_PUBLIC_BIT_QUERY_API_KEY!;


const client = createClient({
  url: `wss://streaming.bitquery.io/graphql?token=${token}`,
  on: {
    connected: () => toast.success("✅ WebSocket connected"),
    closed: () => toast.error("❌ WebSocket disconnected"),
  },
});

type OcicatTradePayload = {
  data: {
    EVM: {
      DEXTradeByTokens: {
        Block: { Time: string };
        Transaction?: { Hash?: string; From?: string; To?: string };
        Trade: {
          Buyer?: string;
          Seller?: string;
          Amount: number;
          AmountInUSD: number;
          Price: number;
          PriceInUSD: number;
          Dex: { ProtocolName: string };
          Currency: { Symbol: string; SmartContract: string };
          Side: {
            Amount: number;
            AmountInUSD: number;
            Currency: { Symbol: string; SmartContract: string };
          };
        };
      }[];
    };
  };
};

client.subscribe(
  {
    query: `
      subscription {
  EVM(network: bsc) {
    DEXTradeByTokens(
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
    `,
  },
  {
    next: (data: OcicatTradePayload) => {
      toast("📡 WebSocket data received");

      const tradeData = data?.data?.EVM?.DEXTradeByTokens?.[0];
      if (!tradeData) {
        toast.error("⚠️ No trade data found");
        return;
      }

      const trade = tradeData.Trade;
      const blockTime = tradeData.Block?.Time ?? "";

      const isOcicat =
        trade.Currency?.SmartContract.toLowerCase() === OCICAT_CA.toLowerCase();

      if (!isOcicat) {
        toast("⛔ Ignored non-Ocicat trade");
        return;
      }

      const parsedTrade = {
        hash: tradeData.Transaction?.Hash ?? "N/A",
        time: isNaN(new Date(blockTime).getTime()) ? "N/A" : blockTime,
        buyer: trade.Buyer ?? "N/A",
        seller: trade.Seller ?? "N/A",
        initiator: tradeData.Transaction?.From ?? "N/A",
        amount: trade.Amount ?? 0,
        amountInUSD: trade.AmountInUSD ?? 0,
        price: trade.Price ?? 0,
        priceInUSD: trade.PriceInUSD ?? 0,
        action: (trade.Side?.Currency?.Symbol === "WBNB" ? "buy" : "sell") as
          | "buy"
          | "sell",
        bnbAmount: trade.Side?.Amount ?? 0,
        bnbAmountInUSD: trade.Side?.AmountInUSD ?? 0,
      };

      useTradeStore.getState().addTrade(parsedTrade);

      toast.success(
        `🐾 Ocicat trade: ${
          trade.Currency?.Symbol
        } at $${trade.PriceInUSD.toFixed(4)}`
      );
    },
    error: (err) => {
      toast.error("❌ WebSocket subscription error");
      console.error("Subscription error:", err);
    },
    complete: () => {
      toast("🛑 WebSocket subscription completed");
    },
  }
);

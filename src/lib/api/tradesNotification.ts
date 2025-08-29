import { createClient } from "graphql-ws";
import { useTradeStore } from "@/store/tradeStore";
import toast from "react-hot-toast";

const token = process.env.NEXT_PUBLIC_BIT_QUERY_API_KEY!;

const client = createClient({
  url: `wss://streaming.bitquery.io/graphql?token=${token}`, //  token in URL
  on: {
    connected: () => console.log(" WebSocket connected"),
    closed: () => console.log(" WebSocket closed"),
  },
});

type OcicatTradePayload = {
  data: {
    EVM: {
      DEXTradeByTokens: {
        Block: {
          Time: string;
        };
        Transaction?: {
          Hash?: string;
          From?: string;
          To?: string;
        };
        Trade: {
          Buyer?: string;
          Seller?: string;
          Amount: number;
          AmountInUSD: number;
          Price: number;
          PriceInUSD: number;
          Dex: {
            ProtocolName: string;
          };
          Currency: {
            Symbol: string;
            SmartContract: string;
          };
          Side: {
            Amount: number;
            AmountInUSD: number;
            Currency: {
              Symbol: string;
              SmartContract: string;
            };
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
                Dex: {
                  OwnerAddress: {is: "0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865"}
                }
                Currency: {
                  SmartContract: {is: "0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70"}
                }
              }
            }
          ) {
            Block {
              Time
            }
            Transaction {
              Hash
              From
              To
            }
            Trade {
              Amount
              AmountInUSD
              Price
              PriceInUSD
              Buyer
              Seller
              Dex {
                ProtocolName
              }
              Currency {
                Symbol
                SmartContract
              }
              Side {
                Amount
                AmountInUSD
                Currency {
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
      const tradeData = data?.data?.EVM?.DEXTradeByTokens?.[0];
      if (!tradeData) return;

      const trade = tradeData.Trade;
      const blockTime = tradeData.Block?.Time;

      const isOcicat =
        trade.Currency?.SmartContract.toLowerCase() ===
        "0xe53d384cf33294c1882227ae4f90d64cf2a5db70";

      if (!isOcicat) return;

      console.log("🐾 Ocicat trade:", trade);

      useTradeStore.getState().addTrade({
        hash: tradeData.Transaction?.Hash || "N/A",
        time: blockTime,
        amount: trade.Amount,
        price: trade.PriceInUSD,
        symbol: trade.Currency?.Symbol || "OCI",
      });

      toast.success(
        `New Ocicat trade: ${
          trade.Currency?.Symbol
        } at $${trade.PriceInUSD.toFixed(4)}`
      );
    },
    error: (err) => console.error(" Subscription error:", err),
    complete: () => console.log(" Subscription complete"),
  }
);

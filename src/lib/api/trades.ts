import axios from "axios";

const query = `
{
  ethereum(network: bsc) {
    dexTrades(
      baseCurrency: {is: "0xe53d384cf33294c1882227ae4f90d64cf2a5db70"}
      quoteCurrency: {is: "0x0000000000000000000000000000000000000000"}
      options: {desc: "block.timestamp.unixtime", limit: 20}
    ) {
      transaction {
        hash
      }
      tradeAmount(in: BNB)
      buyAmount
      sellAmount
      buyCurrency {
        symbol
      }
      sellCurrency {
        symbol
      }
      buyer
      seller
      block {
        timestamp {
          iso8601
        }
      }
    }
  }
}
`;

const BITQUERY_API_KEY = "your_api_key_here"; // Replace with your actual key

export async function fetchTrades() {
  try {
    const response = await axios.post(
      "https://graphql.bitquery.io/",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": BITQUERY_API_KEY,
        },
      }
    );

    return response.data.data.ethereum.dexTrades;
  } catch (error) {
    console.error("Error fetching trades:", error);
    return [];
  }
}

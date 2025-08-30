import axios from "axios";

const API_URL =
  "https://api.covalenthq.com/v1/56/tokens/0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70/token_holders_v2/?page-size=100&key=cqt_rQyKMYc4jPP966Kd4r8vGGDt9xMb";

  interface CovalentHolder {
    address: string;
    balance: string;
    contract_decimals: number;
    total_supply: string;
  }


export async function fetchOcicatHolders() {
  try {
    const response = await axios.get(API_URL);
    const items = response.data.data.items;
const holders = (items as CovalentHolder[])
  .slice(0, 29)
  .map((item, index: number) => {
    const balance = Number(item.balance) / Math.pow(10, item.contract_decimals);
    const percentage = (
      (Number(item.balance) / Number(item.total_supply)) *
      100
    ).toFixed(4);

    return {
      rank: index + 1,
      wallet: item.address,
      quantity: balance.toLocaleString("en-US", { maximumFractionDigits: 2 }),
      percentage: `${percentage}%`,
    };
  });


    return holders;
  }  catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error("Failed to fetch holders:", error.message);
  } else {
    console.error("Unexpected error:", String(error));
  }
  return [];
}

}

import { formatUnits, parseUnits } from "ethers";
import toast from "react-hot-toast";


/**
 * Converts a BigNumber or string value from wei (18 decimals) to a readable number string
 * @param value - Value in wei (as BigNumber or string)
 * @param decimals - Defaults to 18
 * @returns string
 */
export function fromWei(value: string | bigint, decimals: number = 18): string {
  return formatUnits(value, decimals);
}

/**
 * Converts a readable number string into wei format (18 decimals)
 * @param value - Human-readable number like "0.5"
 * @param decimals - Defaults to 18
 * @returns string
 */
export function toWei(value: string, decimals: number = 18): string {
  return parseUnits(value, decimals).toString();
}

export function formatWalletAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}

export const formatDaysAgo = (createdAt: string | number | Date): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
};


export const copyToClipboard = async (text :string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (err) {
    toast.error("Failed to copy");
  }
};

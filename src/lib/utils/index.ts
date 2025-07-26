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

export const formatDaysAgo = (createdAt: string): string => {
  if (!createdAt || typeof createdAt !== "string") return "Invalid date";

  const parsedDate = new Date(createdAt.trim());
  if (isNaN(parsedDate.getTime())) {
    console.warn("Unparsable date:", createdAt);
    return "Invalid date";
  }

  const now = new Date();
  const diffMs = now.getTime() - parsedDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));


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

export const formatMarketCap = (cap: number): string => {
  if (cap >= 1_000_000_000) {
    return `$${(cap / 1_000_000_000).toFixed(1)}B+`;
  } else if (cap >= 1_000_000) {
    return `$${(cap / 1_000_000).toFixed(1)}M+`;
  } else if (cap >= 1_000) {
    return `$${(cap / 1_000).toFixed(1)}K+`;
  }
  return `$${cap}+`;
};

export function formatDateToCustom(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month} ${day} ${year} ${hours}:${minutes}:${seconds}`;
}


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

export const formatTimeAgo = (createdAt: string): string => {
  if (!createdAt || typeof createdAt !== "string") return "Invalid date";

  const parsedDate = new Date(createdAt.trim());
  if (isNaN(parsedDate.getTime())) {
    console.warn("Unparsable date:", createdAt);
    return "Invalid date";
  }

  const now = new Date();
  const diffMs = now.getTime() - parsedDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "yesterday";

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

export const formatMarketCap = (
  cap: number | string | undefined | null
): string => {
  if (cap === undefined || cap === null || cap === "") {
    return "$0";
  }

  if (typeof cap === "string") {
    const numericCap = Number(cap);

    if (isNaN(numericCap)) {
      return cap.toString(); // fallback for non-numeric strings
    }

    return `$${numericCap.toLocaleString()}`;
  }

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

export function formatSmallNumber(num: number): string {
  const full = num.toFixed(20); // high precision
  const parts = full.split(".");
  const decimalPart = parts[1] ?? "";

  const leadingZerosMatch = decimalPart.match(/^0*/);
  const leadingZeros = leadingZerosMatch?.[0].length ?? 0;


  if (leadingZeros > 4) {
    const significant = decimalPart
      .slice(leadingZeros)
      .replace(/0+$/, "")
      .slice(0, 3); 

    return `0.0{${leadingZeros}}${significant}`;
  }


  return num.toString();
}


export function formatDateMMDDYYYY(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}




export function generateFakeTxHash() {
  const chars = "abcdef0123456789";
  let hash = "0x";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function formatChangePercent(change: number | string): React.ReactElement {
  let num: number;

  if (typeof change === "number") {
    num = change;
  } else if (typeof change === "string") {
    num = parseFloat(change);
    if (isNaN(num)) num = 0;
  } else {
    num = 0;
  }

  const isPositive = num >= 0;
  const priceColor = isPositive ? "text-green-500" : "text-red-500";
  const sign = isPositive ? "+" : "";

  return <span className={priceColor}>{`${sign}${num.toFixed(2)}%`}</span>;
}



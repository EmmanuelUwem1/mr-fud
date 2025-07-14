import { formatUnits, parseUnits } from "ethers";

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

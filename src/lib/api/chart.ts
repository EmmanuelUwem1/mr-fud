"use server";
import axios from "axios";
const BACKEND_URL = process.env.BACKEND_URL;

export type RawCandleData = {
  time: string; // ISO date string
  open: number;
  high: number;
  low: number;
  close: number;
};

export async function fetchTokenChart(tokenAddress: string) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/chart/${tokenAddress}`
    );

    const rawData = response.data;

    // Format for lightweight-charts
   const formattedData = rawData.map((item: RawCandleData) => {
     const date = new Date(item.time);
     return {
       time: {
         year: date.getUTCFullYear(),
         month: date.getUTCMonth() + 1,
         day: date.getUTCDate(),
       },
       open: item.open,
       high: item.high,
       low: item.low,
       close: item.close,
     };
   });

    console.log("Formatted chart data:", formattedData);
    return formattedData;
  } catch (error) {
    console.error("Error fetching chart data:", (error as Error).message);
    return [];
  }
}

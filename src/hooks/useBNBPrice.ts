"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export function useBNBPrice(refreshInterval = 30000) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
        );
        const bnbPrice = response.data?.binancecoin?.usd;
        if (typeof bnbPrice === "number") {
          setPrice(bnbPrice);
          setError(null);
        } else {
          throw new Error("Invalid price format");
        }
      } catch (err) {
        setError("Failed to fetch BNB price from CoinGecko.");
        setPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice(); // Initial fetch
    const intervalId = setInterval(fetchPrice, refreshInterval);
    return () => clearInterval(intervalId); // Cleanup
  }, [refreshInterval]);

  return { price, loading, error };
}

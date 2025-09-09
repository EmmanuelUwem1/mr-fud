"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { fetchTokens } from "@/lib/api";

interface Token {
  _id: string;
  name: string;
  ticker: string;
  isBonding: boolean;
  description: string;
  bondingProgression: number;
  image: string;
  isAntiGeet: boolean;
  contractAddress: string;
  creatorWallet: string;
  launchType: string;
  telegram: string;
  twitter: string;
  website: string;
  totalSupply: number;
  initialPrice: number;
  volume24h: number;
  currentPrice: number;
  buyCount24h: number;
  sellCount24h: number;
  createdAt: string;
  updatedAt: string;
  marketCap: number;
  __v: number;
}

interface TokensContextType {
  tokens: Token[];
  loading: boolean;
  refetchTokens: () => Promise<void>;
}

const TokensContext = createContext<TokensContextType>({
  tokens: [],
  loading: true,
  refetchTokens: async () => {},
});

export const useTokens = () => useContext(TokensContext);

export const TokensProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  const refetchTokens = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTokens();
      setTokens(data);
    } catch (err) {
      console.error("Token context fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchTokens();
  }, [refetchTokens]);

  return (
    <TokensContext.Provider value={{ tokens, loading, refetchTokens }}>
      {children}
    </TokensContext.Provider>
  );
};

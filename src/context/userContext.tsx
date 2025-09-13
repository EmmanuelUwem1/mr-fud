"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../types";
import { fetchUser } from "@/lib/api";
import { useAccount } from "wagmi";

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const getUser = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetchUser(address);
      const data: UserProfile = res;
      setUser({
        ...data,
        tradingStats: {
          ...data.tradingStats,
          totalVolume: parseFloat(data.tradingStats.totalVolume.toFixed(2)),
          buyVolume: parseFloat(data.tradingStats.buyVolume.toFixed(2)),
          sellVolume: parseFloat(data.tradingStats.sellVolume.toFixed(2)),
        },
        totalRewards: data.totalRewards,
        referralRewards: data.referralRewards,
        tradingRewards: data.tradingRewards,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [address]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

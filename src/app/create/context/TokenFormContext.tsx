"use client";

import { createContext, useContext, useState } from "react";
import { CreateTokenPayload } from "@/lib/api/index";


type TokenFormContextType = {
  payload: CreateTokenPayload;
  setPayload: (updates: Partial<CreateTokenPayload>) => void;
  resetPayload: () => void;
};



const defaultPayload: CreateTokenPayload = {
  name: "",
  ticker: "",
  isAntiGeet: false,
  chain: "BSC",
  description: "",
  creatorWallet: "",
  totalSupply: 0,
  initialPrice: 0,
  image: "",
  contractAddress: "0x928848acf420028944accaaaaccccc",
  twitter: "",
  website: "",
  telegram: "",
};

const TokenFormContext = createContext<TokenFormContextType | undefined>(
  undefined
);

export const TokenFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payload, setPayloadState] =
    useState<CreateTokenPayload>(defaultPayload);

  const setPayload = (updates: Partial<CreateTokenPayload>) => {
    setPayloadState((prev) => ({ ...prev, ...updates }));
  };

  const resetPayload = () => setPayloadState(defaultPayload);

  return (
    <TokenFormContext.Provider value={{ payload, setPayload, resetPayload }}>
      {children}
    </TokenFormContext.Provider>
  );
};

export const useTokenForm = (): TokenFormContextType => {
  const context = useContext(TokenFormContext);
  if (!context)
    throw new Error("useTokenForm must be used within a TokenFormProvider");
  return context;
};

"use client";

import { createContext, useContext, useState } from "react";

// Updated payload type
export type CreateCampaignPayload = {
  name: string;
  goal: number;
  creatorWallet: string;
  image: string;
  startDate: Date | null;
  endDate: Date | null;
  twitter?: string;
  website?: string;
  telegram?: string;
};

// Context type
type CampaignFormContextType = {
  payload: CreateCampaignPayload;
  setPayload: (updates: Partial<CreateCampaignPayload>) => void;
  resetPayload: () => void;
};

// Default values
const defaultPayload: CreateCampaignPayload = {
  name: "",
  goal: 0,
  creatorWallet: "",
  image: "",
  startDate: null,
  endDate: null,
  twitter: "",
  website: "",
  telegram: "",
};

// Create context
const CampaignFormContext = createContext<CampaignFormContextType | undefined>(
  undefined
);

// Provider component
export const CampaignFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payload, setPayloadState] =
    useState<CreateCampaignPayload>(defaultPayload);

  const setPayload = (updates: Partial<CreateCampaignPayload>) => {
    setPayloadState((prev) => ({ ...prev, ...updates }));
  };

  const resetPayload = () => setPayloadState(defaultPayload);

  return (
    <CampaignFormContext.Provider value={{ payload, setPayload, resetPayload }}>
      {children}
    </CampaignFormContext.Provider>
  );
};

// Hook to use the context
export const useCampaignForm = (): CampaignFormContextType => {
  const context = useContext(CampaignFormContext);
  if (!context)
    throw new Error(
      "useCampaignForm must be used within a CampaignFormProvider"
    );
  return context;
};

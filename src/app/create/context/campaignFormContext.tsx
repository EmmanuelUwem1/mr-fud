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
  campaignPayload: CreateCampaignPayload;
  setCampaignPayload: (updates: Partial<CreateCampaignPayload>) => void;
  resetCampaignPayload: () => void;
};

// Default values
const defaultCampaignPayload: CreateCampaignPayload = {
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
  const [campaignPayload, setPayloadState] =
    useState<CreateCampaignPayload>(defaultCampaignPayload);

  const setCampaignPayload = (updates: Partial<CreateCampaignPayload>) => {
    setPayloadState((prev) => ({ ...prev, ...updates }));
  };

  const resetCampaignPayload = () => setPayloadState(defaultCampaignPayload);

  return (
    <CampaignFormContext.Provider
      value={{ campaignPayload, setCampaignPayload, resetCampaignPayload }}
    >
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

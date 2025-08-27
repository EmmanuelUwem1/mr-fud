"use client";

import { createContext, useContext, useState } from "react";

import { CampaignPayload } from "@/lib/api/index";

// Context type
type CampaignFormContextType = {
  campaignPayload: CampaignPayload;
  setCampaignPayload: (updates: Partial<CampaignPayload>) => void;
  resetCampaignPayload: () => void;
};

// Default values
const defaultCampaignPayload: CampaignPayload = {
  coinName: "",
  ticker: "",
  description: "",
  campaignTitle: "",
  campaignBanner: "",
  image: "",
  startDate: "", // ISO date string
  endDate: "",   // ISO date string
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
    useState<CampaignPayload>(defaultCampaignPayload);

  const setCampaignPayload = (updates: Partial<CampaignPayload>) => {
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

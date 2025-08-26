import { createContext, useContext, useEffect, useState } from "react";
import { Campaign } from "@/types";
import { fetchCampaigns } from "../lib/api";

interface CampaignContextType {
  campaigns: Campaign[];
  loading: boolean;
}

const CampaignContext = createContext<CampaignContextType>({
  campaigns: [],
  loading: true,
});

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error loading campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  return (
    <CampaignContext.Provider value={{ campaigns, loading }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => useContext(CampaignContext);

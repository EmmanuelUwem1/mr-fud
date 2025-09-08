"use client"
import Banner from "./components/campaignsBanner";
import { motion } from "framer-motion";
import CampaignsSection from "./components/campaigns-section";
import { CampaignProvider } from "@/context/campaignsContext";



function Page() {
  return (
    <CampaignProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full items-start flex-col justify-start"
      >
        <Banner />
        <CampaignsSection />
      </motion.div>
    </CampaignProvider>
  );
}

export default Page
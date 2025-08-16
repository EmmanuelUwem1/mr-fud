"use client";
import { useParams } from "next/navigation";
import { useTokens } from "@/context/TokensContext";
import Image from "next/image";
import { formatDaysAgo } from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";
import BackButton from "@/components/buttons/backButton";
import { motion } from "framer-motion";
import ProjectStatsCard from "../components/cards/project-stats-card";

export default function CampaignDetailPage() {
  const { id } = useParams();
  const { tokens, loading } = useTokens();

  const campaign = tokens.find((token) => token._id === id);

  if (loading) {
    return (
      <div className="text-center m-auto text-white py-10">Loading campaign...</div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center m-auto text-red-500 py-10">Campaign not found.</div>
    );
  }

  const now = new Date();
  const start = new Date(campaign.createdAt);
  const end = new Date(campaign.createdAt);
  const isLive = now >= start;


    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto py-6 md:py-10 px-4 space-y-6"
      >
        <div className="flex w-full justify-end">
          <BackButton />
        </div>

        <div className="w-full cardbg pb-8 rounded-[28px] relative overflow-hidden">
          {/* Banner */}
          <div className="absolute bg-[#00000094] top-0 left-0 w-full lg:h-80 h-64  overflow-hidden shadow-lg">
            <Image
              src={campaign.image}
              alt={`${campaign.name} banner`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          <div className="w-full px-4 md:px-8 lg:px-10 relative mt-42 lg:mt-60">
            <ProjectStatsCard
              tokenImage={campaign.image}
              tokenName={campaign.name}
              mCap={campaign.marketCap}
              tokenCreatedDate={campaign.createdAt}
              creatorReward="2.5bnb"
              referalReward="2.5bnb"
              isCompleted={isLive}
              twitter={campaign.twitter}
              telegram={campaign.telegram}
              website={campaign.website}
            />

            <div className="space-y-2 py-4">
             <h1 className="font-semibold text-lg">Project Description</h1>
              <p className="text-[#FFFFFF] font-normal text-sm">{campaign.description}</p>
            </div>
            <div className="space-y-2 py-4 font-normal text-sm">
             <h1 className="font-semibold text-lg">Campaign title</h1>
                        <div className="text-white"><span className="font-semibold">{ campaign.name}</span> {campaign.description}</div>
            </div>

          </div>
        </div>
      </motion.div>
    );
}

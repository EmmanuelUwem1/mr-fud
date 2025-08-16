"use client";
import { useParams } from "next/navigation";
import { useTokens } from "@/context/TokensContext";
import Image from "next/image";
import { formatWalletAddress } from "@/lib/utils";
import BackButton from "@/components/buttons/backButton";
import { motion } from "framer-motion";
import ProjectStatsCard from "../components/cards/project-stats-card";
import Avatar from "@/components/avaters/avater-circle";

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
        className="w-full max-w-4xl mx-auto pt-6 md:pt-10 space-y-6"
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
              <div>Created by</div>
              <div className="bg-[#004A7C] gap-2 flex w-[140px] items-center justify-start rounded-full px-2.5 py-1.5">
                <span className="w-full flex">
                  {" "}
                  <Avatar size={29} border borderColor={"#05E02B"} />
                </span>

                <span className="text-xs font-semibold w-full">
                  {formatWalletAddress(campaign.creatorWallet)}
                </span>
              </div>
            </div>

            <div className="space-y-2 py-4">
              <h1 className="font-semibold text-lg">Project Description</h1>
              <p className="text-[#FFFFFF] font-normal text-sm">
                {campaign.description}
              </p>
            </div>
            <div className="space-y-2 py-4 font-normal text-sm">
              <h1 className="font-semibold text-lg">Campaign title</h1>
              <div className="text-white">
                <span className="font-semibold">{campaign.name}</span>{" "}
                {campaign.description}
              </div>
            </div>
          </div>
        </div>
        {/* disclaimer */}
        <div className="font-medium text-xs text-center px-4 sm:px-8 lg:px-16 text-white">
          <span className="text-[#E89B00]">Disclaimer:</span> Investing in tokens
          through this launchpad involves significant risk and may result in
          loss of your investment. We do not provide financial advice or
          guarantee any project’s success. Users must perform their own due
          diligence before participating.
            </div>
            <div className="mt-4 h-[1px] bg-white w-full"></div>
      </motion.div>
    );
}

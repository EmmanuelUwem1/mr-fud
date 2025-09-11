"use client";
import { useState } from "react";
import ReferModal from "../modals/ReferModal";
import { LabelValuePair } from "../labelValuePair";
import BlackBar from "../blackBar";
import { formatMarketCap } from "@/lib/utils";
import ReferButton from "../refer-button";
import RatingStars from "../rating-stars";

interface TokenStatsProps {
  mCap: number | string;
  tokenName: string;
  tokenTicker: string;
  tokenCreatedDate?: string;
  tokenImage: string;
  tokenId?: string;
  volumePerDay?: number | string;
  rating?: number;
  referalCode?: string;
  creatorReward?: string;
  referalReward?: string;
  gainPercent?: number;
  liquidity?: number | string;
}

export default function TokenStatsCard({mCap,tokenName, tokenTicker, tokenCreatedDate, tokenImage, tokenId, volumePerDay, rating, referalCode, creatorReward, referalReward, gainPercent, liquidity }: TokenStatsProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card px-3 sm:px-4 md:px-6 flex w-full justify-center items-center md:justify-between rounded-[18px] gap-3 py-3 box-bg text-white border border-[#38B9FF] flex-nowrap">
      {/* Stats */}
      <div className="flex h-full flex-nowrap items-center gap-0 sm:gap-4 w-full sm:w-[80%] justify-around">
        <LabelValuePair label="Mcap" value={formatMarketCap(mCap)} />
        <BlackBar />
        <LabelValuePair
          label="24h vol"
          value={formatMarketCap(volumePerDay || 0)}
        />

        {liquidity && (
          <span className="hidden md:flex items-center justify-around">
            <BlackBar />
            <LabelValuePair
              label="Liquidity"
              value={formatMarketCap(liquidity || 0)}
            />
          </span>
        )}

        {creatorReward && referalReward && (
          <>
            {" "}
            <BlackBar />
            <LabelValuePair label="Creator reward" value="0 BNB" />
            <BlackBar />
            <LabelValuePair label="Referral" value="0 BNB" />
          </>
        )}
      </div>

      {/* Refer Button */}
      <span className="hidden sm:flex items-center justify-center gap-14">
        {rating && <RatingStars rating={rating} size={30} />}
        {referalCode && <ReferButton setShowModal={setShowModal} />}
      </span>
      {showModal && (
        <ReferModal
          tokenCreatedDate={tokenCreatedDate || ""}
          tokenName={tokenName}
          tokenId={tokenId || ""}
          tokenImage={tokenImage}
          tokenTicker={tokenTicker}
          referalCode={referalCode || ""}
          gainPercent={gainPercent || 0}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

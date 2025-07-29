"use client";
import { useState } from "react";
import ReferModal from "./ReferModal";
import { LabelValuePair } from "./labelValuePair";
import BlackBar from "./blackBar";
import { formatMarketCap } from "@/lib/utils";
import ReferButton from "./refer-button";

interface TokenStatsProps {
  mCap: number;
  tokenName: string;
  tokenTicker: string;
  tokenCreatedDate: string;
  tokenImage: string;
  tokenId: string;
}

export default function TokenStatsCard({mCap,tokenName, tokenTicker, tokenCreatedDate, tokenImage, tokenId }: TokenStatsProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card px-3 sm:px-4 md:px-6 flex w-full justify-center items-center md:justify-between rounded-[18px] gap-3 py-3 bg-[#212121] sm:bg-[#1C1C1C] text-white border border-black flex-wrap md:flex-nowrap">
        {/* Stats */}
        <div className="flex h-full flex-wrap md:flex-nowrap items-center gap-0 sm:gap-4 w-full sm:w-[80%] justify-between md:justify-start">
          <LabelValuePair label="Mcap" value={formatMarketCap(mCap)} />
          <BlackBar />
          <LabelValuePair label="24h vol" value="$1 200,000" />
          <BlackBar />
          <LabelValuePair label="Creator reward" value="2.5 BNB" />
          <BlackBar />
          <LabelValuePair label="Referral" value="2.98 BNB" />
        </div>

        {/* Refer Button */}
        <span className="hidden sm:flex">
          <ReferButton setShowModal={setShowModal} />
        </span>
      </div>

      {showModal && <ReferModal  tokenCreatedDate={tokenCreatedDate} tokenName={ tokenName } tokenId={tokenId} tokenImage={tokenImage} tokenTicker={tokenTicker}  onClose={() => setShowModal(false)} />}
    </>
  );
}

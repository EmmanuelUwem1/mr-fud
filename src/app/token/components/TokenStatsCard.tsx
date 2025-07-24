"use client";
import { useState } from "react";
import Image from "next/image";
import ReferModal from "./ReferModal";
import { LabelValuePair } from "./labelValuePair";
import BlackBar from "./blackBar";

export default function TokenStatsCard({ ...props }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card px-4 md:px-6 flex w-full justify-center items-center md:justify-between rounded-[18px] gap-3 py-3 bg-[#1C1C1C] text-white border border-black flex-wrap md:flex-nowrap">
        {/* Stats */}
        <div className="flex h-full flex-wrap md:flex-nowrap items-center sm:gap-4 justify-start">
          <LabelValuePair label="Mcap" value="$398,897.0" />
          <BlackBar />
          <LabelValuePair label="24h vol" value="$1 200,000" />
          <BlackBar />
          <LabelValuePair label="Creator reward" value="2.5 BNB" />
          <BlackBar />
          <LabelValuePair label="Referral" value="2.98 BNB" />
        </div>

        {/* Refer Button */}
        <div className="flex items-center justify-start gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-medium flex items-center justify-center gap-2 w-40 bg-[#FF3C38] rounded-full p-3 transition-class hover:opacity-90 cursor-pointer"
          >
            Refer a friend
            <span className="relative flex items-center justify-center h-4 w-4">
              <Image
                alt=""
                src="/export.png"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </span>
          </button>
        </div>
      </div>

      {showModal && <ReferModal onClose={() => setShowModal(false)} />}
    </>
  );
}

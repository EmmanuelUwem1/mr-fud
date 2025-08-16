"use client";
import { useState } from "react";

const CoinsTabs = () => {
  const [activeTab, setActiveTab] = useState("held");

  return (
    <div className="w-full pt-4 font-medium text-base">
      <div className="flex gap-4 w-full border-b border-[#2A2A2A]">
        <button
          onClick={() => setActiveTab("held")}
          className={`flex py-3 text-center ${
            activeTab === "held"
              ? "text-[#00C3FE] border-b border-[#00C3FE]"
              : "text-white"
          }`}
        >
          Coins Held
        </button>
        <button
          onClick={() => setActiveTab("created")}
          className={`flex py-3 text-center ${
            activeTab === "created"
              ? "text-[#00C3FE] border-b border-[#00C3FE]"
              : "text-white"
          }`}
        >
          Coins Created
        </button>
      </div>

      <div className="mt-4 text-white">
        {activeTab === "held" ? (
          <p></p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default CoinsTabs;

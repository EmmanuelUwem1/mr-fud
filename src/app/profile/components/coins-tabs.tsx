"use client";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import Image from "next/image";

const CoinsTabs = () => {
  const [activeTab, setActiveTab] = useState("held");
  const { user, loading } = useUser();

  type CreatedToken = {
    contractAddress: string;
    image: string;
    name: string;
    ticker: string;
    // add other properties if needed
  };

  const holdings = user?.tokenHoldings || [];
  const created: CreatedToken[] = (user?.tokensCreated as CreatedToken[]) || [];

  return (
    <div className="w-full pt-4 font-medium text-base">
      {/* Tabs */}
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

      {/* Content */}
      <div className="mt-4 text-white">
        {loading ? (
          <p className="text-sm text-gray-400">Loading tokens...</p>
        ) : activeTab === "held" ? (
          holdings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {holdings.map((holding) => (
                <div
                  key={holding.tokenAddress}
                  className="bg-[#1C1C1C] rounded-lg p-4 flex items-center gap-4 shadow-md"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={holding.token.image}
                      alt={holding.token.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      {holding.token.name} ({holding.token.ticker})
                    </h3>
                    <p className="text-sm text-gray-400">
                      Balance: {holding.balance.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Bought: {holding.totalBought.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Sold: {holding.totalSold.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No coins held.</p>
          )
        ) : created.length > 0 ? (
          <div className="flex flex-col gap-4">
            {created.map((token) => (
              <div
                key={token.contractAddress}
                className="bg-[#1C1C1C] rounded-lg p-4 flex items-center gap-4 shadow-md"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={token.image}
                    alt={token.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">
                    {token.name} ({token.ticker})
                  </h3>
                  <p className="text-sm text-gray-400">
                    Contract: {token.contractAddress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No coins created.</p>
        )}
      </div>
    </div>
  );
};

export default CoinsTabs;

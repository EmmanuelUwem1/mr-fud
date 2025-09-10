"use client";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CoinsTabs = () => {
  const [activeTab, setActiveTab] = useState<"held" | "created">("held");
  const { user, loading } = useUser();

  type CreatedToken = {
    contractAddress: string;
    image: string;
    name: string;
    ticker: string;
  };

  const holdings = user?.tokenHoldings || [];
  const created: CreatedToken[] = (user?.tokensCreated as CreatedToken[]) || [];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

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
          <div className="flex mx-auto justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "held" ? (
              holdings.length > 0 ? (
                <motion.div
                  key="held"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4 max-h-96 overflow-y-auto"
                >
                  {holdings.map((holding) => (
                    <motion.div
                      key={holding.tokenAddress}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={cardVariants}
                      transition={{ duration: 0.3 }}
                      className="bg-[#013253] rounded-lg p-4 flex items-center gap-4"
                    >
                      <div className="relative w-20 h-20 aspect-square rounded-[10px] overflow-hidden">
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
                        <p className="text-xs text-[#87DDFF]">
                          {holding.balance.toLocaleString()}{" "}
                          {holding.token.ticker}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  key="no-held"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-400"
                >
                  No coins held.
                </motion.p>
              )
            ) : created.length > 0 ? (
              <motion.div
                key="created"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4 max-h-96 overflow-y-auto"
              >
                {created.map((token) => (
                  <motion.div
                    key={token.contractAddress}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={cardVariants}
                    transition={{ duration: 0.3 }}
                    className="bg-[#013253] rounded-lg p-4 flex items-center gap-4 shadow-md"
                  >
                    <div className="relative w-20 h-20 aspect-square rounded-[10px] overflow-hidden">
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
                      <p className="text-xs text-gray-400">
                        Contract: {token.contractAddress}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="no-created"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                transition={{ duration: 0.3 }}
                className="text-sm text-gray-400"
              >
                No coins created.
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default CoinsTabs;

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TradesTable from "./tradesTable";
import UserAvatar from "./userAvatar";
import WalletAndDateFlex from "./walletAndDateFlex";
import TopHoldersCard from "./cards/topHoldersCard";

type Comment = {
  id: string;
  text: string;
  replies: Comment[];
};

export default function CommentThread({
  comments,
  isConnected,
  ca,
  createdDate,
  tokenName,
}: {
  comments: Comment[];
  isConnected: boolean;
  ca: string;
    createdDate: string;
   tokenName: string;

}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("Comments");
const [isCollapsed, setIsCollapsed] = useState(false);
const tabs = ["Comments", "Trades"];
const mobileTabs = [...tabs, "Top Holders"];
  const handleReply = (id: string) => setReplyingTo(id);

  const postComment = () => {
    console.log("Post:", newComment);
    setNewComment("");
  };

  return (
    <div className="w-full">
      {/* Header Tabs & Wallet */}
      <div className="">
        {/* Desktop Tabs */}
        <div className="hidden border-b border-[#2A2A2A] lg:flex w-full justify-between items-center">
          <div className="flex gap-4 mb-2 w-fit text-xs font-semibold cursor-pointer">
            <button
              onClick={() => setActiveTab("Comments")}
              className={`flex relative rounded-[6px] px-4 py-3 ${
                activeTab === "Comments" ? "bg-[#520000]" : "text-white"
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab("Trades")}
              className={`flex relative rounded-[6px] px-4 py-3 ${
                activeTab === "Trades" ? "bg-[#520000]" : "text-white"
              }`}
            >
              Trades
            </button>
          </div>
          <div className="w-full flex justify-end items-center gap-4">
            <WalletAndDateFlex ca={ca} createdDate={createdDate} />
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex justify-start items-center border-b border-[#2A2A2A] sm:px-4 py-3 text-xs font-semibold w-full">
          {mobileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-[6px] ${
                activeTab === tab ? "bg-[#520000] text-white" : "text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
          {/* collapse(close down ) icon */}
          <span
            className={`relative flex items-center justify-center h-5 w-5 justify-self-end cursor-pointer transition-class ${isCollapsed ? "-rotate-180" : "rotate-180"}`}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <Image
              alt="collapse toggle"
              src={"/Vector.png"}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
        </div>

        {/* Tab Content */}
        {!isCollapsed && (
          <motion.div
  initial={false}
  animate={{ height: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  className="overflow-hidden"
>
          <AnimatePresence mode="wait">
            {activeTab === "Comments" && (
              <motion.div
                key="comments"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25 }}
                className="p-4 my-4 rounded-[10px] text-xs bg-[#1C1C1C] text-white"
              >
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="mb-4 bg-[#212121] p-3 rounded-md w-full flex justify-between items-center gap-3"
                  >
                    <div className="flex flex-col items-start">
                      <div>
                        <UserAvatar imageUrl="" username="" /> {c.text}
                      </div>
                      {c.replies.map((r) => (
                        <div key={r.id} className="ml-4 text-sm text-gray-300">
                          {r.text}
                        </div>
                      ))}
                    </div>
                    {isConnected && (
                      <button
                        className="bg-[#343434] rounded-[7px] px-4 py-2 font-bold"
                        onClick={() => handleReply(c.id)}
                      >
                        Reply
                      </button>
                    )}
                  </div>
                ))}

                {isConnected ? (
                  <div className="mt-4 flex gap-4 items-center justify-between w-full">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment here..."
                      className="flex-grow bg-[#2A2A2A] text-white px-4 py-2 rounded-md resize-none"
                    />
                    <button
                      className="bg-[#FF3C38] p-3 rounded-full"
                      onClick={postComment}
                    >
                      Add Comment
                    </button>
                  </div>
                ) : (
                  <p>Please connect your wallet to comment or reply.</p>
                )}
              </motion.div>
            )}
            {activeTab === "Trades" && (
              <motion.div
                key="trades"
                className="my-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <TradesTable token={tokenName} />
              </motion.div>
            )}

            {activeTab === "Top Holders" && (
              <motion.div
                key="holders"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-4 mb-4"
              >
                <TopHoldersCard />
              </motion.div>
              )}
          </AnimatePresence>
              </motion.div>
        )}
      </div>
    </div>
  );
}

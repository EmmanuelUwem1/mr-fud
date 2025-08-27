"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TradesTable from "./tradesTable";
import UserAvatar from "./userAvatar";
import WalletAndDateFlex from "./walletAndDateFlex";
import TopHoldersCard from "./cards/topHoldersCard";
import { useAccount } from "wagmi";
import { createComment, fetchComments } from "@/lib/api";
import toast from "react-hot-toast";

type Comment = {
  _id: string;
  content: string;
  tokenAddress: string;
  walletAddress: string;
  userProfile?: {
    profilePicture?: string;
    displayName?: string;
  };
  parentComment: string | null;
  likes: number;
  likedBy: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function CommentThread({
  // comments: initialComments,
  isConnected,
  ca,
  createdDate,
  tokenName,
}: {
  // comments: Comment[];
  isConnected: boolean;
  ca: string;
  createdDate?: string;
  tokenName: string;
}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("Comments");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loadedComments, setLoadedComments] =
    useState<Comment[]>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useAccount();

  const tabs = ["Comments", "Trades"];
  const mobileTabs = [...tabs, "Top Holders"];

  const handleReply = (id: string) => setReplyingTo(id);

  const loadComments = async () => {
    try {
      const data = await fetchComments(ca);
      setLoadedComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ca]);

  const postComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (newComment.length > 100) {
      toast.error("Comment cannot exceed 100 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await createComment({
        tokenAddress: ca,
        walletAddress: address as `0x${string}`,
        content: newComment,
        parentComment: replyingTo || null,
      });

      toast.success("Comment posted!");
      setNewComment("");
      setReplyingTo(null);
      await loadComments();
    } catch (error) {
      toast.error("Failed to post comment");
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const parentComments = (loadedComments ?? []).filter((c) => !c.parentComment);
  const repliesMap = (loadedComments ?? []).reduce<Record<string, Comment[]>>(
    (acc, comment) => {
      if (comment.parentComment) {
        if (!acc[comment.parentComment]) acc[comment.parentComment] = [];
        acc[comment.parentComment].push(comment);
      }
      return acc;
    },
    {}
  );

  return (
    <div className="w-full">
      {/* <Toaster position="top-right" /> */}
      {/* Header Tabs & Wallet */}
      <div className="">
        {/* Desktop Tabs */}
        <div className="hidden border-b border-[#2A2A2A] lg:flex w-full justify-between items-center">
          <div className="flex gap-4 mb-2 w-fit text-xs font-semibold cursor-pointer">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex relative rounded-[6px] px-4 py-3 ${
                  activeTab === tab
                    ? "bg-[#520000] tab-underline"
                    : "text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-full flex justify-end items-center gap-4">
            <WalletAndDateFlex ca={ca} createdDate={createdDate || ""} />
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex justify-start items-center border-b border-[#2A2A2A] sm:px-4 py-3 text-xs font-semibold w-full">
          {mobileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-[6px] ${
                activeTab === tab
                  ? "bg-[#520000] tab-underline text-white"
                  : "text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
          <span
            className={`relative flex items-center justify-center h-5 w-5 justify-self-end cursor-pointer ml-auto transition-class ${
              isCollapsed ? "rotate-0" : "rotate-180"
            }`}
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
            animate={{
              height: isCollapsed ? 0 : "auto",
              opacity: isCollapsed ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
                  {parentComments.map((c) => (
                    <div
                      key={c._id}
                      className="mb-4 bg-[#212121] p-3 rounded-md w-full flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex flex-col items-start">
                          <UserAvatar
                            imageUrl={c.userProfile?.profilePicture || ""}
                            username={c.userProfile?.displayName || ""}
                          />
                          <p>{c.content}</p>
                        </div>
                        {isConnected && (
                          <button
                            className="bg-[#343434] rounded-[7px] px-4 py-2 font-bold"
                            onClick={() => handleReply(c._id)}
                          >
                            Reply
                          </button>
                        )}
                      </div>

                      {repliesMap[c._id]?.map((r) => (
                        <motion.div
                          key={r._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-2 p-2 bg-[#2A2A2A] rounded-md text-gray-300"
                        >
                          <UserAvatar
                            imageUrl={r.userProfile?.profilePicture || ""}
                            username={r.userProfile?.displayName || ""}
                          />
                          <p>{r.content}</p>
                        </motion.div>
                      ))}
                    </div>
                  ))}

                  {isConnected ? (
                    <div className="mt-4 flex gap-4 items-center justify-between w-full">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={
                          replyingTo
                            ? "Write your reply..."
                            : "Write your comment here..."
                        }
                        maxLength={100}
                        className="flex-grow bg-[#2A2A2A] text-white px-4 py-2 rounded-md resize-none"
                      />
                      <button
                        title="send"
                        className="bg-[#FF3C38] py-4 px-4 flex items-center justify-center w-8 h-6 relative rounded-[7px]"
                        onClick={postComment}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-4 h-4 rounded-full border-2                          border-[#FF3C38]border-t-transparent"
                          />
                        ) : (
                          <Image
                            alt=""
                            src={"/send.png"}
                            layout="fill"
                            objectPosition="center"
                            objectFit="contain"
                            className="p-1"
                          />
                        )}
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

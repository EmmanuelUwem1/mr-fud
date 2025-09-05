"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { useUser } from "@/context/userContext";
import TabsHeader from "./comment/TabsHeader";
import CommentSection from "./comment/CommentSection";
import TradesTable from "./tradesTable";
import TopHoldersCard from "./cards/topHoldersCard";
import useComments from "@/hooks/useComments";
import { TokenComment } from "@/types";


export default function CommentThread({
  isConnected,
  ca,
  createdDate,
  tokenName,
}: {
  isConnected: boolean;
  ca: string;
  createdDate?: string;
  tokenName: string;
}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("Comments");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { address } = useAccount();
  const { user } = useUser();

  const tabs = ["Comments", "Trades"];
  const mobileTabs = [...tabs, "Top Holders"];

  const { comments, postComment, isSubmitting, reloadComments } = useComments(ca);
const parentComments = comments.filter((c: TokenComment) => !c.parentComment);

const repliesMap = comments.reduce<Record<string, TokenComment[]>>(
  (acc, comment: TokenComment) => {
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
      <TabsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        tabs={tabs}
        mobileTabs={mobileTabs}
        ca={ca}
        createdDate={createdDate || ""}
      />

      {!isCollapsed && (
        <motion.div
          initial={false}
          animate={{ height: "auto", opacity: 1 }}
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
              >
                <CommentSection
                  parentComments={parentComments}
                  repliesMap={repliesMap}
                  isConnected={isConnected}
                  postComment={postComment}
                  address={String(address)}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}
            {activeTab === "Trades" && (
              <motion.div key="trades" className="my-4">
                <TradesTable token={tokenName} ca={ca} />
              </motion.div>
            )}
            {activeTab === "Top Holders" && (
              <motion.div key="holders" className="py-4">
                <TopHoldersCard tokenCa={ca} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

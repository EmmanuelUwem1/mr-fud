"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
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
  const [activeTab, setActiveTab] = useState("Comments");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { address } = useAccount();

  const {
    comments,
    postComment,
    editComment,
    removeComment,
    reloadComments,
    isSubmitting,
  } = useComments(ca);

  const { parentComments, repliesMap } = useMemo(() => {
    const parents: TokenComment[] = [];
    const replies: Record<string, TokenComment[]> = {};

    for (const comment of comments) {
      if (comment.parentComment) {
        if (!replies[comment.parentComment])
          replies[comment.parentComment] = [];
        replies[comment.parentComment].push(comment);
      } else {
        parents.push(comment);
      }
    }

    return { parentComments: parents, repliesMap: replies };
  }, [comments]);

  return (
    <div className="w-full">
      <TabsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        tabs={["Comments", "Trades"]}
        mobileTabs={["Comments", "Trades", "Top Holders"]}
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
                  editComment={editComment}
                  removeComment={removeComment}
                  reloadComments={reloadComments}
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

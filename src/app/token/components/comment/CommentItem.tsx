"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserAvatar from "../userAvatar";
import { TokenComment } from "@/types";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function CommentItem({
  comment,
  replies,
  isConnected,
  handleReply,
  connectedAddress,
}: {
  comment: TokenComment;
  replies: TokenComment[];
  isConnected: boolean;
  handleReply: (id: string) => void;
  connectedAddress: string;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const isOwner =
    connectedAddress?.toLowerCase() === comment.walletAddress?.toLowerCase();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseDown = () => {
    if (isMobile && isOwner) {
      pressTimer.current = setTimeout(() => {
        setShowOptions(true);
      }, 3000);
    }
  };

  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const toggleReplies = () => {
    if (replies.length > 0) {
      setShowReplies((prev) => !prev);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mb-4 box-bg p-3 rounded-md w-full flex flex-col gap-2"
      onMouseEnter={() => !isMobile && isOwner && setShowOptions(true)}
      onMouseLeave={() => !isMobile && setShowOptions(false)}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div className="flex justify-between items-center gap-3 relative">
        <div className="flex flex-col items-start">
          <UserAvatar
            imageUrl={comment.userProfile?.profilePicture || ""}
            username={comment.userProfile?.displayName || ""}
          />
          <p className="mt-2">{comment.content}</p>
        </div>

        <div className="flex items-center gap-2">
          {replies.length > 0 && (
            <button
              onClick={toggleReplies}
              className="text-gray-200 text-[10px] flex items-center gap-1 opacity-80"
            >
              {showReplies ? (
                <>
                  Hide <ChevronUpIcon className="w-4 h-4" />
                </>
              ) : (
                <>
                  replies ({replies.length}){" "}
                  <ChevronDownIcon className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          {isConnected && (
            <button
              className="bg-[#2F6786] rounded-[7px] px-4 py-2 font-bold"
              onClick={() => handleReply(comment._id)}
            >
              Reply
            </button>
          )}
        </div>

        {/* ✨ Animated Edit/Delete Options */}
        <AnimatePresence>
          {showOptions && isOwner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 right-0 flex gap-4 bg-[#013253] p-2 rounded-md shadow-lg z-10"
            >
              <button title="Edit">
                <PencilSquareIcon className="w-4 h-4 text-[#00C3FE] hover:scale-105 transition-transform" />
              </button>
              <button title="Delete">
                <TrashIcon className="w-4 h-4 text-[#FF3C38] hover:scale-105 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*Animated Replies */}
      <AnimatePresence>
        {showReplies && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 mt-2 flex flex-col gap-2 overflow-hidden"
          >
            {replies.map((r) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="p-2 bg-[#2F6786] rounded-md text-gray-300"
              >
                <UserAvatar
                  imageUrl={r.userProfile?.profilePicture || ""}
                  username={r.userProfile?.displayName || ""}
                />
                <p>{r.content}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import useComments from "@/hooks/useComments";
import { motion, AnimatePresence } from "framer-motion";
import UserAvatar from "../userAvatar";
import { TokenComment } from "@/types";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import CommentForm from "./CommentForm";

export default function CommentItem({
  comment,
  replies,
  isConnected,
  connectedAddress,
  editComment,
  removeComment,
  postReply,
  reloadComments,
  isSubmitting,
  isReply=false,
}: {
  comment: TokenComment;
  replies: TokenComment[];
  isConnected: boolean;
  connectedAddress: string;
  editComment: (id: string, wallet: string, content: string) => Promise<void>;
  removeComment: (id: string, wallet: string) => Promise<void>;
  postReply: (
    content: string,
    isReply: boolean,
    address: string,
    parentId?: string | null
  ) => Promise<void>;
  reloadComments: () => Promise<void>;
    isSubmitting: boolean;
    isReply?: boolean;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  const isOwner =
    connectedAddress?.toLowerCase() === comment.walletAddress?.toLowerCase();

  const { postComment } = useComments(
    comment.tokenAddress
  );


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleEditSubmit = async (content: string) => {
    await editComment(comment._id, connectedAddress, content);
    setIsEditing(false);
  };

  const handleReplySubmit = async (content: string) => {
    await postComment(content, true, connectedAddress, comment._id);
    setIsReplying(false);
    setShowReplies(true);
  };

  const handleDelete = async () => {
    await removeComment(comment._id, connectedAddress);
  };

  return (
    <motion.div
      ref={itemRef}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`${
        isReply ? "bg-[#2F6786] mb-2" : "mb-4 box-bg"
      } p-3 rounded-md w-full flex flex-col gap-2`}
      onClick={() => setShowActions(true)}
    >
      <div className="flex justify-between items-center gap-3 relative">
        <div className="flex flex-col items-start">
          <UserAvatar
            imageUrl={comment.userProfile?.profilePicture || ""}
            username={comment.userProfile?.displayName || ""}
          />
          {isEditing ? (
            <CommentForm
              mode="edit"
              initialContent={comment.content}
              onSubmit={handleEditSubmit}
              isSubmitting={isSubmitting}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <p className="mt-2">{comment.content}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies((prev) => !prev)}
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

          {isConnected && !isEditing && !isReply && (
            <button
              className="bg-[#2F6786] rounded-[7px] px-4 py-2 font-bold"
              onClick={() => setIsReplying(true)}
            >
              Reply
            </button>
          )}
        </div>

        <AnimatePresence>
          {showActions && isOwner && !isEditing && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-1/2 mx-auto flex gap-4 bg-[#013253] p-2 rounded-md shadow-lg z-10"
            >
              <button title="Edit" onClick={() => setIsEditing(true)}>
                <PencilSquareIcon className="w-4 h-4 text-[#00C3FE] hover:scale-105 transition-transform" />
              </button>
              <button title="Delete" onClick={handleDelete}>
                <TrashIcon className="w-4 h-4 text-[#FF3C38] hover:scale-105 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showReplies && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            {replies.map((r) => (
              <CommentItem
                key={r._id}
                comment={r}
                replies={[]}
                isConnected={isConnected}
                connectedAddress={connectedAddress}
                editComment={editComment}
                removeComment={removeComment}
                postReply={postReply}
                reloadComments={reloadComments}
                isSubmitting={isSubmitting}
                isReply={true}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReplying && (
          <CommentForm
            mode="reply"
            onSubmit={handleReplySubmit}
            isSubmitting={isSubmitting}
            onClose={() => setIsReplying(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

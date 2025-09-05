"use client";
import { TokenComment } from "@/types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useState } from "react";

export default function CommentSection({
  parentComments,
  repliesMap,
  isConnected,
  postComment,
  isSubmitting,
  address,
}: {
  parentComments: TokenComment[];
  repliesMap: Record<string, TokenComment[]>;
  isConnected: boolean;
  postComment: (
    content: string,
    isReply: boolean,
    address: string,
    parentId?: string | null
  ) => void;
  isSubmitting: boolean;
  address: string;
}) {
  const [replyTo, setReplyTo] = useState<string | null>(null);

  return (
    <div className="p-4 my-4 rounded-[10px] text-xs bg-[#013253] text-white">
      {parentComments.map((c) => (
          <CommentItem
            connectedAddress={address}
          key={c._id}
          comment={c}
          replies={repliesMap[c._id] || []}
          isConnected={isConnected}
          handleReply={setReplyTo} 
        />
      ))}

      {isConnected ? (
        <CommentForm
          postComment={postComment}
          isSubmitting={isSubmitting}
          address={address}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
        />
      ) : (
        <p>Please connect your wallet to comment or reply.</p>
      )}
    </div>
  );
}

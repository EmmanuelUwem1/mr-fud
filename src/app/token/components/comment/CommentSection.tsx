"use client";
import { TokenComment } from "@/types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

export default function CommentSection({
  parentComments,
  repliesMap,
  isConnected,
  postComment,
  editComment,
  removeComment,
  reloadComments,
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
  ) => Promise<void>;
  editComment: (id: string, wallet: string, content: string) => Promise<void>;
  removeComment: (id: string, wallet: string) => Promise<void>;
  reloadComments: () => Promise<void>;
  isSubmitting: boolean;
  address: string;
}) {
  return (
    <div className="p-4 my-4 rounded-[10px] text-xs bg-[#013253] text-white">
      {parentComments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          replies={repliesMap[comment._id] || []}
          isConnected={isConnected}
          connectedAddress={address}
          editComment={editComment}
          removeComment={removeComment}
          postReply={postComment}
          reloadComments={reloadComments}
          isSubmitting={isSubmitting}
        />
      ))}

      {isConnected ? (
        <CommentForm
          mode="add"
          onSubmit={(content) => postComment(content, false, address)}
          isSubmitting={isSubmitting}
        />
      ) : (
        <p>Please connect your wallet to comment or reply.</p>
      )}
    </div>
  );
}

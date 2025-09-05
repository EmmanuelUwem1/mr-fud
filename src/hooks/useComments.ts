"use client";
import { useEffect, useState } from "react";
import { fetchComments, createComment } from "@/lib/api";
import toast from "react-hot-toast";
import { TokenComment } from "@/types";

export default function useComments(ca: string) {
  const [comments, setComments] = useState<TokenComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = async () => {
    try {
      const data = await fetchComments(ca);
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ca]);

  const postComment = async (
    content: string,
    isReply: boolean,
    address: string,
    parentId?: string | null
  ) => {
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (content.length > 100) {
      toast.error("Comment cannot exceed 100 characters");
      return;
    }

    if (!address) {
      toast.error("Wallet address is missing");
      return;
    }

    setIsSubmitting(true);

    try {
      await createComment({
        tokenAddress: ca,
        walletAddress: address as `0x${string}`,
        content,
        parentComment: isReply ? parentId || null : null,
      });

      toast.success("Comment posted");
      await loadComments();
    } catch (error) {
      toast.error("Failed to post comment");
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    comments,
    postComment,
    isSubmitting,
    reloadComments: loadComments,
  };
}

"use client";
import { useEffect, useState } from "react";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "@/lib/api";
import toast from "react-hot-toast";
import { TokenComment } from "@/types";

export default function useComments(ca: string) {
  const [comments, setComments] = useState<TokenComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = async (): Promise<void> => {
    try {
      const data = await fetchComments(ca);
      setComments([...data]); // clone to ensure reactivity
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
  ): Promise<void> => {
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (content.length > 300) {
      toast.error("Comment cannot exceed 300 characters");
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

  const editComment = async (
    id: string,
    wallet: string,
    newContent: string
  ): Promise<void> => {
    if (!newContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateComment(id, wallet, newContent);
      toast.success("Comment updated");
      await loadComments();
    } catch (error) {
      toast.error("Failed to update comment");
      console.error("Failed to update comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeComment = async (id: string, wallet: string): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await deleteComment(id, wallet);
      if (response?.success) {
        toast.success("Comment deleted");
        await loadComments();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Failed to delete comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    comments,
    postComment,
    editComment,
    removeComment,
    isSubmitting,
    reloadComments: loadComments,
  };
}

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Avatar from "@/components/avaters/avater-circle";

export default function CommentForm({
  mode = "add",
  initialContent = "",
  onSubmit,
  isSubmitting,
  onClose,
}: {
  mode?: "add" | "reply" | "edit";
  initialContent?: string;
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
  onClose?: () => void;
}) {
  const [commentText, setCommentText] = useState(initialContent);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText("");
    onClose?.();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={formRef}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className={`mt-4 w-full flex gap-4 items-center justify-between ${
          mode !== "add" ? "bg-[#013253] p-3 rounded-md" : ""
        }`}
      >
        <Avatar border borderColor={mode === "reply" ? "#00C3FE" : "#FF0E32"} />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={
            mode === "reply"
              ? "Write your reply..."
              : mode === "edit"
              ? "Edit your comment..."
              : "Add a comment..."
          }
          maxLength={300}
          className="flex-grow border-b border-[#2F6786] text-white pr-4 pl-0 py-2 resize-none bg-transparent"
        />
        <button
          title="send"
          className={`py-4 px-4 flex items-center justify-center w-8 h-6 relative rounded-[7px] ${
            mode === "reply" ? "bg-[#00C3FE]" : "bg-[#FF3C38]"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
            </div>
          ) : (
            <Image
              alt="send"
              src={"/send.png"}
              layout="fill"
              objectPosition="center"
              objectFit="contain"
              className="p-1"
            />
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

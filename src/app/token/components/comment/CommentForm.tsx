"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Avatar from "@/components/avaters/avater-circle";

export default function CommentForm({
  postComment,
  isSubmitting,
  address,
  replyTo,
  setReplyTo,
}: {
  postComment: (
    content: string,
    isReply: boolean,
    address: string,
    parentId?: string | null
  ) => void;
  isSubmitting: boolean;
  address: string;
  replyTo: string | null;
  setReplyTo: (val: string | null) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        replyTo &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setReplyTo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [replyTo]);

  const handleSubmit = () => {
    postComment(commentText, !!replyTo, address, replyTo);
    setCommentText("");
    setReplyTo(null);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={inputRef}
        key={replyTo ? "reply" : "comment"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`mt-4 w-full flex gap-4 items-center justify-between ${
          replyTo ? "bg-[#013253] p-3 rounded-md" : ""
        }`}
      >
        <Avatar border borderColor={replyTo ? "#00C3FE" : "#FF0E32"} />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={replyTo ? "Write your reply..." : "Add a comment..."}
          maxLength={100}
          className="flex-grow border-b border-[#2F6786] text-white pr-4 pl-0 py-2 resize-none bg-transparent"
        />
        <button
          title="send"
          className={`py-4 px-4 flex items-center justify-center w-8 h-6 relative rounded-[7px] ${
            replyTo ? "bg-[#00C3FE]" : "bg-[#FF3C38]"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center h-20">
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

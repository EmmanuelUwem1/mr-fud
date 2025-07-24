"use client";
import { useState } from "react";
import Image from "next/image";
import { copyToClipboard } from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";
import TradesTable from "./tradesTable";
import UserAvatar from "./userAvatar";
type Comment = {
  id: string;
  text: string;
  replies: Comment[];
};

export default function CommentThread({
  comments,
  isConnected,
  ca,
  createdDate,
}: {
  comments: Comment[];
    isConnected: boolean;
    ca: string;
    createdDate: string;
}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
 const [activeTab, setActiveTab] = useState("Comments");
  const handleReply = (id: string) => setReplyingTo(id);

  const postComment = () => {
    // Handle post comment logic
    console.log("Post:", newComment);
    setNewComment("");
  };

     
  

  return (
    <div>
      <div className="flex w-full justify-between border-b border-[#2A2A2A] items-center">
        <div className="flex gap-4 mb-2 w-fit text-xs font-semibold cursor-pointer">
          <button
            onClick={() => setActiveTab("Comments")}
            className={`flex relative cursor-pointer rounded-[6px] px-4 py-3 text-center ${
              activeTab === "Comments"
                ? "bg-[#520000] tab-active"
                : "text-white"
            }`}
          >
            Comments
          </button>
          <button
            onClick={() => setActiveTab("Trades")}
            className={`flex cursor-pointer relative rounded-[6px] px-4 py-3 text-center ${
              activeTab === "Trades" ? "bg-[#520000] tab-active" : "text-white"
            }`}
          >
            Trades
          </button>
        </div>
        <div className="flex items-center flex-wrap sm:flex-nowrap font-semibold justify-end gap-3">
          <button
            onClick={() => copyToClipboard(ca)}
            className="text-xs relative flex items-center justify-center gap-2 cursor-pointer bg-[#2A2A2A] rounded-[5px] px-3 py-2"
          >
            {formatWalletAddress(ca)}
            <span className="relative h-3.5 w-4">
              <Image
                src={"/copy-white.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="copy"
              />
            </span>
          </button>
          <button className="text-xs relative flex items-center justify-center gap-2 cursor-pointer bg-[#2A2A2A] rounded-[5px] px-3 py-2">
            <span className="relative h-3.5 w-4">
              <Image
                src={"/clock.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="clock"
              />
            </span>
            {createdDate}
          </button>
        </div>
      </div>
      {activeTab === "Comments" ? (
        <div className="p-4 my-4 rounded-[10px] text-xs relative font-normal bg-[#1C1C1C] text-white">
          {comments.map((c) => (
            <div
              key={c.id}
              className="mb-4 bg-[#212121] p-3 rounded-md w-full relative  flex items-center justify-between gap-3"
            >
              <div className="flex flex-col items-start justify-start">
                {" "}
                <div><UserAvatar imageUrl="" username="" /> {c.text}</div>
                {c.replies.map((r) => (
                  <div key={r.id} className="ml-4 text-sm text-gray-300">
                    {r.text}
                  </div>
                ))}
              </div>
              {isConnected ? (
                <button className="bg-[#343434] rounded-[7px] px-4 py-2 cursor-pointer font-bold" onClick={() => handleReply(c.id)}>
                  Reply
                </button>
              ) : null}
            </div>
          ))}

          {isConnected ? (
            <div className="mt-4 w-full gap-4 flex items-center justify-between">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                title="Comment input"
              />
              <button
                className="bg-[#FF3C38] p-3 rounded-full"
                onClick={postComment}
              >
                Add Comment
              </button>
            </div>
          ) : (
            <p>Please connect your wallet to comment or reply.</p>
          )}
        </div>
      ) : (
        <TradesTable />
      )}
    </div>
  );
}

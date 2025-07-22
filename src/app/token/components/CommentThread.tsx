import { useState } from "react";

type Comment = {
  id: string;
  text: string;
  replies: Comment[];
};

export default function CommentThread({
  comments,
  isConnected,
}: {
  comments: Comment[];
  isConnected: boolean;
}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleReply = (id: string) => setReplyingTo(id);

  const postComment = () => {
    // Handle post comment logic
    console.log("Post:", newComment);
    setNewComment("");
  };

  return (
    <div className="card p-4 rounded-md bg-[#1C1C1C] text-white">
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {comments.map((c) => (
        <div key={c.id} className="mb-4">
          <p>{c.text}</p>
          {c.replies.map((r) => (
            <div key={r.id} className="ml-4 text-sm text-gray-300">
              {r.text}
            </div>
          ))}
          {isConnected ? (
            <button onClick={() => handleReply(c.id)}>Reply</button>
          ) : null}
        </div>
      ))}

      {isConnected ? (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            title="Comment input"
          />
          <button onClick={postComment}>Add Comment</button>
        </div>
      ) : (
        <p>Please connect your wallet to comment or reply.</p>
      )}
    </div>
  );
}

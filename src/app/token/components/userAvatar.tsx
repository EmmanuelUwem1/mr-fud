import Avatar from "@/components/avaters/avater-circle";

export default function UserAvatar({
  imageUrl,
  username,
  noUsername = false,

}: {
  imageUrl: string;
    username: string;
  noUsername?: boolean;

}) {
  return (
    <div className="flex items-center space-x-2 py-1">
      <Avatar src={imageUrl} alt={`${username} avatar`} size={20} />
      {(!noUsername === false) && (
        <div>
          <div className="font-bold text-xs text-white">
            {username || "87mK0"}
          </div>
        </div>
      )}
    </div>
  );
}
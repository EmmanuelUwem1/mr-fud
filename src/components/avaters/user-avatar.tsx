"use client";

import Image from "next/image";

type UserAvatarProps = {
  imageUrl: string;
  username: string;
  subtitle: string;
};

const UserAvatar = ({ imageUrl, username, subtitle }: UserAvatarProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-10 h-10 bg-white rounded-full">
        {/* <Image
          src={imageUrl}
          alt={`${username} avatar`}
          layout="fill"
          className="rounded-full object-cover"
          priority
        /> */}
      </div>
      <div>
        <div className="font-bold text-sm text-white">{username}</div>
        <div className="text-xs text-white/60">{subtitle}</div>
      </div>
    </div>
  );
};

export default UserAvatar;

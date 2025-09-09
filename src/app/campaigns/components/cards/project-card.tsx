"use client";
import Image from "next/image";
import { useState } from "react";

type ProjectProfileCardProps = {
  imageUrl: string;
  altText?: string;
};

const ProjectProfileCard: React.FC<ProjectProfileCardProps> = ({
  imageUrl,
  altText = "Project Profile",
}) => {
  const [retryCount, setRetryCount] = useState(0);


const handleBannerError = () => {
  if (retryCount < 5) {
    const delay = 1000 * Math.pow(2, retryCount); // 1s, 2s, 4s, 8s, 16s
    setTimeout(() => {
      setRetryCount((prev) => prev + 1);
    }, delay);
  }
};


  const cacheBuster = retryCount ? `?retry=${retryCount}` : "";
  const bannerSrc = `${imageUrl}${cacheBuster}`;


  return (
    <div className="w-48 h-48 aspect-square rounded-[12px] bg-gradient-to-r from-[#F7E436] to-[#05E02B] flex items-center justify-center p-[6px]">
      <div className="w-full h-full rounded-[12px] bg-white flex items-center relative justify-center overflow-hidden">
       <Image
                 src={bannerSrc}
                 alt={` banner`}
                 layout="fill"
                 objectFit="cover"
                 objectPosition="top"
                 className="rounded-t-[15px]"
                 onError={handleBannerError}
               />
      </div>
    </div>
  );
};

export default ProjectProfileCard;

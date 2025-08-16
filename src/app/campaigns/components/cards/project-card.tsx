"use client";
import Image from "next/image";

type ProjectProfileCardProps = {
  imageUrl: string;
  altText?: string;
};

const ProjectProfileCard: React.FC<ProjectProfileCardProps> = ({
  imageUrl,
  altText = "Project Profile",
}) => {
  return (
    <div className="w-48 h-48 aspect-square rounded-[12px] bg-gradient-to-r from-[#F7E436] to-[#05E02B] flex items-center justify-center p-[6px]">
      <div className="w-full h-full rounded-[12px] bg-white flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-[12px] object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProjectProfileCard;

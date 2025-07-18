"use client";
import Image from "next/image";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number; // default to 40
  border?: boolean;
  borderColor?: string; // optional custom border color
  bg?:string
};

export default function Avatar({
  src,
  alt = "User avatar",
  size = 40,
  border = false,
  bg = "white",
  borderColor = "#DBD9FF",
}: AvatarProps) {
  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center relative ${
        border ? "border" : ""
      }`}
      style={{
        width: size,
        height: size,
        backgroundColor: bg, 
        borderColor: border ? borderColor : undefined,
        borderWidth: border ? "2px" : undefined,
        borderStyle: border ? "solid" : undefined,
      }}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-cover rounded-full"
        />
      )}
    </div>
  );
}


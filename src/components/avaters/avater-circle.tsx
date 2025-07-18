"use client";
import Image from "next/image";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number; // default to 40
  border?: boolean;
  borderColor?: string; // optional custom border color
};

export default function Avatar({
  src,
  alt = "User avatar",
  size = 40,
  border = false,
  borderColor = "#DBD9FF",
}: AvatarProps) {
  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-white ${
        border ? "border" : ""
      }`}
      style={{
        width: size,
        height: size,
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

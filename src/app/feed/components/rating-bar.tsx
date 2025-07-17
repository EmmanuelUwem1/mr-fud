"use client";
import React from "react";
import Image from "next/image";

type RatingBarProps = {
  rating: number;
};

export default function RatingBar({ rating }: RatingBarProps) {
  const position = Math.min(100, Math.max(0, rating));

  return (
    <div className="relative w-full h-4 bg-[#FFFFFF] rounded-full">
      {/* Gradient fill */}
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: `${position}%`,
          background: "linear-gradient(to right, #FA3C39, #FFA393)",
          borderRadius: "9999px",
          transition: "width 0.5s ease-in-out",
        }}
      />

      {/* Rating text */}
      <span className="absolute left-2 top-1/2 -translate-y-1 text-[8px] font-medium text-white z-10">
        {rating}%
      </span>

      {/* Floating image */}
      <span
        className="absolute top-0 -translate-y-2 w-8 h-8"
        style={{
          left: `calc(${position}% - 10px)`,
          transition: "left 0.5s ease-in-out",
        }}
      >
        <Image
          src="/orangecat_head 2.png"
          alt="rating-indicator"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </span>
    </div>
  );
}

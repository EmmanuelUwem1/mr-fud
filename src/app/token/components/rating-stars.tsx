"use client";
import Image from "next/image";

type RatingStarsProps = {
    rating: number; // from 0 to 3
    size: number;
};

export default function RatingStars({ rating, size }: RatingStarsProps) {
  const maxStars = 3;
  const stars = Array.from({ length: maxStars }, (_, i) => i < rating);

  return (
    <div className="flex gap-1">
      {stars.map((isRated, index) => (
        <Image
          key={index}
          src={isRated ? "/star.png" : "/Vector (Stroke).png"}
          alt={isRated ? "Rated star" : "Unrated star"}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}

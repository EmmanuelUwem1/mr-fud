"use client";
import Image from "next/image";

type FeaturedCardProps = {
  title: string;
  price: string;
  chain: string;
  ca: string; // contract address
  image: string;
};

export default function FeaturedCard({
  title,
  price,
  chain,
  ca,
  image,
}: FeaturedCardProps) {
  return (
    <div className="relative w-full rounded-[20px] overflow-hidden flex flex-col justify-between px-6 py-6 bg-[#181818] text-white shadow-md aspect-[4/2] sm:aspect-[5/2]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-[20px] z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col gap-3 justify-between h-full">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm font-light">
          Price: <span className="font-medium">{price}</span>
        </p>
        <p className="text-sm font-light">
          Chain: <span className="font-medium">{chain}</span>
        </p>
        <p className="text-xs font-light break-all">
          CA: <span className="font-medium">{ca}</span>
        </p>

        <button className="mt-4 w-fit px-5 py-2 bg-[#FF0E32] text-white text-sm font-semibold rounded-full hover:opacity-90 transition duration-200">
          View Details
        </button>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";

type FeaturedCardProps = {
  title: string;
  price: string;
  chain: string;
  ca: string;
  image: string;
  type?: "a" | "b";
};

export default function FeaturedCard({
  title,
  price,
  chain,
  ca,
  image,
  type = "a",
}: FeaturedCardProps) {
  return (
    <div
      className={`card-gradient-wrapper ${type === "b" ? "card-type-b" : ""}`}
    >
      <div className="w-full bg-[#0C0C0C] rounded-[15px] overflow-hidden flex gap-4 justify-between p-4 text-white">
        {/* Left: Image */}
        <div className="w-24 h-24 rounded-[10px] overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={title}
            width={96}
            height={96}
            className="object-cover rounded-[10px]"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-2 justify-between w-full">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm font-light">
            Price: <span className="font-medium">{price}</span>
          </p>
          <p className="text-sm font-light">
            Chain: <span className="font-medium">{chain}</span>
          </p>
          <p className="text-xs font-light break-all">
            CA: <span className="font-medium">{ca}</span>
          </p>

         
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import BannerTokenCard from "./cards/bannerCard";
import { useTokens } from "@/context/TokensContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Banner() {
  const { tokens, loading } = useTokens();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const randomThree = tokens.sort(() => 0.5 - Math.random()).slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % randomThree.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [randomThree.length]);

  return (
    <section className="relative py-12 w-full lg:h-80 mt-32 rounded-[20px] flex flex-col items-center justify-center border-[1px] border-[#FF3C38]">
      {/* Background Image */}
      <Image
        src="/Group 4.png"
        alt="Banner background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="absolute inset-0 z-0 rounded-[20px]"
      />

      {/* Overlay Gradient */}
      <div className="absolute rounded-[20px] inset-0 bg-gradient-to-t from-[#A20B0B]/80 to-[#3C0404]/30 z-10" />

      {/* Loader */}
      {loading ? (
        <div className="z-20 text-white text-sm animate-pulse">
          Loading tokens...
        </div>
      ) : (
        <>
          {/* Carousel for mobile */}
          <div className="z-20 block md:hidden w-full max-w-sm px-6 sm:px-10">
            <div className="transition-all duration-500">
              <Link href={`/token/${randomThree[carouselIndex]._id}`}>
                <BannerTokenCard
                  ticker={randomThree[carouselIndex].ticker}
                  name={randomThree[carouselIndex].name}
                  ca={randomThree[carouselIndex].contractAddress}
                  marketCap={
                    randomThree[carouselIndex].currentPrice *
                    randomThree[carouselIndex].totalSupply
                  }
                  createdBy={randomThree[carouselIndex].creatorWallet}
                  rating={80}
                  image={randomThree[carouselIndex].image}
                  id={randomThree[carouselIndex]._id}
                  createdTime={randomThree[carouselIndex].createdAt}
                />
              </Link>
            </div>
          </div>

          {/* Static layout for md+ screens */}
          <div className="z-20 hidden md:flex gap-4 items-center justify-center w-full px-6 sm:px-10">
            {randomThree.map((token, index) => (
              <Link
                href={`/token/${token._id}`}
                key={token._id || index}
                className={`transition-transform token-gradient-wrapper h-full relative duration-500 w-full max-w-sm ${
                  index === 1 ? "md:-top-20" : ""
                }`}
              >
                <BannerTokenCard
                  ticker={token.ticker}
                  name={token.name}
                  ca={token.contractAddress}
                  marketCap={token.currentPrice * token.totalSupply}
                  createdBy={token.creatorWallet}
                  rating={80}
                  image={token.image}
                  id={token._id}
                  createdTime={token.createdAt}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

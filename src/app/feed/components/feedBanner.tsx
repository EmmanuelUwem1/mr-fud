"use client";
import Image from "next/image";
import BannerTokenCard from "./cards/bannerCard";
import { useTokens } from "@/context/TokensContext";
import Link from "next/link";

export default function Banner() {
  const { tokens, loading } = useTokens();

  const randomThree = tokens.slice(0, 3);


  return (
    <section className="relative py-12 w-full min-h-[27rem] sm:mt-20 rounded-[20px] flex flex-col items-center justify-center border-[1px] border-[#FF3C38] bg-pattern">
      {/* <Image
        src="/Group 4.png"
        alt="Banner background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="absolute inset-0 z-0 rounded-[20px]"
      /> */}

      {/* Overlay Gradient */}
      <div className="absolute rounded-[20px] inset-0 bg-gradient-to-t from-[#A20B0B]/80 to-[#3C0404]/30 z-10" />

      {/* Loader */}
      {loading ? (
        <div className="z-20 text-white text-sm animate-pulse">
          Loading tokens...
        </div>
      ) : (
        <>
          {/*  for mobile */}
          <div className="z-20 md:hidden items-center justify-center w-full flex flex-wrap px-6 gap-4 sm:px-10">
            <div className="transition-all duration-500 items-center justify-center w-full flex flex-wrap gap-4 ">
              {randomThree.map((token) => (
                <Link
                  key={token._id}
                  href={`/token/${token._id}`}
                  className="transition-transform token-gradient-wrapper h-full relative duration-500 w-full max-w-[20rem]"
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
          </div>

          {/* layout for md+ screens */}
          <div className="z-20 hidden md:flex gap-4 items-center justify-center w-full px-6 lg:gap-8 sm:px-10">
            {randomThree.map((token, index) => (
              <Link
                href={`/token/${token?._id}`}
                key={token?._id || index}
                className={`transition-transform token-gradient-wrapper h-full relative duration-500 w-full max-w-[20rem] ${
                  index === 1 ? "md:-top-20" : ""
                }`}
              >
                <BannerTokenCard
                  ticker={token?.ticker}
                  name={token?.name}
                  ca={token?.contractAddress}
                  marketCap={token?.currentPrice * token?.totalSupply}
                  createdBy={token?.creatorWallet}
                  rating={80}
                  image={token?.image}
                  id={token?._id}
                  createdTime={token?.createdAt}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

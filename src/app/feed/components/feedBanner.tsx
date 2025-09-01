"use client";
import BannerTokenCard from "./cards/bannerCard";
import TokenCard from "./cards/token";
import { useTokens } from "@/context/TokensContext";
import Link from "next/link";
import { useRipple } from "@/hooks/useRipple";

export default function Banner() {
  const { tokens, loading } = useTokens();
  const ripple = useRipple();

  const randomThree = tokens.slice(0, 3);


  return (
    <section className="relative max-sm:p-3 sm:py-12 w-full md:h-[373px] sm:mt-20 rounded-[20px] flex flex-col items-center justify-center bg-pattern">
      {/* <Image
        src="/Group 4.png"
        alt="Banner background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="absolute inset-0 z-0 rounded-[20px]"
      /> */}

      {/* Overlay Gradient
      <div className="absolute rounded-[20px] inset-0 bg-gradient-to-t from-[#A20B0B]/80 to-[#3C0404]/30 z-10" /> */}

      {/* <div className="absolute rounded-[20px] inset-0 bg-white/40 z-10" /> */}
      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400" />
        </div>
      ) : (
        <>
          <div className="sm:hidden flex w-full items-center justify-center  my-3">
            <Link
              href={"/create"}
                className="bg-[#00C3FE] w-[80%] rounded-full text-center py-3.5 text-xs font-semibold text-white relative overflow-hidden"
                onClick={ripple}
            >
              Create a club
            </Link>
          </div>
          {/*  for mobile */}
          <div className="z-20 md:hidden items-center justify-center w-full flex flex-wrap gap-4 sm:px-10">
            <div className="transition-all duration-500 items-center justify-center w-full flex flex-wrap gap-4 ">
              {randomThree.map((token) => (
                <Link
                  key={token._id}
                  href={`/token/${token._id}`}
                  className="transition-transform h-full relative duration-500 w-full max-w-[20rem]"
                >
                  <TokenCard
                    className="card-gradient-wrapper"
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
                className={`transition-transform md:-top-4 h-full relative duration-500 w-full max-w-[20rem] ${
                  index === 1 ? "md:-top-28" : ""
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

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
    <section className="relative max-sm:p-3 sm:py-12 w-full md:h-[373px] sm:mt-36 rounded-[20px] flex flex-col items-center justify-center bg-pattern">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
        </div>
      ) : (
        <>
          <div className="sm:hidden flex w-full items-center justify-center  my-3">
            <Link
              href={"/create/token"}
              className="bg-[#00C3FE] w-[80%] rounded-full text-center py-3.5 text-xs font-semibold text-white relative overflow-hidden"
              onClick={ripple}
            >
              Launch a token
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
            {/* Left card - index 1, position 2 */}
            <Link
              href={`/token/${randomThree[1]?._id}`}
              className="transition-transform md:-top-8 h-full relative duration-500 w-full max-w-[20rem]"
            >
              <BannerTokenCard
                ticker={randomThree[1]?.ticker}
                name={randomThree[1]?.name}
                ca={randomThree[1]?.contractAddress}
                marketCap={
                  randomThree[1]?.currentPrice * randomThree[1]?.totalSupply
                }
                createdBy={randomThree[1]?.creatorWallet}
                rating={80}
                image={randomThree[1]?.image}
                id={randomThree[1]?._id}
                createdTime={randomThree[1]?.createdAt}
                position={2}
              />
            </Link>

            {/* Middle card - index 0, position 1 */}
            <Link
              href={`/token/${randomThree[0]?._id}`}
              className="transition-transform md:-top-28 h-full relative duration-500 w-full max-w-[20rem] z-10"
            >
              <BannerTokenCard
                ticker={randomThree[0]?.ticker}
                name={randomThree[0]?.name}
                ca={randomThree[0]?.contractAddress}
                marketCap={
                  randomThree[0]?.currentPrice * randomThree[0]?.totalSupply
                }
                createdBy={randomThree[0]?.creatorWallet}
                rating={80}
                image={randomThree[0]?.image}
                id={randomThree[0]?._id}
                createdTime={randomThree[0]?.createdAt}
                position={1}
              />
            </Link>

            {/* Right card - index 2, position 3 */}
            <Link
              href={`/token/${randomThree[2]?._id}`}
              className="transition-transform md:-top-8 h-full relative duration-500 w-full max-w-[20rem]"
            >
              <BannerTokenCard
                ticker={randomThree[2]?.ticker}
                name={randomThree[2]?.name}
                ca={randomThree[2]?.contractAddress}
                marketCap={
                  randomThree[2]?.currentPrice * randomThree[2]?.totalSupply
                }
                createdBy={randomThree[2]?.creatorWallet}
                rating={80}
                image={randomThree[2]?.image}
                id={randomThree[2]?._id}
                createdTime={randomThree[2]?.createdAt}
                position={3}
              />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

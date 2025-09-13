"use client";
import BannerTokenCard from "./cards/bannerCard";
import TokenCard from "./cards/token";
import { useTokens } from "@/context/TokensContext";
import Link from "next/link";
import { useRipple } from "@/hooks/useRipple";

export default function Banner() {
  const { tokens, loading } = useTokens();
  const ripple = useRipple();

  const lastThree = tokens.slice(-3);


  return (
    <section className="relative max-sm:p-3 sm:py-12 w-full md:h-[373px] sm:mt-36 rounded-[20px] flex flex-col items-center justify-center bg-pattern">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
        </div>
      ) : (
        <>
          <div className="sm:hidden flex w-full items-center justify-center my-3">
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
              {lastThree.map((token) => (
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
              href={`/token/${lastThree[1]?._id}`}
              className="transition-transform md:-top-8 h-full relative duration-500 w-full max-w-[17rem]"
            >
              <BannerTokenCard
                ticker={lastThree[1]?.ticker}
                name={lastThree[1]?.name}
                ca={lastThree[1]?.contractAddress}
                marketCap={
                  lastThree[1]?.currentPrice * lastThree[1]?.totalSupply
                }
                createdBy={lastThree[1]?.creatorWallet}
                rating={80}
                image={lastThree[1]?.image}
                id={lastThree[1]?._id}
                createdTime={lastThree[1]?.createdAt}
                position={2}
              />
            </Link>

            {/* Middle card - index 0, position 1 */}
            <Link
              href={`/token/${lastThree[0]?._id}`}
              className="transition-transform md:-top-28 h-full relative duration-500 w-full max-w-[17rem] z-10"
            >
              <BannerTokenCard
                ticker={lastThree[0]?.ticker}
                name={lastThree[0]?.name}
                ca={lastThree[0]?.contractAddress}
                marketCap={
                  lastThree[0]?.currentPrice * lastThree[0]?.totalSupply
                }
                createdBy={lastThree[0]?.creatorWallet}
                rating={80}
                image={lastThree[0]?.image}
                id={lastThree[0]?._id}
                createdTime={lastThree[0]?.createdAt}
                position={1}
              />
            </Link>

            {/* Right card - index 2, position 3 */}
            <Link
              href={`/token/${lastThree[2]?._id}`}
              className="transition-transform md:-top-8 h-full relative duration-500 w-full max-w-[17rem]"
            >
              <BannerTokenCard
                ticker={lastThree[2]?.ticker}
                name={lastThree[2]?.name}
                ca={lastThree[2]?.contractAddress}
                marketCap={
                  lastThree[2]?.currentPrice * lastThree[2]?.totalSupply
                }
                createdBy={lastThree[2]?.creatorWallet}
                rating={80}
                image={lastThree[2]?.image}
                id={lastThree[2]?._id}
                createdTime={lastThree[2]?.createdAt}
                position={3}
              />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

"use client";
import FeaturedCard from "./cards/featured";
import FeaturedCardLoader from "./loaders/FeaturedCardLoader";
import { useTokens } from "@/context/TokensContext";
import Marquee from "react-fast-marquee";

export default function FeaturedSection() {
  const { tokens, loading } = useTokens();

  return (
    <section className="w-full py-6 flex flex-col gap-6">
      <div className="w-full xl:w-[1280px] xl:mx-auto overflow-x-auto">
        <Marquee
          pauseOnHover
          speed={40}
          
          className="gap-6"
        >
          <div className="flex gap-6">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <FeaturedCardLoader key={i} />
                ))
              : tokens.slice(0, 10).map((token) => {
                  const randomType = Math.random() > 0.5 ? "a" : "b";
                  return (
                    <FeaturedCard
                      key={token._id}
                      ticker={token.ticker}
                      title={token.name}
                      price={token.currentPrice}
                      chain={"BSC"}
                      ca={token.contractAddress}
                      image={token.image}
                      type={randomType}
                      id={token._id}
                    />
                  );
                })}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

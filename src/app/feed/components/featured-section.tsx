"use client";
import FeaturedCard from "./cards/featured";
import FeaturedCardLoader from "./loaders/FeaturedCardLoader";
import { useTokens } from "@/context/TokensContext";

export default function FeaturedSection() {
  const { tokens, loading } = useTokens();

  return (
    <section className="w-full py-6 flex flex-col gap-6">
      <div className="w-full xl:w-[1280px] xl:mx-auto overflow-x-auto">
        <div
          className="min-w-[640px] grid grid-cols-5 gap-6"
          style={{ width: "max-content" }}
        >
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <FeaturedCardLoader key={i} />
            ))}

          {tokens.slice(0, 5).map((token) => {
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
      </div>
    </section>
  );
}

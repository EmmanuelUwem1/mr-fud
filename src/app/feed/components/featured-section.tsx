"use client";
import FeaturedCard from "./cards/featured";
import { Mocktokens } from "@/lib/data/mock-tokens";

export default function FeaturedSection() {
  return (
    <section className="w-full py-6 flex flex-col gap-6">

      <div className="w-full xl:w-[1280px] xl:mx-auto overflow-x-auto">
        <div
          className="min-w-[640px] grid grid-cols-5 gap-6"
          style={{ width: "max-content" }}
        >
          {Mocktokens.slice(0, 5).map((token) => {
            const randomType = Math.random() > 0.5 ? "a" : "b";

            return (
              <FeaturedCard
                key={token.ca}
                title={token.name}
                price={token.marketCap}
                chain={"BSC"}
                ca={token.ca}
                image={token.image}
                type={randomType}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

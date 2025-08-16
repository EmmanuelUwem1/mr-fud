"use client";
import { useTokens } from "@/context/TokensContext";
import Link from "next/link";
import CampaignCard from "./cards/campaignCard";

export default function Banner() {
  const { tokens, loading } = useTokens();

  const randomThree = tokens.slice(0, 3);

  return (
    <section className="relative py-12 w-full h-auto sm:mt-20 rounded-[20px] flex flex-col items-center justify-center bg-pattern">
      {loading ? (
        <div className="z-20 text-white text-sm animate-pulse">
          Loading campaigns...
        </div>
      ) : (
        <>
          {/* Mobile layout */}
          <div className="z-20 md:hidden items-center justify-center w-full flex flex-wrap px-6 gap-4 sm:px-10">
            <div className="transition-all duration-500 w-full flex flex-wrap gap-4 justify-center">
              {randomThree.map((token) => (
                <Link
                  key={token._id}
                  href={`/token/${token._id}`}
                  className="w-full max-w-[20rem]"
                >
                  <CampaignCard
                    title={token.name}
                    bannerUrl={token.image}
                    startDate={new Date(token.createdAt).toLocaleDateString()}
                    endDate={new Date(token.createdAt).toLocaleDateString()} // Replace with actual endDate if available
                    twitter={token.twitter}
                    website={token.website}
                    telegram={token.telegram}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="z-20 hidden md:flex gap-4 items-center justify-center w-full px-6 lg:gap-8 sm:px-10">
            {randomThree.map((token, index) => (
              <Link
                href={`/token/${token._id}`}
                key={token._id}
                className={`w-full max-w-[20rem] ${
                  index === 1 ? "md:-top-24" : ""
                }`}
              >
                <CampaignCard
                  title={token.name}
                  bannerUrl={token.image}
                  startDate={new Date(token.createdAt).toLocaleDateString()}
                  endDate={new Date(token.createdAt).toLocaleDateString()} // Replace with actual endDate if available
                  twitter={token.twitter}
                  website={token.website}
                  telegram={token.telegram}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

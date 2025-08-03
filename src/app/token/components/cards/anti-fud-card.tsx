"use client";
import Image from "next/image";

interface AntiFudCardProps {
  antiFudEnabled: boolean;
}

export default function AntiFudCard({ antiFudEnabled }: AntiFudCardProps) {
  return (
    <>
      {antiFudEnabled ? (
        <div className="cursor-pointer p-1 rounded-xl w-full max-w-96 h-28 flex items-center justify-start text-white font-extralight text-sm transition-all border bg-[#021302] border-[#0FBF38] overflow-hidden">
          <span className="relative -left-3 flex items-center h-24 w-full justify-center">
            <Image
              alt="Anti-FUD ON"
              src="/cat 2 1.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
          <p className="-left-3 relative max-sm:text-xs">
            <b className="font-semibold">Anti - FUD ON:</b> Users will be
            penalized 25% by selling before graduation. 50% of this penalty will
            be added to liquidity.
          </p>
        </div>
      ) : (
        <div className="cursor-pointer p-1 rounded-xl w-full max-w-96 h-28 flex items-center justify-start text-white font-extralight text-sm transition-all border bg-[#130202] border-[#FF3C38]">
          <span className="relative -left-6 sm:-left-8 flex items-center h-24 w-full justify-center">
            <Image
              alt="Anti-FUD OFF"
              src="/cat 3 1.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
          <p className="sm:-left-12 -left-10 relative w-[160%] max-sm:text-xs">
            <b className="font-semibold">Anti - FUD OFF:</b> Users can buy and
            sell freely before graduation.
          </p>
        </div>
      )}
    </>
  );
}

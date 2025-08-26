// components/TokenPrice.tsx
import React from "react";
import RatingStars from "./rating-stars";
import { formatChangePercent } from "@/lib/utils";

type TokenPriceProps = {
  tokenAddress: string;
  tokenPrice?: number;
  changePerDay?: number;
  rating?: number;
};

const TokenPrice: React.FC<TokenPriceProps> = ({ tokenAddress, tokenPrice, changePerDay, rating }) => {


  

  return (
    <div className="flex flex-col items-start space-x-2">
      <div className="flex items-center justify-start gap-2">
        <span className="text-white font-medium text-sm md:text-base">
          ${" "}
          {(tokenPrice || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 16,
          })}
        </span>
        <span className="max-sm:text-xs">{formatChangePercent(changePerDay || 0)}</span>
      </div>
      {rating && (
        <div className="max-sm:flex hidden justify-start w-fit items-center">
          <RatingStars rating={2} size={20} />
        </div>
      )}
    </div>
  );
};

export default TokenPrice;

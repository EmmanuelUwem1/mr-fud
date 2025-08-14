// components/TokenPrice.tsx
import React from "react";
import RatingStars from "./rating-stars";
import { formatSmallNumber } from "@/lib/utils";

type TokenPriceProps = {
  tokenAddress: string;
  tokenPrice?: number;
  changePerDay?: number;
};

const TokenPrice: React.FC<TokenPriceProps> = ({ tokenAddress, tokenPrice, changePerDay }) => {


  const isPositive = changePerDay||0 >= 0;
  const priceColor = isPositive ? "text-green-500" : "text-red-500";
  const sign = isPositive ? "+" : "-";

  return (
    <div className="flex flex-col items-start space-x-2">
      <div className="flex items-center justify-start gap-2">
        <span className="text-white font-medium text-sm md:text-base">
          ${formatSmallNumber(tokenPrice || 0) }
        </span>
        <span className={`text-xs ${priceColor}`}>
          {sign}
          {Math.abs(changePerDay || 0).toFixed(2)}%
        </span>
      </div>
      <div className="max-sm:flex hidden justify-start w-fit items-center">
        <RatingStars rating={2} size={20} />
      </div>
    </div>
  );
};

export default TokenPrice;

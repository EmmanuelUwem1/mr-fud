// components/TokenPrice.tsx
import React from "react";

type TokenPriceProps = {
  tokenAddress: string;
};

const TokenPrice: React.FC<TokenPriceProps> = ({ tokenAddress }) => {
  // Mock data
  const mockPrice = 0.00242;
  const mockChange = 5.63; // positive or negative

  const isPositive = mockChange >= 0;
  const priceColor = isPositive ? "text-green-500" : "text-red-500";
  const sign = isPositive ? "+" : "-";

  return (
    <div className="flex items-center space-x-2">
      <span className="text-white font-medium">${mockPrice.toFixed(5)}</span>
      <span className={`text-xs ${priceColor}`}>
        {sign}
        {Math.abs(mockChange).toFixed(2)}%
      </span>
    </div>
  );
};

export default TokenPrice;

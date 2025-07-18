"use client";

type MarketCapProps = {
  marketCap: string;
  changePercent: string;
};

const MarketCap = ({
  marketCap = "0",
  changePercent = "0",
}: MarketCapProps) => {
  const capNumber = Number(marketCap);
  const changeNumber = Number(changePercent);

  const displayCap =
    capNumber >= 1_000_000
      ? `$${(capNumber / 1_000_000).toFixed(0)}M+`
      : `$${capNumber.toLocaleString()}`;

  const isPositive = changeNumber >= 0;
  const formattedChange = `${isPositive ? "+" : ""}${changeNumber.toFixed(2)}%`;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col">
      <div className="text-base font-medium text-white">{displayCap}</div>
      <div className={`text-xs ${changeColor}`}>{formattedChange}</div>
    </div>
  );
};

export default MarketCap;

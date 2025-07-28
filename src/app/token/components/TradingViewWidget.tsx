
import { useEffect, useRef } from "react";

export default function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      theme: "dark",
      locale: "en",
      width: "100%",
      height: 500,
      autosize: true,
    });

    containerRef.current?.appendChild(script);
  }, [symbol]);

  return (
    <div className="bg-[#141414] rounded-[18px] border border-[#000000] p-3 relative flex-col items-center justify-start w-full sm:h-full max-sm:max-h-56 overflow-hidden">
      <div
        className="tradingview-widget-container"
        ref={containerRef}
      ></div>
    </div>
  );
}

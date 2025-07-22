
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
    <div className="tradingview-widget-container" ref={containerRef}></div>
  );
}

"use client";
"use client";
import { useEffect, useRef } from "react";


export default function TestTradingViewWidget({ symbol }: { symbol?: string }) {
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
    <div className="bg-[#212121] sm:bg-[#141414] rounded-[18px] border border-[#000000] p-3 relative flex-col items-center justify-start w-full overflow-hidden h-[500px] sm:h-[600px]">
      {symbol ? (
        <div className="tradingview-widget-container" ref={containerRef}></div>
      ) : (
        <iframe
          className="w-full h-full"
          id="geckoterminal-embed"
          title="GeckoTerminal Embed"
          src="https://www.geckoterminal.com/bsc/pools/0x1df65d3a75aecd000a9c17c97e99993af01dbcd1?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=price&resolution=15m"
          frameBorder="0"
          allow="clipboard-write"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

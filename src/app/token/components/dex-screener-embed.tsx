"use client";
import React from "react";

const DexScreenerEmbed = () => {
  return (
    <iframe
      className="w-full h-full"
      id="dexscreener-embed"
      title="DEX Screener Embed"
      src="https://dexscreener.com/bsc/0x1df65d3a75AeCd000A9c17c97E99993aF01DbcD1?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15"
      frameBorder="0"
      allow="clipboard-write"
      allowFullScreen
    ></iframe>

  );
};

export default DexScreenerEmbed;

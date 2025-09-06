"use client";
import { useEffect, useRef } from "react";
import { createChart, CandlestickData, Time } from "lightweight-charts";
import DexScreenerEmbed from "./dex-screener-embed";

// Dummy data for launchpad token chart
const dummyCandleData: CandlestickData[] = [
  { time: 1694016000 as Time, open: 0.05, high: 0.07, low: 0.04, close: 0.06 },
  { time: 1694023200 as Time, open: 0.06, high: 0.08, low: 0.05, close: 0.07 },
  { time: 1694030400 as Time, open: 0.07, high: 0.09, low: 0.06, close: 0.08 },
];

export default function TestTradingViewWidget({ symbol }: { symbol?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || symbol) return;

    container.innerHTML = "";

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 500,
      layout: {
        background: { color: "#0f172a" },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#334155" },
        horzLines: { color: "#334155" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(dummyCandleData);

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [symbol]);

  return (
    <div className="bg-[#212121] sm:bg-[#141414] rounded-[18px] border border-[#000000] p-3 relative flex-col items-center justify-start w-full overflow-hidden h-[500px] sm:h-[600px]">
      {symbol ? (
        <DexScreenerEmbed />
      ) : (
        <div ref={containerRef} className="w-full h-full" />
      )}
    </div>
  );
}

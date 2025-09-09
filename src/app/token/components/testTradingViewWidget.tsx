"use client";

import { useEffect, useRef } from "react";
import { fetchTokenChart } from "@/lib/api/chart";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  CandlestickSeries,
} from "lightweight-charts";

type RawCandleData = {
  time: string | number; // ISO string or timestamp
  open: number;
  high: number;
  low: number;
  close: number;
};

type Candle = {
  time: Time; // UTCTimestamp (seconds) is accepted
  open: number;
  high: number;
  low: number;
  close: number;
};

export default function TestTradingViewWidget({
  pairAddress,
}: {
  pairAddress: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const resizeHandlerRef = useRef<() => void>(() => {});


  // Convert ISO or ms/s timestamps to UNIX seconds; return null if invalid
  const toUnixSeconds = (value: string | number): number | null => {
    if (typeof value === "number") {
      if (value > 1e12) return Math.floor(value / 1000); // ms -> s
      if (value > 1e9) return Math.floor(value); // seconds
      return null;
    }
    const ms = Date.parse(value);
    if (Number.isNaN(ms)) return null;
    return Math.floor(ms / 1000);
  };

  const formatChartData = (data: RawCandleData[]): Candle[] => {
    const mapped = data
      .map((d) => {
        const t = toUnixSeconds(d.time);
        if (t === null) return null;
        return {
          time: t as Time,
          open: Number(d.open),
          high: Number(d.high),
          low: Number(d.low),
          close: Number(d.close),
        } as Candle;
      })
      .filter((x): x is Candle => x !== null)
      .sort((a, b) => (a.time as number) - (b.time as number));

    // Deduplicate same-second entries (keep the last one)
    const out: Candle[] = [];
    let last: number | undefined;
    for (const c of mapped) {
      const sec = c.time as number;
      if (sec !== last) out.push(c);
      else out[out.length - 1] = c;
      last = sec;
    }
    return out;
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!chartRef.current) return;

      // Create chart once
      if (!chart.current) {
        chart.current = createChart(chartRef.current, {
          width: chartRef.current.clientWidth,
          height: chartRef.current.clientHeight,
          layout: { background: { color: "#000000" }, textColor: "#d1d4dc" },
          grid: {
            vertLines: { color: "#2B2B43" },
            horzLines: { color: "#363C4E" },
          },
          rightPriceScale: { borderColor: "#485c7b" },
          timeScale: {
            borderColor: "#485c7b",
            timeVisible: true,
            secondsVisible: false,
          },
        });

        // IMPORTANT: your version uses addSeries(CandlestickSeries, options)
        candleSeriesRef.current = chart.current.addSeries(CandlestickSeries, {
          upColor: "#4CAF50",
          downColor: "#F44336",
          borderUpColor: "#4CAF50",
          borderDownColor: "#F44336",
          wickUpColor: "#4CAF50",
          wickDownColor: "#F44336",
        });

        const onResize = () => {
          if (!chartRef.current || !chart.current) return;
          chart.current.applyOptions({
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
          });
        };
        resizeHandlerRef.current = onResize;
        window.addEventListener("resize", onResize);
      }

      try {
        const raw = await fetchTokenChart(pairAddress);

        // Support either direct array or { data: [...] }
        const rawArray: RawCandleData[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];

        const formatted = formatChartData(rawArray);

        if (cancelled) return;

        if (formatted.length > 0) {
          candleSeriesRef.current?.setData(formatted);
          chart.current?.timeScale().fitContent();
        } else {
          // Provide a safe placeholder candle to avoid invalid date rendering
          const now = Math.floor(Date.now() / 1000);
          candleSeriesRef.current?.setData([
            { time: now as Time, open: 0, high: 0, low: 0, close: 0 },
          ]);
        }
      } catch (e) {
        console.error("Failed to load chart data:", e);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
      }
    };
  }, [pairAddress]);

  return (
    <div className="aspect-[859/1050] sm:aspect-[859/531] w-full bg-[#1C1C1C] overflow-hidden rounded-[18px] p-4">
      <div
        ref={chartRef}
        className="flex h-full items-center justify-center bg-[#000000] text-gray-400 rounded-[18px]"
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { fetchTokenChart } from "@/lib/api/chart";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
} from "lightweight-charts";

type RawCandleData = {
  time: string;
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

  const formatChartData = (data: RawCandleData[]) => {
    return data.map((item) => {
      const date = new Date(item.time);
      return {
        time: {
          year: date.getUTCFullYear(),
          month: date.getUTCMonth() + 1,
          day: date.getUTCDate(),
        } as Time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      };
    });
  };

  useEffect(() => {
    const initializeChart = async () => {
      if (!chartRef.current) return;

      if (!chart.current) {
        chart.current = createChart(chartRef.current, {
          width: chartRef.current.clientWidth,
          height: chartRef.current.clientHeight,
          layout: {
            background: { color: "#000000" },
            textColor: "#d1d4dc",
          },
          grid: {
            vertLines: { color: "#2B2B43" },
            horzLines: { color: "#363C4E" },
          },
          timeScale: {
            borderColor: "#485c7b",
          },
        });

        candleSeriesRef.current = chart.current.addSeries(CandlestickSeries, {
          upColor: "#4CAF50",
          downColor: "#F44336",
          borderDownColor: "#F44336",
          borderUpColor: "#4CAF50",
          wickDownColor: "#F44336",
          wickUpColor: "#4CAF50",
        });

        window.addEventListener("resize", () => {
          chart?.current?.applyOptions({
            width: chartRef.current?.clientWidth,
            height: chartRef.current?.clientHeight,
          });
        });
      }

      try {
        const rawData = await fetchTokenChart(pairAddress);
        const formattedData = formatChartData(rawData);
        candleSeriesRef.current?.setData(formattedData);
      } catch (error) {
        console.error("Failed to load chart data:", error);
      }
    };

    initializeChart();
  }, [pairAddress]);

  return (
    <div className="aspect-[859/1050] sm:aspect-[859/531] w-full bg-[#1C1C1C] overflow-hidden rounded-[18px] p-4">
      <div
        ref={chartRef}
        className="flex h-full items-center justify-center bg-[#000000] text-gray-400 rounded-[18px]"
      ></div>
    </div>
  );
}

"use client";
import useSocket from "@/hooks/use-socket";
import { FormattedData } from "@/app/types";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function TradingChart({ pairAddress }: { pairAddress: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { emitEvent, subscribeToEvent } = useSocket();

  useEffect(() => {
    emitEvent("subscribe", {
      eventType: "chart_updates",
      room: pairAddress,
    });
    console.log("in");
    subscribeToEvent("chart_updates", (data: unknown) => {
      console.log(data);
      const formattedData = data as FormattedData;
      const newDate = Math.floor(
        new Date(formattedData.timestamp!).getTime() / 1000
      );
      console.log(data, "candleupdate");
      const candleData = {
        open: formattedData.open,
        close: formattedData.close,
        high: formattedData.high,
        low: formattedData.high,
        time: newDate as Time,
      };
      candleSeriesRef.current?.update(candleData);
    });
    if (chartRef.current && !chart.current) {
      console.log("Creating chart");
      chart.current = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: chartRef.current.clientHeight,
        layout: {
          background: { color: "#222" },
          textColor: "#d1d4dc",
        },
        grid: {
          vertLines: {
            color: "#2B2B43",
          },
          horzLines: {
            color: "#363C4E",
          },
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
      // candleSeriesRef.current.setData(generateRandomData());
      const handleResize = () => {
        chart?.current?.applyOptions({
          width: chartRef.current?.clientWidth,
          height: chartRef.current?.clientHeight,
        });
      };

      window.addEventListener("resize", handleResize);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairAddress, subscribeToEvent]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(`/api/proxy?mint=${pairAddress}`, {
          method: "GET",
        });
        const candleStickData = await response.json();

        candleSeriesRef.current?.setData(candleStickData.data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };
    fetchHistoricalData();
  }, [pairAddress]);
  return (
    <div className="aspect-[16/9] w-full">
      {/* Integration with a charting library like TradingView would go here */}
      <div
        ref={chartRef}
        className="flex h-full items-center justify-center text-gray-400"
      ></div>
    </div>
  );
}
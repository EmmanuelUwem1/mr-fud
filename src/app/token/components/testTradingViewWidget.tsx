"use client";

// import useSocket from "@/hooks/use-socket";
import { FormattedData } from "@/app/types";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function TestTradingViewWidget({ pairAddress }: { pairAddress: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  

  // const { emitEvent, subscribeToEvent } = useSocket();

  // Mock candlestick data

 const mockData: {
   time: Time;
   open: number;
   high: number;
   low: number;
   close: number;
 }[] = [
   {
     time: { year: 2023, month: 9, day: 6 },
     open: 0.0023,
     high: 0.0025,
     low: 0.0021,
     close: 0.0024,
   },
   {
     time: { year: 2023, month: 9, day: 7 },
     open: 0.0024,
     high: 0.0026,
     low: 0.0022,
     close: 0.0025,
   },
   {
     time: { year: 2023, month: 9, day: 8 },
     open: 0.0025,
     high: 0.0027,
     low: 0.0023,
     close: 0.0026,
   },
   {
     time: { year: 2023, month: 9, day: 9 },
     open: 0.0026,
     high: 0.0028,
     low: 0.0024,
     close: 0.0027,
   },
   {
     time: { year: 2023, month: 9, day: 10 },
     open: 0.0027,
     high: 0.0029,
     low: 0.0025,
     close: 0.0028,
   },
 ];


  useEffect(() => {
    // emitEvent("subscribe", {
    //   eventType: "chart_updates",
    //   room: pairAddress,
    // });

    // subscribeToEvent("chart_updates", (data: unknown) => {
    //   const formattedData = data as FormattedData;
    //   const newDate = Math.floor(
    //     new Date(formattedData.timestamp!).getTime() / 1000
    //   );

    //   const candleData = {
    //     open: formattedData.open,
    //     close: formattedData.close,
    //     high: formattedData.high,
    //     low: formattedData.low,
    //     time: newDate as Time,
    //   };

    //   candleSeriesRef.current?.update(candleData);
    // });

    if (chartRef.current && !chart.current) {
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

      // Set mock data
      candleSeriesRef.current.setData(mockData);

      const handleResize = () => {
        chart?.current?.applyOptions({
          width: chartRef.current?.clientWidth,
          height: chartRef.current?.clientHeight,
        });
      };

      window.addEventListener("resize", handleResize);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // , subscribeToEvent
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

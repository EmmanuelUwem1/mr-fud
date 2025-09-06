"use client";
import { Line } from "react-chartjs-2";
import DexScreenerEmbed from "./dex-screener-embed";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const chartData = {
  labels: ["12:00", "12:15", "12:30"],
  datasets: [
    {
      label: "Token Price",
      data: [0.06, 0.07, 0.08],
      borderColor: "#00C3FE",
      backgroundColor: "rgba(0,195,254,0.2)",
      tension: 0.4,
    },
  ],
};

export default function TokenChart({ symbol }: { symbol?: string }) {
  return (
    <div className="bg-[#141414] rounded-[18px] border border-[#000000] p-3 w-full h-[500px]">
      {symbol ? (
        <Line data={chartData} options={{ responsive: true }} />
      ) : (
        <DexScreenerEmbed />
      )}
    </div>
  );
}

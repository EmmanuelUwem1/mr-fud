"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const OCICAT_CA = "0xe53d384cf33294c1882227ae4f90d64cf2a5db70";

type Holder = {
  rank: number;
  wallet: string;
  quantity: string;
  percentage: string;
  value: string;
};

type Props = {
  tokenCa: string;
};

function TopHoldersCard({ tokenCa }: Props) {
  const [holders, setHolders] = useState<
    { address: string; percent: number; value: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHolders = async () => {
      try {
        let data: Holder[];

        if (tokenCa.toLowerCase() === OCICAT_CA) {
          const res = await fetch("/holders.json");
          data = await res.json();
        } else {
          const res = await fetch(`/api/token-holders?ca=${tokenCa}`);
          const json = await res.json();
          data = json.holders;
        }

        const formatted = data.map((h) => ({
          address: h.wallet.slice(0, 6) + "..." + h.wallet.slice(-4),
          percent: parseFloat(h.percentage.replace("%", "")),
          value: h.value,
        }));

        setHolders(formatted);
      } catch (err) {
        console.error("Failed to load holders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHolders();
  }, [tokenCa]);

  return (
    <div className="bg-[#1C1C1C] border border-black rounded-[18px] p-6 w-full text-white">
      <h3 className="text-lg font-semibold mb-6">Top Holders</h3>
      {loading ? (
        <p className="text-sm text-gray-400">Loading holders...</p>
      ) : holders.length === 0 ? (
        <p className="text-sm text-gray-400">No holder data available.</p>
      ) : (
        <div className="space-y-3 text-xs font-semibold w-full">
          {holders.map((holder, index) => (
            <div key={index} className="flex items-center gap-4 text-[#626262]">
              <div className="w-8 text-[#FFFFFF]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex font-mono gap-2 items-center justify-start">
                <span className="relative h-5 w-5 flex items-center justify-center">
                  <Image
                    alt=""
                    src={"/Blue cat 2 1.png"}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </span>
                {holder.address}
              </div>
              <div className="relative w-[70%] h-6 py-1 rounded-md overflow-hidden">
                <div
                  className="absolute top-0 right-0 h-full bg-[#262626] rounded-md"
                  style={{ width: `${holder.percent}%` }}
                />
                <span className="absolute right-2 text-xs font-semibold">
                  {holder.percent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopHoldersCard;

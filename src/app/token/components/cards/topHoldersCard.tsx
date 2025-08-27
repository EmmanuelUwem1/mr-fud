"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchTopHoldersFromChainbase } from "@/lib/api";

const TOTAL_SUPPLY = 325_000_000_000_000; // 325 trillion

function TopHoldersCard() {
  const [holders, setHolders] = useState<
    { address: string; percent: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHolders = async () => {
      const data = await fetchTopHoldersFromChainbase();

      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }

      type HolderRaw = { wallet_address: string; amount: string };
      const formatted = data.map((h: HolderRaw) => {
        const quantity = parseFloat(h.amount);
        const percent = (quantity / TOTAL_SUPPLY) * 100;

        return {
          address:
            h.wallet_address.slice(0, 6) + "..." + h.wallet_address.slice(-4),
          percent,
        };
      });
 
      setHolders(formatted);
      setLoading(false);
    };

    loadHolders();
  }, []);

  return (
    <div className="bg-[#1C1C1C] border border-black rounded-[18px] p-6 w-full text-white">
      <h3 className="text-lg font-semibold mb-6">Top Holders</h3>
      {loading ? (
        <p className="text-sm text-gray-400">Loading holders...</p>
      ) : (
        <div className="space-y-3 text-xs font-semibold w-full">
          {holders.map((holder, index) => (
            <div key={index} className="flex items-center gap-4 text-[#626262]">
              <div className="w-8 text-[#FFFFFF]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex font-mono truncat gap-2 items-center justify-start">
                <span className="relative h-5 flex w-5 items-center justify-center">
                  <Image
                    alt=""
                    src={"/Blue cat 2 1.png"}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </span>{" "}
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

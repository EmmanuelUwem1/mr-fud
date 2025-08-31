"use client";
import { useEffect } from "react";
import Image from "next/image";
import { fetchOcicatHolders } from "@/lib/api/holders";
import { CONSTANTS } from "@/web3/config/constants";
import { locked } from "@/web3/config/Locked";
import { useHoldersStore } from "@/store/holdersStore";

const OCICAT_CA = CONSTANTS.OCICAT_TOKEN_ADDRESS.toLowerCase();

type Props = {
  tokenCa: string;
};

function TopHoldersCard({ tokenCa }: Props) {
  const { holders, loading, setHolders, setLoading } = useHoldersStore();

  useEffect(() => {
    const loadHolders = async () => {
      if (tokenCa.toLowerCase() !== OCICAT_CA || holders.length > 0) {
        setLoading(false);
        return;
      }

      try {
        const raw = await fetchOcicatHolders();

        const filtered = raw.filter((holder) => {
          const wallet = holder.wallet?.toLowerCase();
          return wallet && !locked.has(wallet);
        });

        const formatted = filtered.map((h) => ({
          address: h.wallet.slice(0, 6) + "..." + h.wallet.slice(-4),
          percent: parseFloat(h.percentage) || 0,
          value: h.quantity ?? "—",
        }));

        setHolders(formatted);
      } catch (err) {
        console.error("Failed to load holders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHolders();
  }, [tokenCa, holders.length, setHolders, setLoading]);

  return (
    <div className="bg-[#1C1C1C] border border-black rounded-[18px] p-6 w-full text-white">
      <h3 className="text-lg font-semibold mb-6">Top Holders</h3>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400" />
        </div>
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
                  style={{ width: `${holder.percent + 0.5}rem` }}
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

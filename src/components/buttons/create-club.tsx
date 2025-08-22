"use client";

import { useAccount } from "wagmi";
import Link from "next/link";

export default function CreateClubButton() {
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) return null;
// text-[#FF3C38]
  return (
    <Link
      href="/create"
      className="p-2.5 flex items-center justify-center bg-[#F8F8F8] text-[#00C3FE] font-semibold rounded-full text-sm hover:opacity-90 transition-class ease-in-out w-40 shadow-sm"
      // aria-label="Create a Club"
      // title="Create a Club"
    >
      Schedule launch
    </Link>
  );
}

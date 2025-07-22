"use client";

import { useAccount } from "wagmi";
import Link from "next/link";

export default function CreateClubButton() {
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) return null;

  return (
    <Link
      href="/create"
      className="px-6 py-2 flex items-center justify-center bg-[#F8F8F8] text-[#FF3C38] font-semibold rounded-full text-base hover:opacity-90 transition-class ease-in-out w-32 shadow-sm"
      // aria-label="Create a Club"
      // title="Create a Club"
    >
      Create
    </Link>
  );
}

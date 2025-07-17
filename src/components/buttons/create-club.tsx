"use client";
import Link from "next/link";

export default function CreateClubButton() {
  return (
    <Link
      href="/create-club"
      className="px-6 py-2 bg-[#F8F8F8] text-[#FF3C38] font-semibold rounded-full text-base hover:opacity-90 transition-class ease-in-out w-40 shadow-sm"
      aria-label="Create a Club"
      title="Create a Club"
    >
      Create a Club
    </Link>
  );
}

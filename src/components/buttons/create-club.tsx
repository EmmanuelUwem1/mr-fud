"use client";
import Link from "next/link";

export default function CreateClubButton() {
  return (
    <Link
      href="/create-club"
      className="px-6 py-3 bg-[#F8F8F8] text-[#FF3C38] font-semibold rounded-full text-base hover:scale-[1.02] transition-class ease-in-out shadow-sm"
      aria-label="Create a Club"
      title="Create a Club"
    >
      Create a Club
    </Link>
  );
}

"use client";
import { useRipple } from "@/hooks/useRipple";
import { useAccount } from "wagmi";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function CreateButton() {
  const { isConnected, address } = useAccount();
    const pathName = usePathname();
const ripple = useRipple();
  const isCampaignPage = pathName.startsWith("/campaigns");

// text-[#FF3C38]
  return (
    <Link
      href={`/create/${isCampaignPage ? "campaign" : "token"}`}
      className="p-2.5 relative overflow-hidden flex items-center justify-center bg-[#F8F8F8] text-[#00C3FE] font-semibold rounded-full text-sm hover:opacity-90 transition-class ease-in-out w-40 shadow-sm"
      onClick={(e) => ripple(e)}
      // aria-label="Create a Club"
      // title="Create a Club"
    >
      {isCampaignPage ? "Create Countdown" : "Launch a token"}
    </Link>
  );
}

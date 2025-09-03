"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
function LaunchApp() {
  const pathname = usePathname();
  const show = pathname === "/";
  // bg - [#FF3C38];
  
  return show ? (
    <Link
      href={"/connect"}
      className="bg-[#00C3FE] rounded-[7px] text-[#FFFFFF] px-6 py-3 sm:font-bold text-sm sm:text-lg transition-class max-sm:translate-x-8 hover:opacity-80 launch sm:w-40 text-center"
    >
      Launch App
    </Link>
  ) : null;
}

export default LaunchApp
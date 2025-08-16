"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
function LaunchApp() {
  const pathname = usePathname();
  const show = pathname === "/";
  // bg - [#FF3C38];
  
  return show ? ( <Link href={"/connect"} className="text-[#0077D3] bg-white rounded-[7px] px-6 py-3 font-bold text-base sm:text-lg transition-class hover:opacity-80 launch w-40 text-center">Launch App</Link> ) : null;
}

export default LaunchApp
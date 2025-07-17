"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
function LaunchApp() {
  const pathname = usePathname();
  const show = pathname === "/";
  
  return show ? ( <Link href={"/"} className="text-white bg-[#FF3C38] rounded-[7px] px-6 py-3 font-bold text-base sm:text-lg transition-class hover:opacity-80 launch">Launch App</Link> ) : null;
}

export default LaunchApp
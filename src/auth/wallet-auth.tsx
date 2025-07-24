"use client";

import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { modal } from "@/context/AppKitProvider";

export default function WalletAuthGuard() {
  const { isConnected } = useAccount();
  const pathname = usePathname();

  useEffect(() => {
    // Skip check on homepage
    if (pathname === "/") return;

    // Trigger modal if wallet not connected
    if (!isConnected) {
      modal.open();
    }
  }, [pathname, isConnected]);

  return null;
}

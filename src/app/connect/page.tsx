"use client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { modal } from "@/context/AppKitProvider";

export default function AuthGatePage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Auto-open modal on page load
  useEffect(() => {
    modal.open();
  }, []);

  // Redirect if wallet is connected
  useEffect(() => {
    if (isConnected) {
      router.replace("/feed"); // redirect to feeds page
    }
  }, [isConnected, router]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white bg-black">
      <h2 className="text-xl font-semibold">Connecting your wallet...</h2>
      <p className="text-sm mt-2 text-gray-400">Waiting for authentication</p>
    </div>
  );
}

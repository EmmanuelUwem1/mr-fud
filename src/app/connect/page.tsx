"use client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { modal } from "@/context/AppKitProvider";

export default function AuthGatePage() {
  const { isConnected } = useAccount();
  const router = useRouter();

 


  useEffect(() => {
    if (isConnected) {
      router.replace("/feed"); // redirect to feeds page
    }
    else {
          modal.open();
    }
  }, [isConnected, router]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-xl font-semibold">Connecting your wallet...</h2>
      <p className="text-sm mt-2 text-[#87DDFF]">Waiting for authentication</p>
    </div>
  );
}

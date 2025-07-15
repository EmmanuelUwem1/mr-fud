"use client";

import { useAccount } from "wagmi";
import { modal } from "@/context/AppKitProvider";
import Image from "next/image";

export default function CustomConnectButton() {
  const {  address } = useAccount();

  const shortenedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Connect";

  return (
    <button
      onClick={() => modal.open()}
      className="relative px-6 py-2 font-orbitron bg-[#FF2727] text-white rounded-full flex items-center gap-2 overflow-hidden group cursor-pointer"
    >
      <Image
        src="/connect_wallet.svg"
        alt="Wallet"
        width={20}
        height={20}
        priority
      />

      {shortenedAddress}

      <span className="absolute inset-0 before:absolute before:right-[100%] before:top-0 before:h-full before:w-full before:bg-[#b0b6c06f] before:transition-all before:duration-300 group-hover:before:right-0 before:z-[-1] rounded cursor-pointer" />
    </button>
  );
}

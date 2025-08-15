"use client";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { modal } from "@/context/AppKitProvider";
import { formatWalletAddress } from "@/lib/utils";

export default function CustomConnectButton() {
  const {  address, isConnected } = useAccount();
const pathname = usePathname();
  const show = pathname !== "/";
  const shortenedAddress = address && isConnected
    ? formatWalletAddress(address)
    : "Connect";
// bg - [#FF2727];
  return show ? (
    <button
      onClick={() => modal.open()}
      className={`relative px-6 py-2 text-white rounded-full flex items-center gap-2 overflow-hidden group cursor-pointer ${
        isConnected
          ? "bg-[#212121]"
          : "bg-[#00C3FE] shadow-[0_0_10px_#7BE9FFD1]"
      }`}
    >
      {shortenedAddress}

      <span className="absolute inset-0 before:absolute before:right-[100%] before:top-0 before:h-full before:w-full before:bg-[#b0b6c06f] before:transition-all before:duration-300 group-hover:before:right-0 before:z-[-1] rounded cursor-pointer" />
    </button>
  ) : null;
}

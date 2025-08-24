"use client";
import Link from "next/link";
import Image from "next/image";
import Socials from "./socials";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="px-4 sm:px-8 md:px-16 pt-4">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 w-full">
        {/* logo */}
        <Link href={"/"} className="relative flex items-center justify-center">
          <span className="relative w-16 sm:w-20 sm:h-10 2xl:w-28 2xl:h-14 h-8 flex items-center justify-center">
            <Image
              alt="MrFUD"
              height={1000}
              width={1000}
              quality={100}
              priority
              src={"/mrfud logo 1 1.png"}
            />
          </span>
        </Link>
        {/* disclaimer */}
        <div className="font-medium text-xs text-center px-4 sm:px-8 lg:px-16 text-white">
          <div>
            <span className="text-[#E89B00]">Disclaimer:</span> Investing in
            tokens through this launchpad involves significant risk and may
            result in loss of your investment. We do not provide financial
            advice or guarantee any project’s success. Users must perform their
            own due diligence before participating.
          </div>
        </div>
        <div className="max-sm:mx-auto">
          <Socials theme="dark-blue" />
        </div>
      </div>
      <div className="mt-4 h-[1px] bg-white w-full"></div>
      <footer className="w-full text-center py-8 px-4 text-sm text-white">
        © {year} MrFud | All rights reserved
      </footer>
    </div>
  );
}
 
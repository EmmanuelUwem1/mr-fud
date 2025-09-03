"use client";
import Link from "next/link";
import Image from "next/image";
import LaunchApp from "./buttons/launch-app";
import Hamburger from "hamburger-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Socials from "./socials";
import CreateButton from "./buttons/create";
import CustomConnectButton from "./buttons/customConnectButton";
import { useAccount } from "wagmi";
import UserProfileAvatar from "./avaters/user-profile-avatar";
import TradeNotification from "./tradeNotification";

function Header() {
  const [isOpen, setOpen] = useState(false);
  const pathName = usePathname();
  const { address, isConnected } = useAccount();
  const show = pathName !== "/";
  const prePage = pathName === "/";
  const connectPage = pathName === "/connect";
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "FOMO Feed", path: "/feed" },
    { label: "Staking", path: "/staking" },
    { label: "Countdown", path: "/campaigns" },
    { label: "Leaderboard", path: "/leaderboard" },
    { label: "Ocicat", path: "/token" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`relative w-full py-2 px-4 bg-[#0077D3] ${
        prePage ? "md:px-12" : "md:px-8"
      }`}
    >
      <div
        className={`${prePage || connectPage ? "hidden" : "hidden sm:block"} `}
      >
        <TradeNotification />
      </div>
      <motion.header
        ref={menuRef}
        initial={false}
        animate={{ height: isOpen ? "auto" : "80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-start w-full border border-[#38B9FF] overflow-hidden px-4 rounded-[22px] bg-[#00416D]"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center gap-8 my-auto py-2 relative">
          {/* Logo */}
          <Link
            href={"/"}
            className="relative flex items-center justify-center"
          >
            <span className="relative w-16 sm:w-20 sm:h-10 2xl:w-28 2xl:h-14 h-8 flex items-center justify-center">
              <Image
                alt="MrFUD"
                height={1000}
                width={1000}
                quality={100}
                priority
                src={"/mrfud logo 1 1.svg"}
              />
            </span>
          </Link>

          {/* Right section */}
          <div
            className={`flex w-full justify-end lg:justify-between items-center ${
              prePage ? "gap-16" : "gap-12 2xl:gap-24"
            }`}
          >
            {/* Desktop nav */}
            <nav
              className={`xl:flex hidden justify-center items-center font-medium text-base 2xl:text-lg gap-8 2xl:gap-8 ${
                prePage ? "" : "lg:gap-3"
              }`}
            >
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  href={path}
                  className={`${
                    pathName === path
                      ? "font-bold bg-gradient-to-r from-[#F7E436] to-[#05E02B] bg-clip-text text-transparent"
                      : "text-[#E3E3E3] hover:font-bold hover:bg-gradient-to-r hover:from-[#F7E436] hover:to-[#05E02B] hover:bg-clip-text hover:text-transparent"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/airdrop"
                className="relative font-bold bg-gradient-to-r from-[#70B0FF] to-[#FF01BF] bg-clip-text text-transparent"
              >
                Airdrop
                <span className="absolute -top-1 -right-3">
                  <Image alt="star" src="/Star 1.png" width={15} height={15} />
                </span>
              </Link>
            </nav>

            {/* Socials */}
            <div className="max-sm:hidden mx-auto w-fit">
              <Socials theme="dark-blue" />
            </div>

            {/* Buttons */}
            <div className="flex max-sm:w-full items-center justify-end gap-4">
              <LaunchApp />
              {show && (
                <div className="hidden lg:flex items-center w-fit justify-center relative max-sm:-right-8">
                  <CreateButton />
                </div>
              )}
              <div className="relative max-sm:-right-6">
                <CustomConnectButton />
              </div>
              {address && isConnected && show && (
                <span className="max-sm:hidden relative right-4">
                  <UserProfileAvatar />
                </span>
              )}
              {/* Mobile Hamburger */}
              <div className="xl:hidden cursor-pointer flex items-center justify-center w-fit">
                <Hamburger
                  toggled={isOpen}
                  toggle={setOpen}
                  direction="right"
                  color="#fff"
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full px-2 pb-6 card-gradient-wrapper-thin mb-2"
            >
              <div className="rounded-[15px] bg-[#00416D] px-6 py-8 flex flex-col gap-6 text-[#E3E3E3] font-medium">
                {navLinks.map(({ label, path }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setOpen(false)}
                    className={`${
                      pathName === path
                        ? "font-bold bg-gradient-to-r from-[#F7E436] to-[#05E02B] bg-clip-text text-transparent"
                        : "text-[#E3E3E3] hover:font-bold hover:bg-gradient-to-r hover:from-[#F7E436] hover:to-[#05E02B] hover:bg-clip-text hover:text-transparent"
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                <Link
                  href="/airdrop"
                  onClick={() => setOpen(false)}
                  className="relative font-bold bg-gradient-to-r from-[#70B0FF] to-[#FF01BF] bg-clip-text text-transparent w-16"
                >
                  Airdrop
                  <span className="absolute -top-1 -right-4">
                    <Image
                      alt="star"
                      src="/Star 1.png"
                      width={15}
                      height={15}
                    />
                  </span>
                </Link>

                <div
                  className="flex flex-col justify-start items-start gap-4 pt-2"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex gap-8 items-center justify-between w-full pr-4">
                    <CreateButton />
                    {address && isConnected && show && (
                      <span className="sm:hidden">
                        <UserProfileAvatar />
                      </span>
                    )}
                  </div>
                  <div className="sm:hidden flex w-full justify-start">
                    <Socials theme="dark-blue" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <div className={`${prePage ? "hidden" : "block sm:hidden"} `}>
        <TradeNotification />
      </div>
    </div>
  );
}

export default Header;

"use client";
import Link from "next/link";
import Image from "next/image";
import LaunchApp from "./buttons/launch-app";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Socials from "./socials";
import CreateClubButton from "./buttons/create-club";
import CustomConnectButton from "./buttons/customConnectButton";
import { useEffect, useRef } from "react";
import Avatar from "./avaters/avater-circle";
import { useAccount } from "wagmi";

function Header() {
  const [isOpen, setOpen] = useState(false);
  const pathName = usePathname();
    const {  address, isConnected } = useAccount();
  const show = pathName !== "/";
  const prePage = pathName === "/";
  const isTokenPage = pathName.startsWith("/token");

 const navLinks = [
   { label: "FOMO Feed", path: "/feed" },
   { label: "Staking", path: "/staking" },
   { label: "Countdown", path: "/campaigns" },
   { label: "Leaderboard", path: "/leaderboard" },
   { label: "Ocicat", path: "/token" },
  ];
  
  const menuRef = useRef<HTMLDivElement>(null);

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
      className={`relative w-full ${
        isTokenPage ? "bg-[#0D0D0D]" : "bg-[#0077D3]"
      }`}
    >
      <header
        className={`flex w-full overflow-hidden justify-between gap-4 items-center px-4 sm:px-8 py-4 lg:py-6 mb-8 ${
          prePage ? "md:px-16" : "md:px-8"
        }`}
        ref={menuRef}
      >
        {/* logo */}
        <Link href={"/"} className="relative flex items-center justify-center">
          <span className="relative w-16 sm:w-20 sm:h-10 2xl:w-28 2xl:h-14 h-8 flex items-center justify-center">
            <Image
              alt="MrFUD"
              height={1000}
              width={1000}
              quality={100}
              priority
              src={"/pill.png"}
            />
          </span>
        </Link>

        <div
          className={`flex justify-between items-center ${
            prePage ? "gap-28" : "gap-12 2xl:gap-24"
          }`}
        >
          {/* nav links (desktop only) */}
          <nav
            className={`xl:flex hidden justify-center items-center font-medium text-base 2xl:text-lg gap-8  2xl:gap-8 2xl:w-[540px] ${
              prePage ? " " : "lg:gap-4"
            }`}
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`${
                  pathName === path
                    ? "font-bold bg-gradient-to-r from-[#F7E436] transition-class to-[#05E02B] bg-clip-text text-transparent"
                    : "text-[#E3E3E3] hover:font-bold  transition-class hover:bg-gradient-to-r hover:from-[#F7E436] hover:to-[#05E02B] hover:bg-clip-text hover:text-transparent"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Airdrop styled separately */}
            <Link
              href="/airdrop"
              className="relative font-bold bg-gradient-to-r from-[#AEFF70]  to-[#01FF1E] bg-clip-text text-transparent"
            >
              Airdrop
              <span className="absolute -top-1 -right-3">
                <Image alt="star" src="/Star 1.png" width={15} height={15} />
              </span>
            </Link>
          </nav>

          {/* socials */}
          <div className="max-sm:hidden w-fit">
            <Socials theme="dark-blue" />
          </div>

          {/* buttons */}
          <div className="flex items-center justify-center gap-4">
            <LaunchApp />
            {show && (
              <div className="hidden lg:flex items-center w-fit justify-center relative -right-4">
                <CreateClubButton />
              </div>
            )}

            <div className="relative -right-4">
              <CustomConnectButton />
            </div>
            {address && isConnected && show && (
              <Link
                href="/profile"
                className="hidden sm:flex relative cursor-pointer -right-4"
              >
                <Avatar borderColor="#FF3C38" border src="/Image holder.png" />
              </Link>
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
      </header>

      {/* Mobile Nav Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-[20000] top-20 right-4"
          >
            <div className="relative w-[320px] before:content-[''] before:absolute before:inset-0 before:rounded-[15px] before:bg-gradient-to-r before:from-[#F7E436]  before:to-[#05E02B] before:-z-10 p-0.5">
              <div className="bg-[#181818] rounded-[15px] px-6 py-8 flex flex-col gap-6 text-[#E3E3E3] font-medium shadow-md mobile-nav">
                {navLinks.map(({ label, path }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`${
                      pathName === path
                        ? "font-bold bg-gradient-to-r from-[#F7E436] transition-class to-[#05E02B] bg-clip-text text-transparent"
                        : "text-[#E3E3E3] hover:font-bold  transition-class hover:bg-gradient-to-r hover:from-[#F7E436] hover:to-[#05E02B] hover:bg-clip-text hover:text-transparent"
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                {/* Airdrop mobile link with unique gradient */}
                <Link
                  href="/airdrop"
                  className="relative font-bold bg-gradient-to-r  from-[#AEFF70]  to-[#01FF1E] bg-clip-text text-transparent"
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

                {/* buttons section */}
                <div className="flex flex-col justify-start items-start gap-4 h-full w-full pt-2">
                  <div className="flex gap-8 items-center justify-between w-full pr-4">
                    <CreateClubButton />
                    {address && isConnected && show && (
                      <Link
                        href="/profile"
                        className="flex sm:hidden relative cursor-pointer -right-4"
                      >
                        <Avatar
                          borderColor="#FF3C38"
                          border
                          src="/Image holder.png"
                        />
                      </Link>
                    )}
                  </div>

                  <div className="sm:hidden flex w-full">
                    <Socials theme="dark-blue" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;

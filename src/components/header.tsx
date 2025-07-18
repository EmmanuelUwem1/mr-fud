"use client";
import Link from "next/link";
import Image from "next/image";
import LaunchApp from "./buttons/launch-app";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Socials from "./socials";
import SearchBar from "./searchBar";
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

 const navLinks = [
   { label: "Degen Feed", path: "/feed" },
   { label: "Staking", path: "/staking" },
   { label: "Leaderboard", path: "/leaderboard" },
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
    <div className="relative w-full">
      <header
        className="flex w-full overflow-x-hidden justify-between gap-4 items-center px-4 sm:px-8 py-4 lg:py-6 mb-8 md:px-16"
        ref={menuRef}
      >
        {/* logo */}
        <Link href={"/"} className="relative flex items-center justify-center">
          <span className="relative w-16 sm:w-20 sm:h-10 h-8 flex items-center justify-center">
            <Image
              alt="MrFUD"
              height={1000}
              width={1000}
              quality={100}
              priority
              src={"/logomrfud 2.png"}
            />
          </span>
        </Link>

        <div className="flex justify-between items-center gap-20">
          {/* nav links (desktop only) */}
          <nav className="xl:flex hidden justify-center items-center font-medium text-base gap-8 w-[26rem]">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`${
                  pathName === path
                    ? "font-bold bg-gradient-to-r from-[#FF0E32] transition-class to-[#FFB7C2] bg-clip-text text-transparent"
                    : "text-[#E3E3E3] hover:font-bold  transition-class hover:bg-gradient-to-r hover:from-[#FF0E32] hover:to-[#FFB7C2] hover:bg-clip-text hover:text-transparent"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Airdrop styled separately */}
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

          {/* socials */}
          <div className="max-sm:hidden">
            <Socials theme="dark-blue" />
          </div>

          {/* buttons */}
          <div className="flex items-center justify-center gap-4">
            <SearchBar />
            <LaunchApp />
            {show && (
              <div className="hidden lg:flex items-center justify-center relative -right-4">
                <CreateClubButton />
              </div>
            )}

            <div className="relative -right-4">
              <CustomConnectButton />
            </div>
            {address && isConnected && show && (
              <div className="hidden sm:flex relative cursor-pointer -right-4">
                <Avatar borderColor="#FF3C38" border />
              </div>
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
            className="absolute z-50 top-20 right-4"
          >
            <div className="relative w-[280px] before:content-[''] before:absolute before:inset-0 before:rounded-[15px] before:bg-gradient-to-r before:from-[#A74D4D] before:via-[#4B1F1F] before:to-[#180A0A] before:-z-10 p-0.5">
              <div className="bg-[#181818] rounded-[15px] px-6 py-8 flex flex-col gap-6 text-[#E3E3E3] font-medium shadow-md mobile-nav">
                {navLinks.map(({ label, path }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`${
                      pathName === path
                        ? "font-bold bg-gradient-to-r from-[#FF0E32] to-[#FFB7C2] bg-clip-text text-transparent transition-class"
                        : "text-[#E3E3E3] hover:font-bold  transition-class hover:bg-gradient-to-r hover:from-[#FF0E32] hover:to-[#FFB7C2] hover:bg-clip-text hover:text-transparent"
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                {/* Airdrop mobile link with unique gradient */}
                <Link
                  href="/airdrop"
                  className="relative font-bold bg-gradient-to-r from-[#70B0FF] to-[#FF01BF] bg-clip-text text-transparent"
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
                  <CreateClubButton />
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

"use client";
import Link from "next/link";
import Image from "next/image";
import LaunchApp from "./buttons/launch-app";
import Hamburger from "hamburger-react";
import { useState } from "react";
import Socials from "./socials";
import SearchBar from "./searchBar";

function Header() {
  const [isOpen, setOpen] = useState(false);


  return (
    <header className="flex w-full justify-between gap-4 items-center px-4 sm:px-8 py-4 lg:py-6 mb-14 md:px-16">
      {/* logo */}
      <Link href={"/"} className="relative flex items-center justify-center">
        <span className="relative w-16 sm:w-20 sm:h-10 h-8 flex items-center justify-center">
          <Image
            alt="MrFUD"
            layout="fill"
            objectPosition="center"
            objectFit="contain"
            priority
            src={"/logomrfud 2.png"}
          />
        </span>
      </Link>

      <div className="flex justify-between items-center gap-20">
        {/* nav links */}
        <nav className="lg:flex hidden justify-center items-center font-medium text-base gap-8 text-[#E3E3E3]">
          <Link href={"/degen-feed"}>Degen Feed</Link>
          <Link href={"/staking"}>Staking</Link>
          <Link href={"/leaderboard"}>Leaderboard</Link>
          <Link href={"/airdrop"} className="airdrop-link relative">
            <span className="absolute -top-1 -right-3">
              <Image alt="star" src={"/Star 1.png"} height={15} width={15} />
            </span>
            Airdrop
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

          {/* Mobile Hamburger */}
          <div className="lg:hidden cursor-pointer">
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
  );
}

export default Header;

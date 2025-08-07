"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

function SearchBar() {
  const pathname = usePathname();
  const showSearch =
    pathname === "/feed" ||
    pathname === "/leaderboard" ||
    pathname === "/token/[id]";

  const ref = useRef<HTMLDivElement>(null);

  return showSearch ? (
    <div className="relative flex items-center justify-end max-w-64">
      <motion.div
        ref={ref}
        className="flex items-center border border-[#DBD9FF] rounded-full bg-gradient-to-r from-[#554EB9] to-[#262353] text-white h-10 overflow-hidden shadow-md backdrop-blur-md right-0 z-50 px-4"
        initial={{
          width: "2.6rem",
          paddingLeft: ".6rem",
          paddingRight: "0.2rem",
        }}
        animate={{ width: "14rem", paddingLeft: "1rem", paddingRight: "1rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <input
          type="text"
          className="bg-transparent outline-none placeholder-gray-300 w-full text-sm ml-2"
          placeholder="Search..."
        />
        <Image src="/search.png" alt="Search icon" width={20} height={20} />
      </motion.div>
    </div>
  ) : null;
}

export default SearchBar;

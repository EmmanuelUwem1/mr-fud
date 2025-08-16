"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex items-center lg:ml-3 justify-end max-w-64">
      <motion.div
        ref={ref}
        className="flex items-center border border-[#DBD9FF] rounded-[12px] bg-gradient-to-r from-[#554eb994] to-[#2623537f] text-white h-10 overflow-hidden shadow-md backdrop-blur-md right-0 z-50 px-4"
        initial={{
          width: "2.6rem",
          paddingLeft: ".6rem",
          paddingRight: "0.2rem",
        }}
        animate={{ width: "16rem", paddingLeft: "1rem", paddingRight: "1rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none placeholder-gray-300 w-full text-sm ml-2"
          placeholder="Search..."
        />
        <Image src="/search.png" alt="Search icon" width={20} height={20} />
      </motion.div>
    </div>
  );
}

export default SearchBar;

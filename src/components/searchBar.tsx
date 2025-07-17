"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showSearch = pathname !== "/";

  return showSearch ? (
    <>
      {/* Visible on medium and larger screens */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#554EB9] to-[#262353] border border-[#DBD9FF] text-white">
        <Image
          src="/search-icon.png"
          alt="Search icon"
          width={16}
          height={16}
        />
        <input
          type="text"
          className="bg-transparent outline-none placeholder-gray-300 w-full text-sm"
          placeholder="Search..."
        />
      </div>

      {/* Mobile toggle icon */}
      <button
        aria-label="Toggle search"
        title="Search"
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden p-2 rounded-full border border-[#DBD9FF] bg-gradient-to-r from-[#554EB9] to-[#262353]"
      >
        <Image
          src="/search.png"
          alt="Search icon"
          width={16}
          height={16}
        />
      </button>

      {/* Animated search on small screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden fixed top-20 left-4 right-4 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-[#554EB9] to-[#262353] border border-[#DBD9FF] flex items-center gap-2 text-white"
          >
            <Image
              src="/search-icon.png"
              alt="Search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              className="bg-transparent outline-none placeholder-gray-300 w-full text-sm"
              placeholder="Search"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : null;
}

export default SearchBar;

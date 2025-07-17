"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showSearch = pathname !== "/";

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return showSearch ? (
    <div className="relative flex items-center justify-end">
      <motion.div
        ref={ref}
        className={`flex items-center border border-[#DBD9FF] rounded-full bg-gradient-to-r from-[#554EB9] to-[#262353] text-white h-10 overflow-hidden cursor-pointer shadow-md backdrop-blur-md`}
        initial={false}
        animate={{
          width: isOpen ? "14rem" : "2.6rem",
          paddingLeft: isOpen ? "1rem" : ".6rem",
          paddingRight: isOpen ? "1rem" : "0.2rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              autoFocus
              className="bg-transparent outline-none placeholder-gray-300 w-full text-sm ml-2"
              placeholder="Search..."
            />
          )}
        </AnimatePresence>
        <Image src="/search.png" alt="Search icon" width={20} height={20} />
      </motion.div>
    </div>
  ) : null;
}

export default SearchBar;

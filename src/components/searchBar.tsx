"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showSearch = pathname !== "/degen";

  const ref = useRef<HTMLDivElement>(null);

// Close when clicking outside
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
    <motion.div
      ref={ref}
      className="flex items-center gap-2 px-2 py-2 border border-[#DBD9FF] rounded-full bg-gradient-to-r from-[#554EB9] to-[#262353] text-white overflow-hidden cursor-pointer"
      initial={false}
      animate={{
        width: isOpen ? "14rem" : "2rem",
        paddingLeft: isOpen ? "1rem" : "0.5rem",
        paddingRight: isOpen ? "1rem" : "0.5rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => setIsOpen(true)}
    >
      <Image src="/search.png" alt="Search icon" width={16} height={16} />

      {isOpen && (
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          type="text"
          autoFocus
          className="bg-transparent outline-none placeholder-gray-300 w-full text-sm"
          placeholder="Search..."
        />
      )}
    </motion.div>
  ) : null;
}

export default SearchBar;

"use client";
import { motion } from "framer-motion";
function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-start flex-col justify-start px-4 sm:px-8 md:px-16"
      >
          Profile Page
    </motion.div>
  );
}

export default Page
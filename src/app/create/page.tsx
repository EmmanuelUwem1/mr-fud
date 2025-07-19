"use client";
import { motion } from "framer-motion";

export default function Page() {
    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: .5}}
            className="flex w-full items-start flex-col justify-start">Create new coin
        </motion.div>
    )
}
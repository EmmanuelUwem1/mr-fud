"use client";
import { motion } from "framer-motion";
import Form from "./components/form";

export default function Page() {
    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: .5}}
            className="flex w-full items-center flex-col justify-start py-6">
            <Form />
        </motion.div>
    )
}
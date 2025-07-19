"use client";
import { motion } from "framer-motion";
import Form from "./components/form";
import MediaUpload from "./components/input-media";
import SocialsInput from "./components/input-socials";

export default function Page() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full items-center flex-col justify-start py-6"
      >
        <Form />
        <div className="flex w-full items-start justify-center md:flex-nowrap flex-wrap gap-4">
          <MediaUpload /> <SocialsInput />
        </div>
      </motion.div>
    );
}
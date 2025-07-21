"use client";
import Link from "next/link";
import ProfileCard from "./components/profile-card";
import { motion } from "framer-motion";
function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-center flex-col justify-start px-4 sm:px-8 md:px-16"
      >
      <div className="flex my-4 w-full justify-start max-w-4xl items-center">
          <Link className="text-[#D92C2A]" href={"/feed"} >Back home</Link>
      </div>
      <ProfileCard />
    </motion.div>
  );
}

export default Page
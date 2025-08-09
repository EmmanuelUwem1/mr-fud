"use client";
import ProfileCard from "./components/profile-card";
import { motion } from "framer-motion";
import BackButton from "@/components/buttons/backButton";
function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-center flex-col justify-start px-4 sm:px-8 md:px-16"
      >
     <BackButton />
      <ProfileCard />
    </motion.div>
  );
}

export default Page
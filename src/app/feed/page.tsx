"use client"
import Banner from "./components/feedBanner";
import TokensSection from "./components/tokens-section";
import { motion } from "framer-motion";

function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-start flex-col justify-start"
    >
    

      <Banner />
      {/* <FeaturedSection /> */}
      <TokensSection />
    </motion.div>
  );
}

export default Page
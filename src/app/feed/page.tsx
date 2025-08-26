"use client"
import Banner from "./components/feedBanner";
import FeaturedSection from "./components/featured-section";
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
      <div className="max-sm:pb-3 mx-auto text-base text-center lg:text-left w-fit font-bold bg-gradient-to-r from-[#F7E436]  to-[#05E02B] bg-clip-text text-transparent">
        Top 3 Tokens
      </div>

      <Banner />
      {/* <FeaturedSection /> */}
      <TokensSection />
    </motion.div>
  );
}

export default Page
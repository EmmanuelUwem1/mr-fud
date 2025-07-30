"use client";
import { motion } from "framer-motion";

function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex w-full items-center justify-center min-h-screen overflow-hidden"
    >
      <div className="w-fit overflow-hidden relative max-w-2xl p-[1px] rounded-[18px] bg-gradient-to-r from-[#A74D4D] via-[#4B1F1F] to-[#180A0A]">
        {/*  Top-right blurred gradient */}
        <div className="absolute -top-32 sm:-top-20 -right-32 sm:-right-20 w-72 h-72 rounded-full bg-[#520000] opacity-60 blur-2xl pointer-events-none z-1" />

        {/*  Bottom-left blurred gradient */}
        <div className="absolute -left-32 -bottom-32 sm:-bottom-20 sm:-left-20 w-72 h-72 rounded-full bg-[#520000] opacity-60 blur-2xl pointer-events-none z-1" />



        <div
          className="w-full px-8 bg-[#141414] h-80 flex flex-col items-center justify-center py-12 rounded-[17px] bg-no-repeat bg-cover bg-center text-white"
          style={{
            backgroundImage: "url('/texture-2.png')"
            
          }}
        >
          <h1 className="text-center GasoekOne-Regular text-lg sm:text-xl font-normal mb-2 z-10">
            Check your airdrop eligibility
          </h1>
          <p className="text-center z-10 mx-auto sm:w-[70%] text-sm font-extralight mb-6">
            {`Enter your wallet address to see if you're one of the chosen degens
            to receive our juicy airdrop.`}
          </p>
          <div className="flex z-10 flex-col items-center w-full gap-4">
            <input
              type="text"
              placeholder="Enter your wallet address (0x...)"
              className="w-full max-w-lg px-4 py-2 rounded-md bg-[#1F1F1F] text-white border border-[#FF9AA2] placeholder:text-[#888] focus:outline-none"
            />
            <button className="px-6 py-3 bg-[#FF3C38] hover:bg-[#e5382f] text-xs font-medium transition-class text-white rounded-full ">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Page;

"use client";
import { motion } from "framer-motion";

function Page() {
     return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-full items-start flex-col justify-start"
         >
             DAO Staking page
         </motion.div>
 );
}
    export default Page
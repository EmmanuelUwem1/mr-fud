"use client";
import { motion } from "framer-motion";

function Page() {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="flex w-full items-center flex-col justify-center py-40"
       >
         <div className="cardthreebg flex items-center justify-center w-full p-6 rounded-xl">
           Coming soon
         </div>
       </motion.div>
     );
}
    export default Page
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// const bgColors = ["#A1120B", "#87322E", "#4B1613"];
const bgColors = ["#0B5BA1", "#2E6887", "#13354B"];

type Action = {
  title: string;
  description: string;
  href: string;
};

type Props = {
  actions: Action[];
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function ActionCards({ actions }: Props) {
  return (
    <motion.div
      className="flex flex-col justify-start items-start gap-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {actions.map((action, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <Link
            href={action.href}
            className="w-full flex justify-between items-center rounded-[10px] px-8 py-6 mobile-padding"
            style={{ backgroundColor: bgColors[index % bgColors.length] }}
          >
            <div className="flex-col flex justify-start items-start text-white">
              <h3 className="font-bold max-sm:text-base text-lg">{action.title}</h3>
              <p className="font-extralight max-sm:text-sm text-lg">{action.description}</p>
            </div>
            <span className="relative flex items-center justify-center h-9 w-9">
              <Image
                src={"/arrow-right.png"}
                alt="arrow"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

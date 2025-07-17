"use client";

import Image from "next/image";
import ActionCards from "@/components/action-cards";
import Socials from "@/components/socials";
import { motion } from "framer-motion";

export default function Home() {
  const actions = [
    {
      title: "Create now",
      description: "Connect your wallet and create for free",
      href: "/connect",
    },
    {
      title: "Create on X.com",
      description: "Connect your X account and create something magical",
      href: "/",
    },
    {
      title: "Create on telegram bot",
      description: "Connect your telegram account and start a club",
      href: "/",
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,

      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <main className="flex my-auto flex-row-reverse relative justify-between h-full md:flex-nowrap flex-wrap items-center max-sm:gap-0 gap-4 px-4 pt-8 sm:px-8 md:px-16 sm:pb-20 w-full">
        <motion.div
          className="relative hero-image max-sm:-top-20 flex justify-center items-center w-full md:w-1/2 px-4 py-4"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-[600px] h-[400px] sm:h-[700px] overflow-hidden">
            <Image
              alt="Illustration"
              src="/trasp1.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          className="flex max-md:mx-auto max-sm:my-8 flex-col gap-8 justify-start w-full sm:w-[80%] md:w-1/2 items-start max-sm:-top-20 hero-text relative"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col justify-start items-start gap-4 w-full max-md:pt-8 pt-8"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-extrabold text-3xl"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              Start a club for free.
            </motion.h1>
            <motion.p
              className="font-extralight text-lg"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              launch a token on any network in seconds.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
            <ActionCards actions={actions} />
          </motion.div>
        </motion.div>
      </main>

      <footer className="flex-col flex items-center justify-center gap-8 w-full px-4 sm:hidden relative go-up">
        <div className="text-center flex items-center justify-center px-8 font-normal text-base">
          In a sea of noise, we bring FUD — Fearless, Unstoppable Diamondhands.
        </div>
        <Socials theme="dark-red" />
      </footer>
    </>
  );
}

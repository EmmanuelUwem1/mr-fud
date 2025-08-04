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
      title: "Create on telegram bot",
      description: "Connect your telegram account and start a club",
      href: "/",
    },
    {
      title: "Create on X.com",
      description: "Connect your X account and create something magical",
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
      <main className="flex my-auto flex-row-reverse relative justify-between h-full md:flex-nowrap flex-wrap items-center max-sm:gap-0 gap-4 px-4 pt-8 sm:px-8 md:px-16 sm:pb-16 w-full">
        <motion.div
          className="relative hero-image -top-20 flex justify-center items-center w-full md:w-[1/2] px-4 py-4"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full md:w-[200%] max-w-[2000px] h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden lg:scale-140 xl:scale-150 2xl:scale-180">
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
          className="flex max-md:mx-auto max-sm:my-8 flex-col gap-8 justify-start w-full sm:w-[80%] md:w-[100%] items-start -top-18 sm:top-0 hero-text relative"
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

          <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="w-full">
            <ActionCards actions={actions} />
          </motion.div>
        </motion.div>
      </main>

      <footer className="flex-col justify-self-end flex items-center justify-center gap-8 w-full px-4 relative go-up pb-4 sm:pt-4 lg:pt-8 xl:pt-16 2xl:pt-24 lg:pb-10 lg:mt-auto">
        <div className="text-center flex items-center justify-center px-8 font-normal text-base italic">
          In a sea of noise, we bring FUD — Fearless, Unstoppable Diamondhands.
        </div>
        <Socials theme="dark-red" />
      </footer>
    </>
  );
}

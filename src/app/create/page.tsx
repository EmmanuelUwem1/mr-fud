"use client";
import { motion } from "framer-motion";
import Form from "./components/form";
import MediaUpload from "./components/input-media";
import SocialsInput from "./components/input-socials";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import CreateCoinModal from "./components/create-coin-modal";
import { useTokenForm } from "./context/TokenFormContext";
import BackButton from "@/components/buttons/backButton";
import CampaignsForm from "./components/CampaignsForm";
import { BannerImageProvider } from "./context/BannerImageContext";

export default function Page() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
const {setPayload} = useTokenForm();
  useEffect(() => {
    if (!isConnected) {
      router.replace("/connect");
    }
    else if (address) {
      setPayload({ creatorWallet: address });
    }
  }, [isConnected, router]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full items-center flex-col justify-start sm:py-6 pb-8"
      >
        <div className="flex sm:items-center sm:justify-center gap-6 justify-start items-start w-full max-w-4xl">
          <div className="w-full">
            {/* Heading */}
            <h1 className="text-xl font-semibold bg-clip-text text-transparent w-full text-left sm:text-center bg-gradient-to-r  from-[#F7E436] transition-class to-[#05E02B] ">
              Create a countdown
            </h1>

            {/* Subheading */}
            <p className="text-sm w-full py-3 text-left sm:text-center font-light text-[#FFFFFF] ">
              {/* sm:text-[#7B93D5] */}
              {`choose carefully, these can't be changed once the coin is created`}
            </p>
          </div>
          <span className="sm:hidden">
            <BackButton />
          </span>
        </div>
        <Form />
        <BannerImageProvider>
          <CampaignsForm />
        </BannerImageProvider>

        <div className="flex w-full items-start justify-center md:flex-nowrap flex-wrap gap-4 max-w-4xl">
          <MediaUpload /> <SocialsInput />
        </div>

        <div className="bg-[#3C3517] text-[#FACC15] w-full rounded-[4px] font-medium text-sm max-w-4xl mt-4 flex items-center justify-start gap-3 p-3">
          <span className="relative h-6 w-10">
            <Image
              src={"/warning.png"}
              alt="warning-icon"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
          {` Coin data (social links, banner, etc) can only be added now, and can't
          be changed or edited after creation`}
        </div>

        <div
          onClick={() => setShowModal(true)}
          className="bg-[#00C3FE] text-white w-full rounded-[4px] font-medium text-base max-w-4xl my-3 flex items-center justify-center py-3 cursor-pointer transition-class hover:opacity-90"
        >
          Next
        </div>
      </motion.div>

      {showModal && <CreateCoinModal onClose={() => setShowModal(false)} />}
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import QRBox from "./QR-Code";
import Image from "next/image";
import { copyToClipboard } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils";


interface ReferModalProps {
  onClose: () => void;
  tokenName: string;
  tokenTicker: string;
  tokenCreatedDate: string;
  tokenImage: string;
  tokenId: string;
  // referalCode: string;
  // profitPercent: string;
}

export default function ReferModal({ onClose, tokenName,tokenCreatedDate, tokenImage, tokenTicker, tokenId }: ReferModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const referalCode = "2r4dwwf";
  const tokenUrl = `/token/${tokenId}?ref=${referalCode}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const captureTradeCard = async () => {
    const card = document.getElementById("trade-card");
    if (!card) return;
    const canvas = await html2canvas(card);
    const img = canvas.toDataURL("image/png");
    setImageDataUrl(img);

    const link = document.createElement("a");
    link.href = img;
    link.download = "trade_snapshot.png";
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1100] flex items-center justify-center bg-black h-full w-full border-[#923A07] rounded-[7px] bg-opacity-60"
      >
        <motion.div
          ref={modalRef}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className=" mx-4 rounded-xl p-6 w-full max-w-lg text-white shadow-lg"
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md w-full text-right text-[#FF3C38] text-xs font-medium hover:opacity-90"
          >
            Close
          </button>
          <motion.div
            id="trade-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-[#4800bc] via-[#24005f] to-[#24005f] rounded-xl px-4 py-6 sm:px-6 mt-4 w-full text-white shadow-xl relative overflow-hidden"
          >
            <div className="text-sm flex justify-between items-start">
              <div>
                <div className="relative w-16 sm:w-20 sm:h-10 h-8 flex items-center justify-center">
                  <Image
                    alt="MrFUD"
                    height={1000}
                    width={1000}
                    quality={100}
                    priority
                    src={"/logomrfud 2.png"}
                  />
                </div>
                
                  <div className="text-xs font-extralight">{tokenName}</div>
                  <div className="text-2xl text-[#E3E3E3] font-extrabold">
                    $${tokenTicker}
                  </div>
                
                <div className="text-green-300 font-extrabold text-2xl">
                
                  +312%
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <span className="relative h-3.5 w-4">
                                   <Image
                                     src={"/clock.png"}
                                     layout="fill"
                                     objectFit="contain"
                                     objectPosition="center"
                                     alt="clock"
                                   />
                                 </span>
                <span className="font-medium text-sm">{formatTimeAgo(tokenCreatedDate)}</span>
                </div>
              </div>
              {/* image by the right */}
              <span className="h-24 sm:h-32 sm:w-32 w-24 aspect-square flex items-center justify-center relative rounded-lg overflow-hidden">
                <Image
                  alt=""
                  src={tokenImage}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </span>
            </div>

            <div className="mt-4 text-center absolute bottom-6 left-1/2">
              <QRBox url={tokenUrl} />
            </div>
             {/*
                  <Image
                    src="/banner.png"
                    alt="Banner background"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                    className="z-0 absolute bottom-0 right-0"
                  /> */}
          </motion.div>

          <div className="flex justify-between mt-4">
            <button
              onClick={captureTradeCard}
              className="px-4 py-2 rounded-md text-[#FF3C38] text-xs font-medium"
            >
              Download image
            </button>
          </div>
          <div className="w-full items-center flex justify-between bg-[#212121] rounded-full p-1">
            <span className="px-4 font-normal text-xs">{tokenUrl}</span>
            <button
              className="bg-[#FF3C38] text-xs font-medium py-2 px-3 rounded-full"
              onClick={() => copyToClipboard(tokenUrl)}
            >
              copy
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import QRBox from "./QR-Code";
import Image from "next/image";


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

  const tokenUrl = `/token/${tokenId}`;

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
            className="bg-gradient-to-br from-[#4800bc] via-[#24005f] to-[#24005f] rounded-xl p-4 mt-4 w-full text-white shadow-xl"
          >

          
          
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Token:</span>
                <span>$BTCBABY</span>
              </div>
              <div className="flex justify-between">
                <span>Profit:</span>
                <span className="text-green-300">+312%</span>
              </div>
              <div className="flex justify-between">
                <span>Wallet:</span>
                <span>0x928...cccc</span>
              </div>
              <div className="mt-4 text-center">
                
                <QRBox url={tokenUrl} />
              </div>
            </div>
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
            <span className="px-4">{}</span>
            <button className="bg-[#FF3C38] text-xs font-medium py-2 px-3 rounded-full">copy</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

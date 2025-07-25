"use client";
import { useEffect, useRef, useState } from "react";
import Turnstile from "@/components/Turnstile";
import { useTokenForm } from "../context/TokenFormContext";
import { motion, AnimatePresence } from "framer-motion";


export default function CreateCoinModal({ onClose }: { onClose: () => void }) {
  const { payload, setPayload } = useTokenForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const [bnbAmount, setBnbAmount] = useState("0");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("BNB");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currencies = ["BNB", "ETH"];


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);



  const formatInput = (amount: number) => setBnbAmount(amount.toString());

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#212121] mx-4 p-6 rounded-lg w-full max-w-sm text-white overflow-hidden"
      >
        {/* Optional purchase message */}
        <p className="text-base text-white font-normal mb-2">
          Choose how many [DES] you want to buy (optional){" "}
        </p>
        <p className="text-sm font-normal text-[#FFFFFF] mb-4">
          Tip: It’s optional, but buying a small amount of coins helps protect
          your coin from snipers.
        </p>

        <div className="relative w-full mb-4">
          {/* Input Field */}
          <input
            type="number"
            min="0"
            step="0.0001"
            value={bnbAmount}
            onChange={(e) => setBnbAmount(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
            placeholder={`Amount in ${selectedCurrency}`}
            className="w-full bg-[#1B1B1B] text-white px-4 py-3 pr-[90px] rounded-[6px] border-[2px] border-[#626262] placeholder-gray-500 appearance-none"
          />

          {/* Custom Dropdown */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-sm border border-[#626262]"
            >
              {selectedCurrency}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-1 bg-[#2C2C2C] border border-[#626262] rounded shadow-lg overflow-hidden"
                >
                  {currencies.map((currency) => (
                    <li
                      key={currency}
                      className="px-3 py-2 hover:bg-[#3a3a3a] text-sm cursor-pointer text-white"
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setDropdownOpen(false);
                      }}
                    >
                      {currency}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hardcap */}
        <p className="text-sm font-bold text-[#FF3C38] mb-2">Choose Hardcap</p>
        <div className="flex gap-2 mb-4">
          {[10, 20, 30, 80].map((val) => (
            <button
              key={val}
              onClick={() => formatInput(val)}
              className="text-xs bg-[#2A2A2A] px-2 py-2 rounded-md hover:bg-[#3A3A3A]"
            >
              {val} BNB
            </button>
          ))}
        </div>
        <p>You receive: 342810.12 ${payload.ticker}</p>
        <div className="relative w-full h-18">
          {/* Loader Layer */}
          {!captchaVerified && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
              {/* Customize your loader animation here */}
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#FF3C38]" />
            </div>
          )}

          {/* CAPTCHA Layer */}
          <div className="relative z-10">
            <Turnstile onSuccess={() => setCaptchaVerified(true)} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full justify-end gap-2">
          <button
            disabled={!captchaVerified}
            className={`px-4 py-3 rounded-md font-medium flex w-full items-center justify-center ${
              captchaVerified
                ? "bg-[#FF3C38] text-white hover:opacity-90"
                : "bg-[#1B1B1B] text-gray-400 cursor-not-allowed"
            }`}
          >
            Create Coin
          </button>
        </div>
      </div>
    </div>
  );
}

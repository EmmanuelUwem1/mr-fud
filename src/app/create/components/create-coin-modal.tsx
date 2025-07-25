"use client";
import { useEffect, useRef, useState } from "react";
import Turnstile from "@/components/Turnstile";
import { useTokenForm } from "../context/TokenFormContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createToken } from "@/lib/api";
import { useImageContext } from "../context/ImageContext";
import toast from "react-hot-toast";

// const imageUploadEndpoint = "/api/upload";
        

export default function CreateCoinModal({ onClose }: { onClose: () => void }) {
  const { payload, setPayload } = useTokenForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const [bnbAmount, setBnbAmount] = useState("0");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("BNB");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { file } = useImageContext();

 const handleSubmit = async () => {
   if (!file) return;

   setIsLoading(true); 

   try {
     const formData = new FormData();
     formData.append("file", file);

     const res = await fetch("/api/upload", {
       method: "POST",
       body: formData,
     });

     const result = await res.json();
     const image = result.ipfsUrl;
     setPayload({ image });

    //  toast.success("Image uploaded successfully!");

     const finalResponse = await createToken(payload);
     if (finalResponse.success) {
       toast.success("Coin created successfully!");
       onClose();
     } else {
       toast.error(
         `An error occurred: ${
           finalResponse.error.response?.data?.message ||
           finalResponse.error.message ||
           "Unknown error"
         }`
       );
     }
   } catch (error) {
     toast.error(
       `Unexpected error: 
         Something went wrong
       `
     );
   } finally {
     setIsLoading(false);
   }
 };


  const currencies = [
    { name: "BNB", image: "/IMG_5135 1.png", hardCap: [10, 20, 30, 80], chain: "BSC" },
    { name: "ETH", image: "/eth.png", hardCap: [0.01, 0.5, 1, 2], chain: "ETH" },
  ];


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
              className="bg-[#525252] text-white px-3 py-1 rounded-[7px] text-sm cursor-pointer flex items-center justify-center gap-1"
            >
              {(() => {
                const selected = currencies.find(
                  (value) => value.name === selectedCurrency
                );
                return selected ? (
                  <>
                    <span className="mr-1">{selected.chain}</span>
                    <span className="relative flex items-center justify-center h-4 w-4">
                      <Image
                        alt=""
                        src={selected.image}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                      />
                    </span>
                  </>
                ) : (
                  ""
                );
              })()}
              <span
                className={`relative mx-1 h-6 w-6 flex items-center justify-center transition-all duration-300 ${
                  dropdownOpen ? "rotate-0" : "rotate-180"
                }`}
              >
                <Image
                  alt=""
                  src="/arrow-down.png"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-1 space-y-1.5 rounded-[7px] shadow-lg overflow-hidden"
                >
                  {currencies.map((currency) => (
                    <li
                      key={currency.name}
                      className="px-4 gap-1 py-2 hover:bg-[#3a3a3a] text-sm flex items-center justify-center cursor-pointer bg-[#525252] rounded-full text-white"
                      onClick={() => {
                        setSelectedCurrency(currency.name);
                        setPayload({
                          chain: currency.chain as "BSC" | "ETH" | undefined,
                        });
                        setDropdownOpen(false);
                      }}
                    >
                      {currency.name}{" "}
                      <span className="relative flex items-center justify-center h-4 w-4">
                        <Image
                          alt=""
                          src={currency.image}
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                        />
                      </span>
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
          {currencies
            .find((value) => value.name === selectedCurrency)
            ?.hardCap.map((val) => (
              <button
                key={val}
                onClick={() => formatInput(val)}
                className="text-xs bg-[#2A2A2A] px-2 py-2 rounded-md hover:bg-[#3A3A3A] cursor-pointer"
              >
                {val} {selectedCurrency}
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
            disabled={!captchaVerified || isLoading}
            onClick={handleSubmit}
            className={`px-4 py-3 rounded-md font-medium flex w-full items-center justify-center gap-2 ${
              captchaVerified
                ? "bg-[#FF3C38] text-white hover:opacity-90 cursor-pointer"
                : "bg-[#1B1B1B] text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Create Coin"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

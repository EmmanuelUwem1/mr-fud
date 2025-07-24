"use client";
import { useEffect, useRef, useState } from "react";
import Turnstile from "@/components/Turnstile";

export default function CreateCoinModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [bnbAmount, setBnbAmount] = useState("0");
  const [captchaVerified, setCaptchaVerified] = useState(false);

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
        className="bg-[#212121] mx-4 p-6 rounded-lg w-full max-w-lg text-white overflow-hidden"
      >
        <h2 className="text-xl font-semibold mb-4">Create Coin</h2>

        {/* Optional purchase message */}
        <p className="text-sm mb-1">
          Choose how many [DES] you want to buy{" "}
          <span className="text-gray-400">(optional)</span>
        </p>
        <p className="text-xs text-gray-400 mb-4">
          Tip: It’s optional, but buying a small amount of coins helps protect
          your coin from snipers.
        </p>

        {/* BNB Amount */}
        <input
          type="number"
          min="0"
          step="0.0001"
          value={bnbAmount}
          onChange={(e) => setBnbAmount(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          className="w-full bg-[#1B1B1B] text-white px-4 py-3 rounded-[6px] border-[2px] border-[#626262] placeholder-gray-500 mb-4 appearance-none"
          placeholder="Amount in BNB"
        />

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
        <div className="flex w-full h-16 ">
          {/* CAPTCHA */}
          <Turnstile onSuccess={() => setCaptchaVerified(true)} />
        </div>
        {/* Buttons */}
        <div className="flex w-full justify-end gap-2">
         
          <button
            disabled={!captchaVerified}
            className={`px-4 py-3 rounded-md font-medium flex w-full items-center justify-center ${
              captchaVerified
                ? "bg-[#FF3C38] text-white hover:opacity-90"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create Coin
          </button>
        </div>
      </div>
    </div>
  );
}

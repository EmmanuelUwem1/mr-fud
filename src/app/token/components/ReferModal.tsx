"use client";
import { useEffect, useRef } from "react";

interface ReferModalProps {
  onClose: () => void;
}

export default function ReferModal({ onClose }: ReferModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black h-full w-full border-[#923A07] rounded-[7px] bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-[#1C1C1C] mx-4 rounded-xl p-6 w-full max-w-sm text-white shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-2">Refer a friend</h2>
        <p className="text-sm text-gray-300 mb-4">
          Share your referral link and earn rewards when your friends join.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#FF3C38] text-xs font-medium hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

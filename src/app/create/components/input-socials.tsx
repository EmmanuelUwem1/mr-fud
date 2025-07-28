"use client";
import { useState } from "react";
import Image from "next/image";
import { useTokenForm } from "../context/TokenFormContext";
import { motion, AnimatePresence } from "framer-motion";

const SocialsInput: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { payload, setPayload } = useTokenForm();

  return (
    <div className="bg-[#141414] flex flex-col items-start justify-start w-full rounded-[13px] p-6 space-y-4">
      {/*  Desktop version (sm and up) */}
      <div className="hidden sm:block w-full space-y-4">
        <div className="flex items-center justify-between gap-3 w-full">
          <h2 className="text-base font-semibold text-[#FF3C38]">
            Socials (optional)
          </h2>
          <span className="relative mx-1 h-6 w-6 flex items-center justify-center">
            <Image
              alt="Dropdown icon"
              src="/arrow-down.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
        </div>

        {/* Static inputs for desktop */}
        <InputGroup
          label="Twitter"
          value={payload.twitter || ""}
          onChange={(v) => setPayload({ ...payload, twitter: v })}
        />
        <InputGroup
          label="Website"
          value={payload.website || ""}
          onChange={(v) => setPayload({ ...payload, website: v })}
        />
        <InputGroup
          label="Telegram"
          value={payload.telegram || ""}
          onChange={(v) => setPayload({ ...payload, telegram: v })}
        />
      </div>

      {/*  Mobile version (< sm) */}
      <div className="block sm:hidden w-full">
        <div className="flex items-start justify-between gap-3 w-full">
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FA3C39] to-[#FFA393]">
            Socials (optional)
          </h2>
          <span
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`relative mx-1 h-6 w-6 flex items-center justify-center transition-all duration-300 ${
              dropdownOpen ? "rotate-0" : "rotate-180"
            }`}
          >
            <Image
              alt="Toggle dropdown"
              src="/arrow-down.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full overflow-hidden space-y-4 mt-2"
            >
              <InputGroup
                label="Twitter"
                value={payload.twitter || ""}
                onChange={(v) => setPayload({ ...payload, twitter: v })}
              />
              <InputGroup
                label="Website"
                value={payload.website || ""}
                onChange={(v) => setPayload({ ...payload, website: v })}
              />
              <InputGroup
                label="Telegram"
                value={payload.telegram || ""}
                onChange={(v) => setPayload({ ...payload, telegram: v })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Reusable Input Group Component
const InputGroup = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="w-full">
    <label className="block mb-1 text-white text-sm">{label}</label>
    <input
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`${label.toLowerCase()} url`}
      className="w-full px-3 py-2 bg-transparent border border-[#2A2A2A] rounded-md text-white placeholder-gray-500"
    />
  </div>
);

export default SocialsInput;

import React from "react";

const SocialsInput: React.FC = () => {
  return (
    <div className="bg-[#141414] flex flex-col items-start justify-start w-full rounded-[13px] p-6 space-y-4">
      {/* Section Heading */}
      <h2 className="text-[#FF3C38] text-base font-semibold">
        Socials (optional)
      </h2>

      {/* Twitter Input */}
      <div className="w-full">
        <label className="block mb-1 text-white text-sm">Twitter</label>
        <input
          type="url"
          placeholder="twitter url"
          className="w-full px-3 py-2 bg-transparent border border-[#2A2A2A] rounded-md text-white placeholder-gray-500"
        />
      </div>

      {/* Website Input */}
      <div className="w-full">
        <label className="block mb-1 text-white text-sm">Website</label>
        <input
          type="url"
          placeholder="website url"
          className="w-full px-3 py-2 bg-transparent border border-[#2A2A2A] rounded-md text-white placeholder-gray-500"
        />
      </div>

      {/* Telegram Input */}
      <div className="w-full">
        <label className="block mb-1 text-white text-sm">Telegram</label>
        <input
          type="url"
          placeholder="telegram url"
          className="w-full px-3 py-2 bg-transparent border border-[#2A2A2A] rounded-md text-white placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default SocialsInput;

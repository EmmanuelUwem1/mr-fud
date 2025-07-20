import React, { useState } from "react";

const AntiGeetToggle: React.FC = () => {
  const [selected, setSelected] = useState<"green" | "black" | null>(null);

  return (
    <div className="flex gap-4 w-full">
      {/* Green Card */}
      <div
        onClick={() => setSelected("green")}
        className={`cursor-pointer p-6 rounded-xl w-full h-20 flex items-center justify-center bg-[#021302] text-white font-bold transition-all
          ${
            selected === "green"
              ? "border border-green-400"
              : "border border-transparent"
          }`}
      >
        
    
      </div>

      {/* Black Card */}
      <div
        onClick={() => setSelected("black")}
        className={`cursor-pointer p-6 rounded-xl w-full h-20 flex items-center justify-center bg-[#080808] text-white font-bold transition-all
          ${
            selected === "black"
              ? "border border-red-500"
              : "border border-transparent"
          }`}
      >
       
      </div>
    </div>
  );
};

export default AntiGeetToggle;

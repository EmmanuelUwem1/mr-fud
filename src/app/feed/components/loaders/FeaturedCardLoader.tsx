"use client";
import React from "react";

const FeaturedCardLoader = () => {
  return (
    <div className="w-full max-w-[252px] bg-[#0C0C0C] rounded-[15px] overflow-hidden flex gap-4 justify-between p-2 text-white animate-pulse">
      {/* Left: Image Placeholder */}
      <div className="w-24 h-24 rounded-[9px] bg-[#1a1a23]" />

      {/* Right: Text Placeholder */}
      <div className="flex flex-col gap-3 justify-center w-full">
        <div className="h-5 w-1/2 bg-gray-700 rounded" /> {/* Ticker */}
        <div className="h-4 w-2/3 bg-gray-600 rounded" /> {/* Price */}
        <div className="h-3 w-full bg-gray-800 rounded" /> {/* CA line */}
      </div>
    </div>
  );
};

export default FeaturedCardLoader;

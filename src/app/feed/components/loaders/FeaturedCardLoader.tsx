"use client";

const FeaturedCardLoader = () => {
  return (
    <div className="w-full max-w-[252px] bg-[#f9fafbbc] rounded-[15px] overflow-hidden flex gap-4 justify-between p-2 text-gray-800 animate-pulse">
      {/* Left: Image Placeholder */}
      <div className="w-24 h-24 rounded-[9px] bg-[#e5e7eb]" />

      {/* Right: Text Placeholder */}
      <div className="flex flex-col gap-3 justify-center w-full">
        <div className="h-5 w-1/2 bg-[#d1d5db] rounded" /> {/* Ticker */}
        <div className="h-4 w-2/3 bg-[#e5e7eb] rounded" /> {/* Price */}
        <div className="h-3 w-full bg-[#d1d5db] rounded" /> {/* CA line */}
      </div>
    </div>
  );
};

export default FeaturedCardLoader;

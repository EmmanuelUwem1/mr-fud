import React from "react";

const LeaderboardCard = ({
  index = "001",
  ticker = "ETH",
  name = "Ethereum",
  marketCap = "$248B",
  creator = "0x4FC...1818",
  imageUrl = "https://via.placeholder.com/64",

}) => {
  return (
    <div
      className="relative p-6 rounded-xl shadow-lg backdrop-blur-md 
      bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] 
      from-[#19367C]/30 to-transparent text-white w-full max-w-sm mx-auto"
    >
      <div className="absolute top-4 left-4 text-2xl font-bold text-white/90">
        #{index}
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={imageUrl}
          alt={`${name} Logo`}
          className="w-16 h-16 rounded-full border border-white/30"
        />
        <div>
          <div className="text-lg font-semibold uppercase">{ticker}</div>
          <div className="text-sm text-white/70">{name}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-white/70">Market Cap:</span>
          <span className="text-sm font-medium">{marketCap}</span>
        </div>
        <div className="flex justify-between truncate">
          <span className="text-sm text-white/70">Created By:</span>
          <span className="text-sm font-medium truncate">{creator}</span>
        </div>
      </div>

      <button
       
        className="mt-6 w-full bg-green-500 hover:bg-green-600 
        text-white font-semibold py-2 px-4 rounded-full transition"
      >
        Buy Now
      </button>
    </div>
  );
};

export default LeaderboardCard;

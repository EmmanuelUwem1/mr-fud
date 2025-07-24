import Image from "next/image";

type TokenAvatarProps = {
  tokenName: string;
  tokenTicker: string;
};

export default function TokenAvatar({
  tokenName,
  tokenTicker,
}: TokenAvatarProps) {
  return (
    <>
      <div className="relative w-10 h-10 flex items-center justify-center rounded-full">
        {/* Outer Gradient Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(to right, #FA3C39, #FFA393)",
          }}
        />

        {/* Inner White Circle with Black Border */}
        <div
          className="z-10 rounded-full"
          style={{
            width: "90%", // adjust to taste
            height: "90%",
            backgroundColor: "#FFFFFF",
            border: "2px solid black",
          }}
        />
      </div>

      <div className="flex flex-col items-start justify-center">
        <span className="text-lg GasoekOne-Regular font-normal text-[#E3E3E3]">
          {tokenTicker}
        </span>
        <span className="text-xs font-semibold text-[#BBBBBB]">
          {tokenName}
        </span>
      </div>
    </>
  );
}

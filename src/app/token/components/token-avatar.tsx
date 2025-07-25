import Image from "next/image";

type TokenAvatarProps = {
  tokenName: string;
  tokenTicker: string;
  image: string;
};

export default function TokenAvatar({
  tokenName,
  tokenTicker,
  image,
}: TokenAvatarProps) {
  return (
    <>
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Outer Gradient Ring */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full p-[2px]"
          style={{
            background: "linear-gradient(to right, #FA3C39, #FFA393)",
          }}
        >
          {/* Inner Circle with Black Border */}
          <div className="bg-white rounded-full relative h-12 w-12 flex items-center justify-center border-[4px] border-black overflow-hidden m-auto">
            <Image
              alt={`${tokenName} Logo`}
              src={image}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
             
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center ml-4">
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

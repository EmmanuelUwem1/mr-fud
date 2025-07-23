import Image from "next/image";


export default function TokenAvatar() {
  return (
    <div className="flex items-center justify-start gap-3">
      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
        <Image
          src="/path/to/avatar.png"
          alt="Token Avatar"
          width={64}
          height={64}
          className="rounded-full"
        />
          </div>
          <div className="flex flex-col items-start justify-start">
              
          </div>
    </div>
  );
}
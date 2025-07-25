import Image from "next/image";
import Link from "next/link";
export default function TokenDescription({
  description,
  twitter,
  telegram,
}: {
    description: string;
    twitter: string;
    telegram: string;
}) {
  return (
    <div className="border border-[#000000] p-4 sm:p-6 rounded-[7px] bg-[#141414] text-white">
      <div className="flex w-full items-center justify-between gap-3">
        <h2 className="text-base font-bold">Description</h2>
        <div className="flex items-center justify-end gap-3 font-semibold text-xs">
          <Link
            href={telegram}
            className="text-xs relative flex items-center justify-center gap-2 bg-[#2A2A2A] rounded-[5px] px-3 py-2"
          >
            <span className="relative h-3.5 w-4">
              <Image
                src={"/telegram-white.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="telegram"
              />
            </span>
            Telegram
          </Link>
          <Link
            href={twitter}
            className="text-xs relative flex items-center justify-center gap-2 bg-[#2A2A2A] rounded-[5px] px-3 py-2"
          >
            <span className="relative h-3.5 w-3.5">
              <Image
                src={"/twitter-white.png"}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="telegram"
              />
            </span>
            Twitter
          </Link>
        </div>
      </div>
      <p className="text-left pt-6 whitespace-pre-line">{description}</p>
    </div>
  );
}

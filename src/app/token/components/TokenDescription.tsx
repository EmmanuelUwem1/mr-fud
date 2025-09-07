import Image from "next/image";
import Link from "next/link";
import WalletAndDateFlex from "./walletAndDateFlex";
export default function TokenDescription({
  description,
  twitter,
  telegram,
  website,
  ca,
  createdDate,
}: {
    description: string;
    twitter: string;
    telegram: string;
    website: string;
    ca: string;
    createdDate?: string;
}) {
  return (
    <>
      <div className="w-full lg:hidden mt-4">
        <WalletAndDateFlex ca={ca} createdDate={createdDate || ""} />
      </div>
      <div className="p-4 sm:p-6 rounded-[7px] box-bg text-white w-full">
        <div className="flex w-full items-center justify-between gap-3">
          <h2 className="text-base font-bold">Description</h2>
          <div className="flex items-center justify-between sm:justify-end gap-3 font-semibold text-xs">
            {website && (
              <Link
                href={website}
                className="text-xs relative flex items-center justify-center gap-2 bg-[#013253] sm:bg-[#489ECC] rounded-full sm:rounded-[5px] px-3 sm:py-2 py-3"
              >
                <span className="relative h-3.5 w-4">
                  <Image
                    src={"/icons/website.png"}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    alt="website"
                  />
                </span>
                <span className="hidden sm:flex">Website</span>
              </Link>
            )}
            {telegram && (
              <Link
                href={telegram}
                className="text-xs relative flex items-center justify-center gap-2 bg-[#013253] sm:bg-[#489ECC] rounded-full sm:rounded-[5px] px-3 sm:py-2 py-3"
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
                <span className="hidden sm:flex">Telegram</span>
              </Link>
            )}
            {twitter && (
              <Link
                href={twitter}
                className="text-xs relative flex items-center justify-center gap-2 bg-[#013253] sm:bg-[#489ECC] rounded-full sm:rounded-[5px] px-3 sm:py-2 py-3"
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

                <span className="hidden sm:flex">Twitter</span>
              </Link>
            )}
          </div>
        </div>
        <div className="max-sm:text-xs text-sm text-left pt-4 whitespace-pre-line">
          {description || <span className="opacity-60">no description</span>}{" "}
        </div>
      </div>
    </>
  );
}

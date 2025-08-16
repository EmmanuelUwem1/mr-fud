"use client";
import Image from "next/image";

type SocialLinksProps = {
  twitter?: string;
  telegram?: string;
  website?: string;
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  twitter,
  telegram,
  website,
}) => {
  const hasLinks = twitter || telegram || website;

  if (!hasLinks) return null;

  return (
    <div className="flex w-fit mx-auto bg-[#0091CA] border border-[#FFFFFF] rounded-[10px] gap-2 py-1 px-2 items-center">
      {twitter && (
        <>
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 flex items-center justify-center relative h-5 w-5"
          >
            <Image src="/icons/x.png" alt="Twitter" width={20} height={20} />
          </a>
          <span className="text-white text-xs">|</span>
        </>
      )}
      {telegram && (
        <>
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 flex items-center justify-center relative h-5 w-5"
          >
            <Image
              src="/icons/telegram.png"
              alt="Telegram"
              width={20}
              height={20}
            />
          </a>
          <span className="text-white text-xs">|</span>
        </>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 flex items-center justify-center relative h-5 w-5"
        >
          <Image
            src="/icons/website.png"
            alt="Website"
            width={20}
            height={20}
          />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;

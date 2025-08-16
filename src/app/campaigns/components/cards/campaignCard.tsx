"use client";
import Image from "next/image";

type CampaignCardProps = {
  title: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  twitter?: string;
  website?: string;
  telegram?: string;
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  bannerUrl,
  startDate,
  endDate,
  twitter,
  website,
  telegram,
}) => {
  return (
    <div className="bg-[#141414] border input-border rounded-[15px] overflow-hidden shadow-md w-full max-w-md">
      {/* Banner Image */}
      <div className="w-full h-40 relative">
        <Image
          src={bannerUrl}
          alt={`${title} banner`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-[15px]"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 text-[#F8F8F8]">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[#87DDFF]">
          {startDate} → {endDate}
        </p>

        {/* Social Links */}
        <div className="flex gap-3 mt-2">
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <span className="text-sm text-blue-400 hover:underline">
                Twitter
              </span>
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <span className="text-sm text-green-400 hover:underline">
                Website
              </span>
            </a>
          )}
          {telegram && (
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <span className="text-sm text-cyan-400 hover:underline">
                Telegram
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

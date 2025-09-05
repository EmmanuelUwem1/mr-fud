"use client";

import Image from "next/image";

type Props = {
  theme?: "dark-red" | "dark-blue" | "white";
};

export default function Socials({ theme = "dark-blue" }: Props) {
  const socials = [
    {
      title: "Telegram",
      url: "https://t.me/ocicatcoin",
      icon: "/Telegram.png",
      whiteIcon: "/telegram-blue.png",
    },
    { title: "Github", url: "/", icon: "/githab.png", whiteIcon: "/githab-blue.png" },
    { title: "X", url: "https://twitter.com/ocicatcoin", icon: "/Logo.png", whiteIcon: "/x-blue.png" },
  ];

  const bgColor =
    theme === "white"
      ? "bg-white"
      : theme === "dark-blue"
      ? "bg-[#081131]"
      : "bg-[#141414]";

  const borderColor =
    theme === "white"
      ? "border-[#4F70CC]"
      : theme === "dark-blue"
      ? "border-[#4F70CC]"
      : "border-[#BA2323]";

  return (
    <div className="flex items-center justify-center gap-4 flex-nowrap">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          className={`flex items-center justify-center ${bgColor} hover:opacity-80 transition-all rounded-full border-[0.5px] ${borderColor} h-9 w-9 p-2`}
        >
          <Image
            src={theme === "white" ? social.whiteIcon : social.icon}
            alt={`${social.title} icon`}
            width={20}
            height={20}
            priority
          />
        </a>
      ))}
    </div>
  );
}

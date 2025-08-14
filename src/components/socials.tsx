"use client";

import Image from "next/image";
import Link from "next/link";



type Props = {
  theme?: "dark-red" | "dark-blue";
};

export default function Socials({ theme = "dark-red" }: Props) {
  // const socials = [
  //   { title: "Telegram", url: "/", icon: "/Telegram.png", },
  //   { title: "Github", url: "/", icon: "/githab.png" },
  //   { title: "X", url: "/", icon: "/Logo.png" },
  // ];

  const socials = [
    { title: "Telegram", url: "/", icon: "/telegram-blue.png" },
    { title: "Github", url: "/", icon: "/githab-blue.png" },
    { title: "X", url: "/", icon: "/x-blue.png" },
  ];

  // const bgColor = theme === "dark-blue" ? "bg-[#081131]" : "bg-[#141414]"; // Dark-blue vs Dark-red
  const bgColor = "bg-white"
  // const borderColor = theme === "dark-blue" ? "border-[#4F70CC]" : "border-[#BA2323]";
  const borderColor = "border-transparent"

  return (
    <div className={`flex items-center justify-center gap-4 flex-nowrap `}>
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          className={`flex items-center justify-center ${bgColor} hover:opacity-80 transition-all rounded-full border ${borderColor} h-9 w-9 p-2`}
        >
          <Image
            src={social.icon}
            alt={`${social.title} icon`}
            width={20}
            height={20}
          />
        </a>
      ))}
    </div>
  );
}

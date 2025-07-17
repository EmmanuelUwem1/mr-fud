"use client";

import Image from "next/image";
import Link from "next/link";



type Props = {
  theme?: "dark-red" | "dark-blue";
};

export default function Socials({ theme = "dark-red" }: Props) {
  const socials = [
    { title: "Telegram", url: "/", icon: "/Telegram.png", },
    { title: "Github", url: "/", icon: "/githab.png" },
    { title: "X", url: "/", icon: "/Logo.png" },
  ];

    const bgColor = theme === "dark-blue" ? "bg-[#081131]" : "bg-[#141414]"; // Dark-blue vs Dark-red
    const borderColor = theme === "dark-blue" ? "border-[#4F70CC]" : "border-[#BA2323]";

  return (
    <div className={`flex items-center justify-center gap-4 flex-nowrap `}>
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.url}
          className={`flex items-center ${bgColor} hover:opacity-80 relative transition-class rounded-full border ${borderColor} overflow-hidden h-9 w-9 p-2`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <Image
              src={social.icon}
              alt={`${social.title} icon`}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}

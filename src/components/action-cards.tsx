"use client";
import Image from "next/image";
import Link from "next/link";

const bgColors = ["#A1120B", "#87322E", "#4B1613"];

type Action = {
  title: string;
  description: string;
  href: string;
};

type Props = {
  actions: Action[];
};

export default function ActionCards({ actions }: Props) {
  return (
    <div className="flex flex-col justify-start items-start gap-4 w-full">
      {actions.map((action, index) => (
        <Link
          key={index}
          href={action.href}
          className="w-full flex justify-between items-center rounded-[10px] px-8 py-6"
          style={{ backgroundColor: bgColors[index % bgColors.length] }}
        >
          <div className="flex-col flex justify-start items-start ">
            <h3 className="font-bold text-lg">{action.title}</h3>
            <p className="font-extralight text-lg">{action.description}</p>
          </div>
          <span className="relative flex items-center justify-center h-9 w-9">
            <Image src={"/arrow-right.png"} alt="" layout="fill" objectFit="contain" objectPosition="center" />
          </span>
        </Link>
      ))}
    </div>
  );
}

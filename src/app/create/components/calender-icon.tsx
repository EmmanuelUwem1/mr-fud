"use client";
import Image from "next/image";

const CalendarIcon = () => {
  return (
    <Image
      src="/calendar-2.png"
      alt="Calendar Icon"
      width={30}
      height={30}
      priority
    />
  );
};

export default CalendarIcon;

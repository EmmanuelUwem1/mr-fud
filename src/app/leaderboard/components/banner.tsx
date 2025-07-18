"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <section
      className="relative w-full overflow-hidden rounded-[20px] leaderboard-banner"
    >
      {/* Background Image */}
      <Image
        src="/Leader board.png"
        alt="Banner background"
        fill
        priority
        className="object-cover"
      />

     
    </section>
  );
}

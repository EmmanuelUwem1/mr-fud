"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <section
      className="relative w-full 
  h-[120px] sm:h-[180px] md:h-[240px] lg:h-[300px] xl:h-[360px] 
  overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/Leader board.png"
        alt="Banner background"
        fill
        priority
        className="object-cover"
      />

      {/* Optional Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
        {/* You can place text, logos, buttons etc. here */}
      </div>
    </section>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const pathName = usePathname();
    const isTokenPage = pathName.startsWith("/token");
    return (
      <div className="flex mb-4 w-full justify-start max-w-4xl items-center">
        <button
          className={`"text-[#FFFFFF]"} cursor-pointer`}     
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    );
    }
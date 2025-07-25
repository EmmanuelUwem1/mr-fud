"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
       <div className="flex mb-4 w-full justify-start max-w-4xl items-center">
                <button className="text-[#D92C2A] cursor-pointer" onClick={()=> router.back()} >Back</button>
            </div>
    );
    }
"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

interface TurnstileProps {
  onSuccess?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme?: string;
          callback?: () => void;
        }
      ) => void;
    };
  }
}

export default function Turnstile({ onSuccess }: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (ref.current && window.turnstile && !ref.current.hasChildNodes()) {
    window.turnstile.render(ref.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      theme: "light",
      callback: () => {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      },
    });
  }
}, [onSuccess]);


  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div ref={ref} className="cf-turnstile" />
    </>
  );
}

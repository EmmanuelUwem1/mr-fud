"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-8 px-4 text-sm text-white">
      © {year} Launchpad | All rights reserved
    </footer>
  );
}
 
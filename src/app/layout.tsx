import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "FUDClub",
  description:
    "Discover, invest, and launch the future of crypto. Our cutting-edge launchpad empowers blockchain innovators and early adopters with seamless token offerings, community-building tools, and real-time analytics—all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
<link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

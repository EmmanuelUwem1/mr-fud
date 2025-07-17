import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "FUDClub || Degen Feed",
  description:
    "Discover, invest, and launch the future of crypto. Our cutting-edge launchpad empowers blockchain innovators and early adopters with seamless token offerings, community-building tools, and real-time analytics—all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <main>{children}</main>;
}

import type { Metadata } from "next";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "FUDClub || Airdrop",
  description:
    "Discover, invest, and launch the future of crypto. Our cutting-edge launchpad empowers blockchain innovators and early adopters with seamless token offerings, community-building tools, and real-time analytics—all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
   <>
     <main className="px-4 flex flex-col justify-center items-center w-full sm:px-8 md:px-16 min-h-svh">
       {children}
     </main>
     <Footer />
   </>
 );

}

import type { Metadata } from "next";
import Footer from "@/components/footer";
import { TokensProvider } from "@/context/TokensContext";

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
 return (
   <>
     <main className="px-4 flex flex-col justify-start items-start w-full sm:px-8 md:px-16">
       <TokensProvider>{children}</TokensProvider>
     </main>
     <Footer />
   </>
 );

}

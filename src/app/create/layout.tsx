import type { Metadata } from "next";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "FUDClub || Create new coin",
  description:
    "Launch your crypto project in minutes with our intuitive token creation tool. Customize token details, set rules, and bring your idea to life—no coding required. Start building on the blockchain today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
   <>
     <main className="px-4 flex flex-col justify-start items-start w-full sm:px-8 md:px-16">  
       {children}
     </main>
     <Footer />
   </>
 );

}

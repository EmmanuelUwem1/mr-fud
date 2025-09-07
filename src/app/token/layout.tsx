"use client";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


 return (
   <>
     <main className="flex pt-4 flex-col justify-start items-start w-full min-h-screen">
       {children}
     </main>
   </>
 );

}
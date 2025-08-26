


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
   <>
     <main className="flex pt-8 flex-col justify-start items-start w-full bg-[#0D0D0D] min-h-screen">
       {children}
     </main>
   </>
 );

}
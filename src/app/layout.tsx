import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import Header from "@/components/header";
import ContextProvider from "@/context/AppKitProvider";
import { Toaster } from "react-hot-toast";
import WalletAuthGuard from "@/auth/wallet-auth";
import { TokensProvider } from "@/context/TokensContext";
import { UserProvider } from "@/context/userContext";
import NetworkStatusToast from "@/components/NetworkStatusToast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import OcicatTradesFetcher from "./token/components/ocicatTradesFetcher";

export const metadata: Metadata = {
  title: "FUDClub",
  description:
    "Discover, invest, and launch the future of crypto. Our cutting-edge launchpad empowers blockchain innovators and early adopters with seamless token offerings, community-building tools, and real-time analytics—all in one platform.",
  icons: {
    icon: "/public/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const headersObj = await headers();
  const cookies = headersObj.get("cookie");


  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
      </head>
      <body
        className={`antialiased overflow-x-hidden screen-minus-5rem flex-col flex w-full h-full items-start justify-start bg-[#0077D3]`}
      >
        <ErrorBoundary>
          <ContextProvider cookies={cookies}>
            <NetworkStatusToast />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: "#f0faff", 
                  color: "#004e7c", 
                  border: "1px solid #a0d8ef", 
                },
                success: {
                  iconTheme: {
                    primary: "#00bfff", 
                    secondary: "#e6f7ff", 
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ff6b6b", // soft red
                    secondary: "#fff0f0", // light red background
                  },
                },
              }}
            />

            <Header />
            <OcicatTradesFetcher />
            <WalletAuthGuard />
            <UserProvider>
              <TokensProvider>{children}</TokensProvider>
            </UserProvider>
          </ContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

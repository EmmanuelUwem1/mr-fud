import Image from "next/image";
import Header from "@/components/header";
import ActionCards from "@/components/action-cards";
import Socials from "@/components/socials";
export default function Home() {
  const actions = [
    {
      title: "Create now",
      description: "Connect your wallet and create for free",
      href: "/",
    },
    {
      title: "Create on X.com",
      description: "Connect your X account and create something magical",
      href: "/",
    },
    {
      title: "Create on telegram bot",
      description: "Connect your telegram account and start a club",
      href: "/",
    },
  ];
  return (
    <div className="screen-minus-5rem flex-col flex w-full items-start justify-start">
      <Header />
      <main className="flex my-auto relative justify-between h-full md:flex-nowrap flex-wrap-reverse items-center max-sm:gap-0 gap-4 px-4 sm:px-8 md:px-16 pb-20 w-full">
        <div className="flex max-md:mx-auto max-sm:my-8 flex-col gap-8 justify-start w-full sm:w-[80%] md:w-1/2 items-start">
          <div className="flex flex-col justify-start items-start gap-4 w-full max-md:pt-8 pt-8">
            <h1 className="font-extrabold text-3xl">Start a club for free.</h1>
            <p className="font-extralight text-lg">
              launch a token on any network in seconds.
            </p>
          </div>

          {/* action cards */}
          <ActionCards actions={actions} />
        </div>
        <div className="relative max-sm:-bottom-20 flex justify-center items-center w-full md:w-1/2 px-4 py-4">
          <div className="relative w-full max-w-[560px] h-[500px] sm:h-[700px] overflow-hidden">
            <Image
              alt="Illustration"
              src="/trasp1.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              priority
            />
          </div>
        </div>
      </main>

      <footer className="flex-col flex items-center justify-center gap-8 w-full px-4 sm:hidden">
        <div className="text-center flex items-center justify-center px-8">
          In a sea of noise, we bring FUD — Fearless, Unstoppable Diamondhands.
        </div>
      <Socials theme="dark-red" />
      </footer>
    </div>
  );
}

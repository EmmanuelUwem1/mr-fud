import Link from "next/link";
import Image from "next/image";
function Header() {
  const socials = [
    { title: "Telegram", url: "", icon: "/Telegram.png" },
    { title: "Github", url: "", icon: "/Github.png" },
    { title: "X", url: "", icon: "/X.png" },
  ];
  return (
    <header className="flex justify-between items-center h-20 px-4 sm:px-8 md:px-16">
      {/* logo */}
      <span className="font-bold text-white text-2xl">FUDClub</span>

      {/* nav links */}
      <nav className="flex justify-center items-center gap-8">
        <Link href={"/degen"}>Degen Feed</Link>
        <Link href={"/staking"}>Staking</Link>
        <Link href={"/leaderboard"}>Leaderboard</Link>
        <Link href={"/airdrop"}>Airdrop</Link>
        
      </nav>
      {/* socials */}
      <div className="flex justify-center items-center gap-4">
        <span className="bg-[#081131] relative">
          {socials.map((social, index) => 
          )}
          <Image src={""} />
        </span>
      </div>
      {/* buttons */}
      <div className="flex justify-center items-center gap-4"></div>
    </header>
  );
}

export default Header
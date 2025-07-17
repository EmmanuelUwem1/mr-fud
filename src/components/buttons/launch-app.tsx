import Link from "next/link";
function LaunchApp() {
  return <Link href={"/"} className="text-white bg-[#FF3C38] rounded-[7px] px-6 py-3 font-bold text-base sm:text-lg transition-class hover:opacity-80 launch">Launch App</Link>;
}

export default LaunchApp
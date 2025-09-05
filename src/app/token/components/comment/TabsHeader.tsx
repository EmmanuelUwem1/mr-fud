import Image from "next/image";
import WalletAndDateFlex from "../walletAndDateFlex";

export default function TabsHeader({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  tabs,
  mobileTabs,
  ca,
  createdDate,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  tabs: string[];
  mobileTabs: string[];
  ca: string;
  createdDate: string;
}) {
  return (
    <>
      {/* Desktop Tabs */}
      <div className="hidden border-b border-[#013253] sm:flex w-full justify-between items-center">
        <div className="flex gap-4 mb-2 w-fit text-xs font-semibold cursor-pointer">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex relative rounded-[6px] px-4 py-3 ${
                activeTab === tab ? "bg-[#00C3FE] tab-underline" : "text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="w-full lg:flex justify-end items-center gap-4 hidden">
          <WalletAndDateFlex ca={ca} createdDate={createdDate} />
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="sm:hidden flex justify-start items-center border-b border-[#013253] sm:px-4 py-3 text-xs font-semibold w-full">
        {mobileTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-[6px] ${
              activeTab === tab
                ? "bg-[#00C3FE] tab-underline text-white"
                : "text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
        <span
          className={`relative flex items-center justify-center h-5 w-5 ml-auto cursor-pointer transition-class ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Image
            alt="collapse toggle"
            src={"/Reveal arrow.png"}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </span>
      </div>
    </>
  );
}

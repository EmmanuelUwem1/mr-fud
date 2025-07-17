"use client"
import Banner from "./components/feedBanner";
import FeaturedSection from "./components/featured-section";
import TokensSection from "./components/tokens-section";
function Page() {
  return (
    <div className="flex w-full items-start flex-col justify-start">
      <Banner />
      <FeaturedSection />
      <TokensSection />
    </div>
  )
}

export default Page
import HeroSection from "./components/HeroSection"
import { Service } from "@/services/services"
import Services from "@/components/home/Services"
import OfficeSection from "./components/OfficeSection"
import AwardsSection from "./components/AwardsSection"

export default function PuneLocationPage() {
  return (
    <>
      <HeroSection
        city="Pune"
        bannerUrl="/img/pune-skyline.png"
      />
      <Services />
      <OfficeSection />
    </>
  )
}

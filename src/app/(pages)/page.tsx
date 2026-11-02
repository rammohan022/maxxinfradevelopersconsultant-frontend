import {
  Hero,
  PropertyCategories,
  GoyalaCitySpotlight,
  FeaturedProperties,
  SellRentSection,
  EmiCalculatorSection,
  LocationsSection,
  Testimonials,
  Contact,
} from '@/components/home';
import { CallToAction } from '@/components/ui';

export default function Home() {
  return (
    <>
      <Hero />
      <PropertyCategories />
      <GoyalaCitySpotlight />
      <FeaturedProperties />
      <SellRentSection />
      <EmiCalculatorSection />
      <LocationsSection />
      <CallToAction
        badge="Zero Brokerage Assurance"
        title="Looking to Buy or Sell Property in Lucknow?"
        description="Connect with Maxx Infra Developers & Consultant today. We provide 100% verified titles, complete legal registry support, bank loan assistance, and complimentary cab site tours across Lucknow."
        buttons={[
          { label: "Book Free Site Visit", href: "/contact", primary: true },
          { label: "Browse Properties for Sale", href: "/properties" },
        ]}
      />
      <Testimonials />
      <Contact />
    </>
  );
}

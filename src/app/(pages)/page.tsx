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
        title="Looking to Buy, Sell or Resell Property in Lucknow S.C.R?"
        description="Connect with Maxx Infra Developers & Consultant today. Visit our office at G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow or call our official desk at +91 79051 45968 / +91 63861 00070 for zero brokerage deals and free cab site tours."
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

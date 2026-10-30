import {
  Hero,
  PropertyCategories,
  GoyalaCitySpotlight,
  FeaturedProperties,
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
      <EmiCalculatorSection />
      <LocationsSection />
      <CallToAction
        badge="Zero Brokerage Assurance"
        title="Looking to Buy or Invest in Lucknow Real Estate?"
        description="Connect with Maxx Infra Developers & Consultant today. We provide 100% verified titles, complete legal registry support, bank loan assistance, and complimentary cab site tours across Lucknow."
        buttons={[
          { label: "Book Free Site Visit", href: "/contact", primary: true },
          { label: "Browse All Properties", href: "/properties" },
        ]}
      />
      <Testimonials />
      <Contact />
    </>
  );
}

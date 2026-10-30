import type { Metadata } from 'next';
import { Hero, FirmOverview, WhyChooseUs, ValuesPhilosophy, StatsAchievements } from '@/components/about';
import { CallToAction } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Us | Maxx Infra Developers & Consultant',
  description:
    'Maxx Infra Developers & Consultant is Lucknow & NCR\'s trusted property development & real estate consultancy firm. Verified villas, row houses, and gated township plots with zero brokerage.',
  openGraph: {
    title: 'About Us | Maxx Infra Developers & Consultant',
    description:
      'Trusted property development & real estate consultancy firm in Lucknow. Verified villas, row houses, and plots with transparent pricing.',
    url: 'https://maxxinfradevelopersconsultant.com/about',
    siteName: 'Maxx Infra Developers & Consultant',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <FirmOverview />
      <WhyChooseUs />
      <ValuesPhilosophy />
      <StatsAchievements />
      <CallToAction
        badge="Direct Developer Support"
        title="Find Your Dream Property in Lucknow & NCR"
        description="Whether you are looking for ready-to-move row houses, luxury duplex villas, or high-appreciation gated plots, Maxx Infra provides verified titles and complete registry support."
        buttons={[
          { label: "Book Free Site Visit", href: "/contact", primary: true },
          { label: "View All Properties", href: "/properties" },
        ]}
      />
    </>
  );
}

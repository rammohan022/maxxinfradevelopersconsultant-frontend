import type { Metadata } from 'next'
import { Hero, FirmOverview, WhyChooseUs, ValuesPhilosophy, StatsAchievements, RecognitionAwards } from '@/components/about'
import { CallToAction } from '@/components/ui'
import { FAQs } from '@/components/home'
import SeoHead from '@/components/seo/SeoHead'

export const metadata: Metadata = {
  title: 'About People Consulting | HR Compliance & Recruitment',
  description:
    'People Consulting offers HR compliance services, Labour law compliance services, HR Consulting, Recruitment consulting, Corporate Training and Talent management Solutions across India.',
  openGraph: {
    title: 'About People Consulting | HR Compliance, Recruitment & Talent Management',
    description:
      'Trusted HR consulting partner with 15+ years of experience in HR compliance, labour law compliance, recruitment consulting and talent management.',
    url: 'https://peopleconsultings.com/about-us',
    siteName: 'People Consulting',
    images: [
      {
        url: 'https://peopleconsultings.com/img/about-hero-bg-v3.png',
        alt: 'People Consulting team providing HR compliance and recruitment consulting services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About People Consulting | HR Compliance, Recruitment & Talent Management',
    description:
      'Trusted HR consulting partner with 15+ years of experience in HR compliance, labour law compliance, recruitment consulting and talent management.',
    images: ['https://peopleconsultings.com/img/about-hero-bg-v3.png'],
  },
  alternates: {
    canonical: 'https://peopleconsultings.com/about-us',
  },
}

const AboutPage = () => {
  return (
    <>
      <SeoHead
        title="About People Consulting | HR Compliance & Recruitment"
        description="People Consulting offers HR compliance services, Labour law compliance services, HR Consulting, Recruitment consulting, Corporate Training and Talent management Solutions across India."
        ogTitle="About People Consulting | HR Compliance, Recruitment & Talent Management"
        ogDescription="Trusted HR consulting partner with 15+ years of experience in HR compliance, labour law compliance, recruitment consulting and talent management."
        twitterTitle="About People Consulting | HR Compliance, Recruitment & Talent Management"
        twitterDescription="Trusted HR consulting partner with 15+ years of experience in HR compliance, labour law compliance, recruitment consulting and talent management."
        canonicalPath="/about-us"
        image="/img/about-hero-bg-v3.png"
      />
      <Hero />
      <FirmOverview />
      <WhyChooseUs />
      <ValuesPhilosophy />
      <StatsAchievements />
      {/* <RecognitionAwards /> */}
      <FAQs category="About" />
      <CallToAction
        title="Let’s Build a Compliant, High-Performing Workforce Together"
        description="Whether you need HR compliance services, labour law compliance support, recruitment consulting, or talent management solutions, People Consulting is ready to help."
        buttons={[
          { label: "Get In Touch", href: "/contact-us", primary: true },
          { label: "HR Solutions", href: "/services" },
          { label: "Looking for Job", href: "/career" },
        ]}
      />
    </>
  );
};

export default AboutPage;
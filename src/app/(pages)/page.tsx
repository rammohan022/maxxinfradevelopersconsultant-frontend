import {
  Hero,
  FeatureCards,
  AboutUs,
  Services,
  IndustriesServe,
  FeaturesHRMS,
  HowItWorks,
  CoreValues,
  CorporateTraining,
  Testimonials,
  Blog,
  FAQs,
  Contact,
  DemoModal,
} from '@/components/home'
import { CallToAction } from '@/components/ui'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Services />
      <IndustriesServe />
      <FeaturesHRMS />
      <HowItWorks />
      <CallToAction
        badge="Connect with us"
        title="Let’s Build Better Workplaces Together"
        description="Whether you need reliable HR Consulting services, expert labour law compliance services, strategic recruitment consulting partner, or effective corporate training services, we bring together HR expertise, practical solutions and technology to help your organisation streamline HR operations, strengthen compliance and achieve sustainable business growth."
        buttons={[
          { label: "Connect With Us", href: "/contact-us", primary: true },
        ]}
      />
      <CoreValues />
      <CorporateTraining />
      <Testimonials />
      <Blog />
      <FeatureCards />
      <FAQs />
      <Contact />
      <DemoModal />
    </>
  )
}

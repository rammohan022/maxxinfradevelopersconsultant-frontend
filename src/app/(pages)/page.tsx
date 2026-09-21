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
  FloatingButtons,
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
      <CallToAction />
      <CoreValues />
      <CorporateTraining />
      <Testimonials />
      <Blog />
      <FeatureCards />
      <FAQs />
      <Contact />
      <FloatingButtons />
      <DemoModal />
    </>
  )
}

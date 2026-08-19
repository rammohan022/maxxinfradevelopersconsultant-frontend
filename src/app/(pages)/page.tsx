import {
  Hero,
  FeatureCards,
  AboutUs,
  Services,
  IndustriesServe,
  FeaturesHRMS,
  CoreValues,
  CorporateTraining,
  Testimonials,
  Blog,
  FAQs,
  Contact,
  FloatingButtons,
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
      <CallToAction />
      <CoreValues />
      <CorporateTraining />
      <Testimonials />
      <Blog />
      <FeatureCards />
      <FAQs />
      <Contact />
      <FloatingButtons />
    </>
  )
}

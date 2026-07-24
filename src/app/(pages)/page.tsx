import {
  Hero,
  FeatureCards,
  AboutUs,
  Services,
  IndustriesServe,
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
      <FeatureCards />
      <AboutUs />
      <Services />
      <IndustriesServe />
      <CallToAction />
      <CoreValues />
      <CorporateTraining />
      <Testimonials />
      <Blog />
      <FAQs />
      <Contact />
      <FloatingButtons />
    </>
  )
}

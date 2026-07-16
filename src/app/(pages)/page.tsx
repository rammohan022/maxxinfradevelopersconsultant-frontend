import {
  Hero,
  FeatureCards,
  AboutUs,
  Services,
  WhyChooseUs,
  IndustriesServe,
  OurProcess,
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
            <CallToAction />
      <WhyChooseUs />
      <IndustriesServe />
      <OurProcess />
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

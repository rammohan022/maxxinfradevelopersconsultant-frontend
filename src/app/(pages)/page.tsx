import { Hero, FeatureCards, AboutUs, Services, WhyChooseUs, CaseStudy, CTAQuote, Contact, Testimonials, Attorneys, Partners, Blog } from '@/components/home'
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
      {/* <CaseStudy /> */}
      <CTAQuote />
      <Contact />
      <Testimonials />
      <Attorneys />
      {/* <Partners /> */}
      <Blog />
    </>
  )
}

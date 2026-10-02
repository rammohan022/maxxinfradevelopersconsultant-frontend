import { Hero, FirmOverview, WhyChooseUs, ValuesPhilosophy, StatsAchievements, RecognitionAwards } from '@/components/about'
import { CallToAction } from '@/components/ui'
import { FAQs } from '@/components/home'

const AboutPage = () => {
  return (
    <>
      <Hero />
      <FirmOverview />
      <WhyChooseUs />
      <ValuesPhilosophy />
      <StatsAchievements />
      {/* <RecognitionAwards /> */}
      <FAQs category="About" />
      <CallToAction />
    </>
  );
};

export default AboutPage;
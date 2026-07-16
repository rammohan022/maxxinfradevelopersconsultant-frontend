import { Hero, FirmOverview, WhyChooseUs, ValuesPhilosophy, StatsAchievements, RecognitionAwards } from '@/components/about'
import { CallToAction } from '@/components/ui'

const AboutPage = () => {
  return (
    <>
      <Hero />
      <FirmOverview />
      <WhyChooseUs />
      <ValuesPhilosophy />
      <StatsAchievements />
      {/* <RecognitionAwards /> */}
      <CallToAction />
    </>
  );
};

export default AboutPage;
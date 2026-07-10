import Services from '@/components/home/Services';
import { Hero } from '@/components/services'; 
import { CallToAction } from '@/components/ui';

const PracticeAreasPage = () => {
  return (
    <div>
       <Hero
        title="Practice Areas"
        subtitle="Offering legal expertise across diverse practice areas to help clients navigate legal challenges and achieve favorable outcomes."
      />
      <Services />
      <CallToAction/>
    </div>
  )
}

export default PracticeAreasPage
import CategoryServicesClient from './category/components/CategoryServicesClient';
import { Hero } from '@/components/services';
import { CallToAction } from '@/components/ui';

const PracticeAreasPage = () => {
  return (
    <div>
      <Hero
        title="Our Services"
        subtitle="Offering comprehensive consulting and strategic solutions to help clients navigate industry challenges and achieve key goals."
      />
      <CategoryServicesClient />
      <CallToAction />
    </div>
  )
}

export default PracticeAreasPage
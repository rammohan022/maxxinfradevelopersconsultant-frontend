'use client'

import Link from 'next/link'
import { Container } from '@/components/ui'
import { motion, Variants } from 'framer-motion'
import { getImageUrl } from '@/lib/utils/imageUtils'
import {
  Scale,
  Gavel,
  FileText,
  Shield,
  Building2,
  Briefcase,
  Users,
  Landmark,
  Banknote,
  Lock,
  BriefcaseBusiness,
  Home,
  Smartphone,
  ArrowRight,
} from 'lucide-react'
import { useGetServicesQuery, Service } from '@/services/services'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'apostille-service': FileText,
  'criminal-cases': Gavel,
  'ed-cases': Shield,
  'pmla-cases': Lock,
  'eow-cases': BriefcaseBusiness,
  'cyber-crime': Smartphone,
  'arbitration-adr': Scale,
  'arbitration-alternative-dispute-resolution': Scale,
  'banking-finance': Banknote,
  'corporate-commercial': Building2,
  'mergers-acquisitions': Briefcase,
  'intellectual-property': FileText,
  'real-estate': Home,
  'labor-employment': Users,
  'litigation': Landmark,
  'white-collar-crime': BriefcaseBusiness,
  'hiring-staffing': Users,
  'hr-training': Briefcase,
  'labor-compliance': Shield,
  'executive-search': Briefcase,
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Services() {
  const fallbackAreas: Service[] = [
    {
      id: '1',
      title: 'Hiring & Staffing',
      slug: 'hiring-staffing',
      innerImage: '/img/hr_hero_bg_1783707638359.png',
      overview: 'We provide end-to-end recruitment solutions to help you find the best talent for your organization. Our extensive network and rigorous screening process ensure you get candidates who are not just skilled, but also a great cultural fit.'
    },
    {
      id: '2',
      title: 'HR Training',
      slug: 'hr-training',
      innerImage: '/img/hr_training_1783707657031.png',
      overview: 'Empower your workforce with our comprehensive corporate training programs. We focus on leadership development, soft skills, and technical training to maximize employee productivity and engagement.'
    },
    {
      id: '3',
      title: 'Labor Compliance',
      slug: 'labor-compliance',
      innerImage: '/img/hr_about_us_1783707647467.png',
      overview: 'Navigate complex labor laws seamlessly. Our team manages payroll administration and ensures strict adherence to all statutory compliance and regulatory requirements to keep your business risk-free.'
    },
    {
      id: '4',
      title: 'Executive Search',
      slug: 'executive-search',
      innerImage: '/img/hr_hero_bg_1783707638359.png',
      overview: 'Find visionary leaders to steer your company towards success. We specialize in identifying and placing top-tier C-level executives who align with your strategic goals.'
    }
  ]

  const { data: apiAreas = [] } = useGetServicesQuery()
  const areas = apiAreas.length > 0 ? apiAreas : fallbackAreas

  return (
    <section className="py-16 md:py-14 bg-slate-50" id="services">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            What We Offer
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Providing comprehensive HR and recruitment solutions, assisting organizations in addressing talent acquisition, training, and compliance matters efficiently.
          </p>
        </motion.div>

        {/* Unified Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {areas.map((area, index) => {
            const normalizedSlug = area.slug.replace(/[\u2013\u2014]/g, '-').toLowerCase();
            const Icon = iconMap[normalizedSlug] ||
              Object.entries(iconMap).find(([key]) => normalizedSlug.startsWith(key))?.[1] ||
              Scale;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {area.title}
                </h3>
                <div
                  className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-5 flex-1"
                  dangerouslySetInnerHTML={{ __html: area.overview || "" }}
                />
                <Link
                  href={`/services/${area.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-secondary hover:text-primary font-bold transition-colors text-xs sm:text-sm uppercase tracking-wider group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

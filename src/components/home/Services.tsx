'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui'
import { motion, AnimatePresence, Variants } from 'framer-motion'
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
  ChevronDown,
} from 'lucide-react'
import { PracticeArea } from '@/services/practice-area'

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
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Services() {
  const areas: PracticeArea[] = [
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

  const [selectedPracticeArea, setSelectedPracticeArea] = useState<PracticeArea>(areas[0])
  const [openMobileSections, setOpenMobileSections] = useState<Set<string>>(new Set())

  const activeArea = selectedPracticeArea;

  // No longer returning null since we use hardcoded data

  const handlePracticeAreaSelect = (area: PracticeArea) => {
    setSelectedPracticeArea(area)
  }

  const toggleMobileSection = (id: string) => {
    const newOpenSections = new Set(openMobileSections)
    const idStr = id.toString()
    if (newOpenSections.has(idStr)) {
      newOpenSections.delete(idStr)
    } else {
      newOpenSections.add(idStr)
    }
    setOpenMobileSections(newOpenSections)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="mb-10 lg:mb-12"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy font-serif-heading leading-tight max-w-3xl">
            What We Offer
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
            Providing comprehensive HR and recruitment solutions, assisting organizations in addressing talent acquisition, training, and compliance matters efficiently.
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:flex rounded-2xl overflow-hidden shadow-xl border border-gray-100 min-h-[560px] bg-white"
        >
          <aside className="w-[320px] flex-shrink-0 bg-navy flex flex-col shadow-2xl z-10">
            <div className="p-5 border-b border-white/10 bg-navy-light/30">
              <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Select Service</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-3 scroll-smooth max-h-[520px] custom-scrollbar">
              {areas.map((area) => {
                const normalizedSlug = area.slug.replace(/[\u2013\u2014]/g, '-').toLowerCase();
                const Icon = iconMap[normalizedSlug] ||
                  Object.entries(iconMap).find(([key]) => normalizedSlug.startsWith(key))?.[1] ||
                  Scale;
                const isActive = activeArea?.id === area.id;

                return (
                  <button
                    key={area.id}
                    onClick={() => handlePracticeAreaSelect(area)}
                    className={`w-full flex items-center gap-4 px-6 py-3.5 text-left transition-all duration-300 relative overflow-hidden ${isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:bg-white/5 hover:text-white/90'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white/50'}`} />
                    <span className="font-medium text-[15px] leading-snug truncate pr-2">{area.title}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          <div className="flex-1 relative min-h-[560px] bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea?.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeArea.innerImage || ""}
                  alt={activeArea?.title || ""}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />

                <div className="absolute inset-0 flex items-center p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-2xl bg-white rounded-lg p-4"
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold font-serif-heading mb-4 drop-shadow-md">
                      {activeArea?.title}
                    </h3>
                    <div
                      className="text-navy text-lg leading-relaxed mb-8 line-clamp-6 drop-shadow"
                      dangerouslySetInnerHTML={{ __html: activeArea?.overview || "" }}
                    />
                    <Link
                      href={`/services/${activeArea?.slug}`}
                      className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-navy transition-all duration-300 group shadow-lg"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {areas.map((area, index) => {
            const normalizedSlug = area.slug.replace(/[\u2013\u2014]/g, '-').toLowerCase();
            const Icon = iconMap[normalizedSlug] ||
              Object.entries(iconMap).find(([key]) => normalizedSlug.startsWith(key))?.[1] ||
              Scale;
            const isOpen = openMobileSections.has(area.id.toString())

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleMobileSection(area.id.toString())}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-navy text-base">{area.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 pt-2 border-t border-gray-50">
                        <div
                          className="text-gray-600 text-sm mb-5 line-clamp-4 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: area.overview || "" }}
                        />
                        <Link href={`/services/${area.slug}`} className="inline-flex items-center justify-center w-full gap-2 bg-gray-50 hover:bg-primary hover:text-white text-primary font-semibold py-3 rounded-lg transition-colors">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

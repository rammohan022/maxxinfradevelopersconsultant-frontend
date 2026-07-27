'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { slugifyCategory } from '@/lib/utils/slugUtils'
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
  Sparkles,
  Layers,
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
  'banking-finance': Banknote,
  'corporate-commercial': Building2,
  'mergers-acquisitions': Briefcase,
  'intellectual-property': FileText,
  'real-estate': Home,
  'labor-employment': Users,
  'litigation': Landmark,
  'hiring-staffing': Users,
  'hr-training': Briefcase,
  'labor-compliance': Shield,
  'executive-search': Briefcase,
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const fallbackAreas: Service[] = [
    {
      id: '1',
      title: 'Hiring & Staffing',
      slug: 'hiring-staffing',
      category: 'Hiring Services',
      innerImage: '/img/hr_hero_bg_1783707638359.png',
      overview: 'We provide end-to-end recruitment solutions to help you find the best talent for your organization.'
    },
    {
      id: '2',
      title: 'HR Training',
      slug: 'hr-training',
      category: 'Training Services',
      innerImage: '/img/hr_training_1783707657031.png',
      overview: 'Empower your workforce with our comprehensive corporate training programs.'
    },
    {
      id: '3',
      title: 'Labor Compliance',
      slug: 'labor-compliance',
      category: 'Compliance Services',
      innerImage: '/img/hr_about_us_1783707647467.png',
      overview: 'Navigate complex labor laws seamlessly and ensure strict adherence to statutory compliance.'
    },
    {
      id: '4',
      title: 'Executive Search',
      slug: 'executive-search',
      category: 'Hiring Services',
      innerImage: '/img/hr_hero_bg_1783707638359.png',
      overview: 'Find visionary leaders to steer your company towards success.'
    }
  ]

  const { data: apiAreas = [] } = useGetServicesQuery()
  const publishedApiAreas = (apiAreas || []).filter((s) => s.status !== 'Draft')
  const areas = publishedApiAreas.length > 0 ? publishedApiAreas : fallbackAreas

  // Extract categories dynamically from services data
  const categoriesList = useMemo(() => {
    const map = new Map<string, { name: string; slug: string; count: number }>()

    areas.forEach((s) => {
      const catName = s.category || 'General Services'
      const slug = slugifyCategory(catName)
      const existing = map.get(slug)
      if (existing) {
        existing.count += 1
      } else {
        map.set(slug, { name: catName, slug, count: 1 })
      }
    })

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [areas])

  // Filter services by selected category tab
  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return areas
    return areas.filter((s) => {
      const catSlug = slugifyCategory(s.category || 'General Services')
      return catSlug === activeCategory
    })
  }, [areas, activeCategory])

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-slate-200/60" id="services">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-secondary" />
            Our Practice & Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Comprehensive Corporate HR Solutions
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Providing tailored HR management, talent acquisition, labor compliance, and corporate training solutions for modern enterprises.
          </p>
        </motion.div>

        {/* Category Tabs Bar */}
        {categoriesList.length > 0 && (
          <div className="flex items-center justify-center gap-2.5 flex-wrap mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span>All Services</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {areas.length}
              </span>
            </button>

            {categoriesList.map((cat) => {
              const isActive = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Services Card Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {filteredServices.map((area, index) => {
              const normalizedSlug = area.slug.replace(/[\u2013\u2014]/g, '-').toLowerCase()
              const Icon =
                iconMap[normalizedSlug] ||
                Object.entries(iconMap).find(([key]) => normalizedSlug.startsWith(key))?.[1] ||
                Scale

              const categoryName = area.category || 'General Services'
              const categorySlug = slugifyCategory(categoryName)

              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group p-6 rounded-2xl border border-slate-200/80 bg-white hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full relative"
                >
                  {/* Top Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Link
                      href={`/services/category/${categorySlug}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 group-hover:bg-primary/10 text-slate-600 group-hover:text-primary text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <Layers size={12} className="text-secondary shrink-0" />
                      <span className="line-clamp-1">{categoryName}</span>
                    </Link>

                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {area.title}
                  </h3>

                  {/* Overview Text */}
                  <div
                    className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-4 flex-1"
                    dangerouslySetInnerHTML={{
                      __html: area.overview
                        ? area.overview.replace(/<[^>]*>?/gm, '').substring(0, 140) + '...'
                        : '',
                    }}
                  />

                  {/* Bottom Action CTA */}
                  <Link
                    href={`/services/${area.slug}`}
                    className="mt-auto inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-secondary hover:text-primary font-bold transition-colors text-xs uppercase tracking-wider group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}

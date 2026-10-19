'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { ShieldCheck, ChevronDown, Loader2 } from 'lucide-react'
import { useGetComplianceServicesQuery } from '@/services/complianceServices'
import { getImageUrl } from '@/lib/utils/imageUtils'
import { motion, AnimatePresence } from 'framer-motion'

const fallbackServices = [
  {
    id: '1',
    title: 'Establishment Compliance',
    desc: 'Ensuring full compliance across shops, offices, and commercial establishments nationwide.',
    image: '/img/capabilities_card.png',
    link: '/services',
  },
  {
    id: '2',
    title: 'Factory Compliance',
    desc: 'Comprehensive factory law compliance ensuring operational safety and regulatory adherence.',
    image: '/img/manufacturing_industry.png',
    link: '/services',
  },
  {
    id: '3',
    title: 'Licensing & Registration Services',
    desc: 'End-to-end business licensing and statutory registrations across all jurisdictions.',
    image: '/img/practice-details-bg.png',
    link: '/services',
  },
  {
    id: '4',
    title: 'Vendor Compliance',
    desc: 'Monitoring contractor and vendor statutory compliance to minimize principal employer risk.',
    image: '/img/values-philosophy.png',
    link: '/services',
  },
  {
    id: '5',
    title: 'Payroll Processing Services',
    desc: 'Accurate, timely payroll processing with complete statutory and regulatory alignment.',
    image: '/img/tech_industry.png',
    link: '/services',
  },
  {
    id: '6',
    title: 'Payroll Advisory Services',
    desc: 'Strategic payroll structuring to ensure efficiency, compliance, and cost optimization.',
    image: '/img/finance_industry.png',
    link: '/services',
  },
  {
    id: '7',
    title: 'Payroll Related Compliance',
    desc: 'Managing PF, ESI, TDS, and statutory payroll compliance seamlessly.',
    image: '/img/dashbaord.jpeg',
    link: '/services',
  },
  {
    id: '8',
    title: 'Notice & Inspection Handling',
    desc: 'Professional handling of regulatory notices, inspections, and authority communications.',
    image: '/img/hr_about_us_1783707647467.png',
    link: '/services',
  },
  {
    id: '9',
    title: 'HR & Compliance Onboarding',
    desc: 'Structured Employee Onboarding with Statutory Compliance, Documentation & Labour Law Alignment.',
    image: '/img/team-hero-bg.png',
    link: '/services',
  },
]

export default function ComplianceServicesSlider() {
  const [showAll, setShowAll] = useState(false)
  const { data: apiServices, isLoading } = useGetComplianceServicesQuery()

  // Use API services or fallback to the 9 specified items
  const services = apiServices && apiServices.length > 0 ? apiServices : fallbackServices

  // Initially display 6 cards (2 rows of 3); show all 9 when showAll is true
  const visibleServices = showAll ? services : services.slice(0, 6)

  return (
    <section id="compliance-services" className="py-14 sm:py-16 md:py-20 bg-white relative border-b border-slate-200/80 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold">
              What We Handle
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Our Labour Law Compliance Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Comprehensive coverage across every stage of your business&apos;s regulatory journey, from labour law compliance in HR to day-to-day statutory filings.
          </p>
        </div>

        {/* 3-Cards Per Row Responsive Grid */}
        {isLoading && !apiServices ? (
          <div className="py-16 flex items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs">Loading services...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {visibleServices.map((service, index) => {
                const imgUrl = service.image ? getImageUrl(service.image) : '/img/capabilities_card.png'
                const targetLink = service.link || '/services'

                return (
                  <motion.div
                    key={service.id || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, delay: (index % 3) * 0.06 }}
                    className="flex flex-col h-full"
                  >
                    <Link
                      href={targetLink}
                      className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-slate-200/90 hover:border-secondary/40 flex flex-col h-full transform hover:-translate-y-1 block"
                    >
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative h-36 sm:h-40 w-full bg-slate-100 shrink-0 z-10">
                        {/* Overflow-hidden container for image & hover zoom */}
                        <div className="relative w-full h-full overflow-hidden">
                          <Image
                            src={imgUrl}
                            alt={service.title}
                            fill
                            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                        </div>

                        {/* Centered Overlapping Shield Badge (not clipped) */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-orange-100 z-20 group-hover:scale-110 group-hover:border-secondary transition-all duration-300">
                          <ShieldCheck size={18} className="text-secondary" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 pt-7 sm:pt-8 pb-5 sm:pb-6 flex flex-col flex-grow items-center text-center bg-white relative z-0">
                        <h3 className="font-bold text-sm sm:text-[15px] text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors duration-200">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {service.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Show More / Show Less Toggle Button */}
        {services.length > 6 && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group"
            >
              <span>{showAll ? 'Show Less Services' : 'Show More Services'}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-300 ${
                  showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>
            {!showAll && (
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Showing 6 of {services.length} services (3 more available)
              </p>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

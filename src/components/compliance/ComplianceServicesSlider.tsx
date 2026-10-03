'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useGetComplianceServicesQuery } from '@/services/complianceServices'
import { getImageUrl } from '@/lib/utils/imageUtils'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
  const { data: apiServices, isLoading } = useGetComplianceServicesQuery()

  // Use API services or fallback to initial reference items
  const services = (apiServices && apiServices.length > 0) ? apiServices : fallbackServices

  return (
    <section id="compliance-services" className="py-14 sm:py-16 md:py-20 bg-white relative border-b border-slate-200/80 overflow-hidden">
      <Container>
        {/* Header with Title and Arrow Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="text-center md:text-left max-w-2xl space-y-2">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
                What We Handle
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Our Compliance Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Comprehensive coverage across every stage of your business&apos;s regulatory journey.
            </p>
          </div>

          {/* Navigation Arrows for viewing remaining cards */}
          <div className="flex items-center justify-center md:justify-end gap-2.5 shrink-0">
            <button
              aria-label="Previous Slide"
              className="swiper-button-prev-compliance w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-primary hover:text-white hover:border-primary shadow-xs flex items-center justify-center text-slate-600 transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:pointer-events-none active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next Slide"
              className="swiper-button-next-compliance w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-primary hover:text-white hover:border-primary shadow-xs flex items-center justify-center text-slate-600 transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:pointer-events-none active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          {isLoading && !apiServices ? (
            <div className="py-16 flex items-center justify-center text-slate-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-xs">Loading services...</span>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              navigation={{
                nextEl: '.swiper-button-next-compliance',
                prevEl: '.swiper-button-prev-compliance',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                el: '.swiper-pagination-compliance',
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={services.length > 3}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1.15, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="w-full pb-8 !overflow-visible"
            >
              {services.map((service, index) => {
                const imgUrl = service.image ? getImageUrl(service.image) : '/img/capabilities_card.png'
                const targetLink = service.link || '/services'

                return (
                  <SwiperSlide key={service.id || index} className="!h-auto flex flex-col">
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-slate-200/90 hover:border-secondary/40 flex flex-col h-full transform hover:-translate-y-1">
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={imgUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                        {/* Centered Overlapping Shield Badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-orange-100 z-10 group-hover:scale-110 transition-transform duration-300">
                          <ShieldCheck size={20} className="text-secondary" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 pt-7 sm:p-6 sm:pt-8 flex flex-col flex-grow items-center text-center bg-white">
                        <h3 className="font-bold text-sm sm:text-base text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors duration-200">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-5 flex-grow leading-relaxed line-clamp-3 min-h-[48px]">
                          {service.desc}
                        </p>

                        {/* Read More Internal Link */}
                        <Link
                          href={targetLink}
                          className="mt-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50/80 hover:bg-secondary hover:text-white hover:border-secondary text-slate-700 text-xs font-semibold transition-all duration-200 shadow-2xs group-hover:border-secondary/40"
                        >
                          <span>Read More</span>
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          )}

          {/* Dots Pagination */}
          <div className="swiper-pagination-compliance flex justify-center items-center mt-4" />
        </div>
      </Container>
    </section>
  )
}

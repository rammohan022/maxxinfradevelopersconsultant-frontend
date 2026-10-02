'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, CallToAction } from '@/components/ui'
import { FAQs } from '@/components/home'
import { CheckCircle2, ArrowRight } from 'lucide-react'

interface IndustrySector {
  name: string
  image: string
  desc: string
  specializedLabel?: string
  subIndustries?: string[]
  features: string[]
}

const industrySectors: IndustrySector[] = [
  {
    name: 'Automotive & Auto Components',
    image: '/img/capabilities_card.png',
    desc: 'HR and workforce solutions for automotive manufacturers, suppliers, and component businesses.',
    features: [
      'OEM & Tier-1/Tier-2 supplier talent acquisition',
      'Assembly line & shop-floor technical manpower',
      'Auto design, R&D & testing engineers',
      'Plant HR operations & factory compliance',
      'Supply chain & procurement specialist hiring',
      'Lean manufacturing & industrial safety (EHS)',
      'Shift-based workforce management',
      'Multi-plant statutory compliance audits'
    ]
  },
  {
    name: 'Manufacturing & Engineering',
    image: '/img/manufacturing_industry.png',
    desc: 'End-to-end HR and compliance support for manufacturing and engineering-driven organizations.',
    specializedLabel: 'Specialized Sectors',
    subIndustries: [
      'Pharma manufacturing',
      'FMCG',
      'Chemicals',
      'Consumer Electronics'
    ],
    features: [
      'Plant operations & factory leadership',
      'Quality assurance & Lean Six Sigma specialists',
      'Production planning & maintenance engineering',
      'EHS & industrial safety compliance',
      'Factory licensing & statutory registrations',
      'Contract staffing & payroll management',
      'Automation & robotics engineering teams',
      'Multi-unit labor law management'
    ]
  },
  {
    name: 'IT & Technology',
    image: '/img/tech_industry.png',
    desc: 'Specialized recruitment, HR consulting, and workforce solutions for technology and IT businesses.',
    features: [
      'Full-stack software developers & cloud engineers',
      'Product management & UI/UX designers',
      'Contract-to-hire & permanent tech staffing',
      'IT payroll & remote contractor compliance',
      'Tech leadership & executive hiring',
      'Fast-track hiring scale-ups for startups',
      'Remote & hybrid workforce governance',
      'Tech compensation & ESOP benchmarking'
    ]
  },
  {
    name: 'Home Appliances & Consumer Electronics',
    image: '/img/tech_industry.png',
    desc: 'Workforce and HR solutions for businesses in home appliances, electronics, and consumer technology.',
    features: [
      'Consumer durables sales & distribution talent',
      'Product assembly & electronics engineering',
      'After-sales service & field technician staffing',
      'Supply chain & retail channel management',
      'Factory floor staffing & labor compliance',
      'Quality control & hardware testing teams',
      'Brand marketing & retail merchandising',
      'Multi-state statutory & trade licensing'
    ]
  },
  {
    name: 'Real Estate & Construction',
    image: '/img/industries_card.png',
    desc: 'HR, recruitment, payroll, and compliance support for real estate developers and construction businesses.',
    features: [
      'Project management & civil/structural engineering',
      'Real estate sales, leasing & CRM teams',
      'On-site labor management & contractor compliance',
      'RERA & building labor law compliance (BOCW)',
      'Architecture, urban planning & design talent',
      'Billing, procurement & site safety (EHS)',
      'Property & facility management staffing',
      'Construction labor payroll & wage compliance'
    ]
  },
  {
    name: 'Service Sector',
    image: '/img/practice-details-bg.png',
    desc: 'Flexible HR and staffing solutions for professional and service-based organizations.',
    specializedLabel: 'Professional Services',
    subIndustries: [
      'Architects',
      'Chartered Accountants',
      'Lawyers & Legal Firms',
      'Consultants'
    ],
    features: [
      'Specialized professional talent acquisition',
      'Firm partner & leadership recruitment',
      'Flexible contractual staffing & retainers',
      'Practice operations & office management',
      'Performance appraisals & talent retention',
      'Partner compensation & incentive modeling',
      'Statutory payroll & professional tax compliance',
      'Confidential executive search'
    ]
  },
  {
    name: 'BFSI',
    image: '/img/finance_industry.png',
    desc: 'Specialized workforce and HR solutions for Banking, Financial Services, and Insurance organizations.',
    features: [
      'Retail & corporate banking talent',
      'Risk management, credit analysis & compliance',
      'Investment banking & equity research',
      'FinTech innovators & digital product managers',
      'Actuarial, underwriting & claims processing',
      'Wealth management & financial advisors',
      'Multi-branch regulatory & statutory compliance',
      'High-volume BFSI sales & operations staffing'
    ]
  },
  {
    name: 'Healthcare & Pharma',
    image: '/img/healthcare_industry.png',
    desc: 'HR, recruitment, and compliance support for healthcare providers, pharmaceutical companies, and related organizations.',
    specializedLabel: 'Specialized Sectors',
    subIndustries: [
      'Hospitals',
      'Clinics',
      'Healthcare providers',
      'Pharma services'
    ],
    features: [
      'Hospital administrative & department heads',
      'Clinical researchers & pharma R&D scientists',
      'Doctors, nurses & allied healthcare staff',
      'Medical regulatory affairs & GMP compliance',
      'Pharma manufacturing & formulation experts',
      'Medical representative & sales leadership',
      'Bio-medical & diagnostic technical staff',
      'Hospital labor law & statutory audit support'
    ]
  },
  {
    name: 'EPC & Infrastructure',
    image: '/img/industries_card.png',
    desc: 'Workforce, recruitment, and compliance solutions for Engineering, Procurement & Construction businesses.',
    specializedLabel: 'Specialized Sectors',
    subIndustries: [
      'Power & Energy',
      'Construction',
      'Infrastructure'
    ],
    features: [
      'Mega-project directors & site engineers',
      'EPC procurement, contracts & commercial managers',
      'Renewable energy (Solar, Wind, Green Hydrogen) experts',
      'Transmission, pipeline & highway project teams',
      'Heavy equipment operators & specialized technicians',
      'Remote project site labor camp & EHS compliance',
      'BOCW & inter-state migrant labor compliance',
      'Comprehensive contractor audit & payroll'
    ]
  },
  {
    name: 'NGOs & Social Organizations',
    image: '/img/hr_about_us_1783707647467.png',
    desc: 'HR, compliance, staffing, and workforce support tailored to NGOs and social-sector organizations.',
    features: [
      'Program directors & project coordinators',
      'Fundraising, grant writing & donor management',
      'Field operations & community outreach teams',
      'CSR project execution & monitoring staffing',
      'NGO governance, POSH & labor law compliance',
      'FCRA & trust compliance documentation',
      'Social impact evaluation & research specialists',
      'Mission-aligned talent compensation structuring'
    ]
  },
  {
    name: 'Education & Training',
    image: '/img/hr_training_1783707657031.png',
    desc: 'HR and staffing solutions for educational institutions, training organizations, and learning businesses.',
    features: [
      'Academic deans, principals & institution heads',
      'EdTech product, tech & curriculum creators',
      'Subject matter experts (SMEs) & faculties',
      'Corporate trainers & instructional designers',
      'Admissions, student counselling & marketing teams',
      'Educational institution statutory compliance',
      'Campus placement & corporate relations officers',
      'School & university administration staffing'
    ]
  },
  {
    name: 'Logistics & Transportation',
    image: '/img/about-us.jpg',
    desc: 'Workforce and HR solutions for logistics, transportation, supply chain, and mobility businesses.',
    features: [
      'Supply chain directors & warehouse managers',
      'Fleet managers & transport coordinators',
      '3PL/4PL operations & freight forwarding',
      'Last-mile delivery & hub operations staffing',
      'Customs clearance & documentation specialists',
      'Warehouse labor management & statutory compliance',
      'Logistics software & route planning experts',
      'High-volume seasonal & contract staffing'
    ]
  },
  {
    name: 'Textile & Apparel',
    image: '/img/values-philosophy.png',
    desc: 'Recruitment, workforce management, and compliance support for textile and apparel businesses.',
    features: [
      'Merchandising, fashion design & sourcing leads',
      'Spinning, weaving & dyeing plant managers',
      'Garment manufacturing & QA/QC specialists',
      'Factory labor compliance & export audit standards',
      'Factory floor line supervisors & technical operators',
      'Supply chain & retail fashion distribution',
      'Minimum wage, bonus & PF/ESI factory compliance',
      'Piece-rate & incentive workforce payroll systems'
    ]
  },
  {
    name: 'Steel & Cement',
    image: '/img/manufacturing_industry.png',
    desc: 'Specialized HR, staffing, payroll, and compliance solutions for steel, cement, and heavy industries.',
    features: [
      'Blast furnace, rolling mill & kiln engineers',
      'Metallurgical specialists & quality directors',
      'Heavy machinery maintenance & reliability leads',
      'Mines & mineral regulation compliance (Mines Act)',
      'Plant-level labor union negotiations & IR management',
      'Stringent industrial safety (EHS) & hazardous operations',
      'Massive industrial workforce payroll & contract staffing',
      'Factory Inspectorate & pollution board compliance'
    ]
  }
]

export default function IndustriesPage() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeSector = industrySectors[activeIdx]

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gray-900 min-h-[400px] flex items-center border-b border-slate-200">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/industries_card.png"
            alt="Industries We Serve Hero"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/75 z-0" />
        
        <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left mt-8">
          <div className="max-w-3xl w-full text-left">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[13px] text-gray-300 mb-4 flex-wrap font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-500">&gt;</span>
              <span className="font-bold text-white">Industries</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-md">
              Sector Directory — {industrySectors.length.toString().padStart(2, '0')} Industries
            </div>

            <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-4">
              Industries We Serve
            </h1>
            
            <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl leading-relaxed font-normal drop-shadow-md">
              People Consulting supports businesses across diverse industries with tailored HR, Recruitment, Payroll, Compliance, and Workforce Management solutions.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. MAIN LAYOUT (SIDEBAR + CONTENT) */}
      <section className="bg-white py-12 md:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row min-h-screen shadow-2xl rounded-2xl overflow-hidden mb-12 border border-slate-200">
            {/* Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[380px] bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0">
              <div className="p-5 sm:p-6 md:p-8 sticky top-0 max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-slate-500 text-[10px] font-bold tracking-[0.15em] uppercase">
                    Select A Sector
                  </h5>
                  <span className="text-[11px] font-mono font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                    {industrySectors.length} Sectors
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  {industrySectors.map((sector, idx) => {
                    const isActive = idx === activeIdx
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`flex items-center gap-3.5 p-3 sm:p-3.5 text-left rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white shadow-md'
                            : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        <div
                          className={`relative w-9 h-9 rounded-lg shrink-0 overflow-hidden ${
                            isActive ? 'bg-white/20' : 'bg-slate-200'
                          }`}
                        >
                          <Image
                            src={sector.image}
                            alt={sector.name}
                            fill
                            className={`object-cover ${isActive ? 'opacity-100' : 'opacity-70'}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div
                            className={`text-[10px] font-mono font-bold mb-0.5 ${
                              isActive ? 'text-white/80' : 'text-slate-400'
                            }`}
                          >
                            {(idx + 1).toString().padStart(2, '0')}
                          </div>
                          <div
                            className={`text-xs sm:text-sm font-bold leading-snug truncate ${
                              isActive ? 'text-white' : 'text-slate-800'
                            }`}
                          >
                            {sector.name}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-6 md:p-10 lg:p-12 xl:p-14">
              <div className="max-w-4xl mx-auto">
                {/* Image Banner */}
                <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] mb-8 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                  <Image
                    src={activeSector.image}
                    alt={activeSector.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 bg-primary/95 text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-lg backdrop-blur-md shadow-lg border border-white/10">
                    Sector {(activeIdx + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-secondary font-extrabold text-lg sm:text-xl font-mono">
                    {(activeIdx + 1).toString().padStart(2, '0')}.
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                    {activeSector.name}
                  </h2>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
                  {activeSector.desc}
                </p>

                {/* Sub-Industries / Specialized Sectors (if available) */}
                {activeSector.subIndustries && activeSector.subIndustries.length > 0 && (
                  <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f8faff] via-white to-orange-50/25 border border-slate-200/90 shadow-sm">
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <h3 className="text-xs font-bold tracking-wider uppercase text-primary">
                        {activeSector.specializedLabel || 'Specialized Sectors'}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeSector.subIndustries.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-secondary/50 hover:shadow-xs transition-all duration-200 group"
                        >
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-xs sm:text-sm font-semibold text-primary leading-tight">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* The Brief — What We Cover */}
                <div className="border-t border-slate-200 pt-8 sm:pt-10">
                  <h4 className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8">
                    The Brief — Key Capabilities &amp; Solutions
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-12 sm:mb-14">
                    {activeSector.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="group flex items-start gap-3.5 border-b border-slate-100 pb-3 pt-3 px-3 -mx-3 rounded-xl hover:bg-[#fff9f5] hover:border-transparent transition-all duration-200 cursor-default"
                      >
                        <span className="text-secondary font-mono text-xs font-bold pt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                          {(fIdx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="text-primary text-xs sm:text-sm font-medium leading-snug group-hover:text-secondary transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Box */}
                  <div className="p-6 rounded-2xl bg-[#f1f6fc] border border-[#d6e3f4] flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-primary mb-1">
                        Need tailored workforce or compliance solutions for {activeSector.name}?
                      </h4>
                      <p className="text-xs text-slate-500">
                        Our industry practice specialists respond within 1 business day.
                      </p>
                    </div>

                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 w-full sm:w-auto text-center"
                    >
                      <span>Discuss This Sector</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <FAQs />

      {/* 4. CTA */}
      <CallToAction />
    </>
  )
}

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, CallToAction } from '@/components/ui'

const industrySectors = [
  {
    name: 'IT & Technology',
    image: '/img/tech_industry.png',
    desc: 'We help technology companies scale fast with specialized tech talent, from developers to leadership hires, while keeping payroll and compliance seamless.',
    features: [
      'Software developers & engineers',
      'Product & project managers',
      'Contract & permanent staffing',
      'IT payroll outsourcing',
      'Tech leadership hiring',
      'Remote & hybrid workforce support',
      'Skill-based candidate screening',
      'Fast-track hiring for startups'
    ]
  },
  {
    name: 'BFSI',
    image: '/img/finance_industry.png',
    desc: 'Placing high-caliber investment bankers, risk management directors, statutory compliance officers, and fintech innovators. We connect financial institutions with leaders who navigate complex market regulations.',
    features: [
      'Investment Banking & M&A',
      'Financial Risk & Compliance',
      'Fintech Product Managers',
      'Corporate Accounting & Audit',
      'Wealth Management Advisors',
      'Insurance & Actuarial Talent',
      'Regulatory Affairs Specialists',
      'Digital Banking Transformation'
    ]
  },
  {
    name: 'Healthcare & Pharma',
    image: '/img/healthcare_industry.png',
    desc: 'Sourcing clinical specialists, hospital administrative leaders, regulatory affairs experts, and pharmaceutical R&D professionals. Our practice bridges executive medical talent with healthcare institutions globally.',
    features: [
      'Hospital Administration & Leadership',
      'Biotech & Pharma R&D',
      'Clinical Research Directors',
      'Medical Regulatory Compliance',
      'Nursing & Clinical Staffing',
      'Medical Device Sales',
      'Healthcare IT Specialists',
      'Public Health Administrators'
    ]
  },
  {
    name: 'Manufacturing & Engineering',
    image: '/img/manufacturing_industry.png',
    desc: 'Connecting manufacturing conglomerates with plant heads, supply chain strategists, quality assurance directors, and EHS managers. We support smart factory automation and lean industrial operations.',
    features: [
      'Plant Operations & Management',
      'Global Supply Chain & Logistics',
      'Quality Assurance & Lean Six Sigma',
      'EHS & Industrial Safety Officers',
      'Automation & Robotics Engineers',
      'Production Planning Directors',
      'Procurement & Sourcing',
      'Maintenance & Reliability Engineering'
    ]
  },
  {
    name: 'Retail & FMCG',
    image: '/img/capabilities_card.png',
    desc: 'Driving retail transformation through category managers, brand strategists, digital marketing leaders, and supply chain experts. We enable consumer brands to win in omnichannel marketplaces.',
    features: [
      'Omnichannel Retail Strategy',
      'Category Management & Merchandising',
      'Brand & Performance Marketing',
      'E-Commerce Logistics Leaders',
      'Store Operations Management',
      'FMCG Sales & Distribution',
      'Consumer Insights & Analytics',
      'Visual Merchandising'
    ]
  },
  {
    name: 'Real Estate & Construction',
    image: '/img/industries_card.png',
    desc: 'Navigating the green energy transition with project development managers, renewable energy engineers, and infrastructure directors. We build leadership teams powering global sustainability.',
    features: [
      'Project Management & Development',
      'Architecture & Urban Planning',
      'Civil & Structural Engineering',
      'Real Estate Sales & Marketing',
      'Property Management',
      'Facilities Management',
      'Construction Health & Safety',
      'Contract & Commercial Management'
    ]
  },
  {
    name: 'Logistics & Supply Chain',
    image: '/img/about-us.jpg',
    desc: 'Connecting educational institutions, learning platforms, and media agencies with academic leaders, EdTech innovators, and corporate learning directors.',
    features: [
      'Supply Chain Optimization',
      'Warehouse Operations',
      'Freight Forwarding & Shipping',
      'Logistics Technology Leaders',
      'Last-Mile Delivery Operations',
      'Inventory Management',
      'Customs & Compliance',
      'Transport Fleet Management'
    ]
  },
  {
    name: 'Education & Training',
    image: '/img/hr_training_1783707657031.png',
    desc: 'Matching law firms, consulting practices, and corporate headquarters with legal counsel, CHROs, and administrative directors who build resilient corporate structures.',
    features: [
      'Academic Deans & Institution Leaders',
      'EdTech Product & Curriculum Specialists',
      'Media & Communications Directors',
      'Corporate Training Directors',
      'Instructional Design',
      'Student Affairs & Admissions',
      'Education Policy Advisors',
      'Corporate L&D Specialists'
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
            alt="Industries Hero"
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 z-0" />
        
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

            <h1 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              Workforce & compliance expertise, organized by industry.
            </h1>
            
            <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl leading-relaxed font-normal drop-shadow-md">
              Every sector hires differently and answers to different rules. Browse the directory to see how we staff and stay compliant within your world.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. MAIN LAYOUT (SIDEBAR + CONTENT) */}
      <section className="bg-white mt-10">
        <Container>
          <div className="flex flex-col lg:flex-row min-h-screen shadow-2xl rounded-2xl overflow-hidden mb-12 border border-slate-200">
            {/* Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[380px] bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0">
              <div className="p-6 md:p-8 sticky top-0">
                <h5 className="text-slate-500 text-[10px] font-bold tracking-[0.15em] uppercase mb-8">
                  Select A Sector
                </h5>
                <div className="flex flex-col">
                  {industrySectors.map((sector, idx) => {
                    const isActive = idx === activeIdx
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`flex items-center gap-4 p-4 text-left transition-colors duration-200 border-b border-slate-200 last:border-0 ${isActive ? 'bg-primary' : 'hover:bg-slate-100'
                          }`}
                      >
                        <div className={`relative w-10 h-10 rounded shrink-0 overflow-hidden ${isActive ? 'bg-white/20' : 'bg-slate-200'}`}>
                          <Image
                            src={sector.image}
                            alt={sector.name}
                            fill
                            className={`object-cover ${isActive ? 'opacity-100' : 'opacity-70'}`}
                          />
                        </div>
                        <div>
                          <div className={`text-[10px] font-mono font-bold mb-1 ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                            {(idx + 1).toString().padStart(2, '0')}
                          </div>
                          <div className={`text-sm md:text-base font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-700'}`}>
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
            <div className="flex-1 bg-white p-6 md:p-12 lg:p-16 xl:p-20">
              <div className="max-w-4xl mx-auto">
                {/* Image Banner */}
                <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] mb-12 bg-slate-100">
                  <Image
                    src={activeSector.image}
                    alt={activeSector.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6 bg-[#1a2542] text-white text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2">
                    Sector {(activeIdx + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-secondary font-bold text-lg md:text-xl">
                    {(activeIdx + 1).toString().padStart(2, '0')}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-primary tracking-tight">
                    {activeSector.name}
                  </h2>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-12 max-w-3xl">
                  {activeSector.desc}
                </p>

                {/* The Brief */}
                <div className="border-t border-slate-200 pt-10">
                  <h4 className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10">
                    The Brief — What We Cover
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-16">
                    {activeSector.features.map((feature, fIdx) => (
                      <div key={fIdx} className="group flex items-start gap-4 border-b border-slate-100 pb-3 pt-3 px-3 -mx-3 rounded-xl hover:bg-[#fff9f5] hover:border-transparent transition-all duration-300 cursor-default">
                        <span className="text-secondary font-mono text-[11px] font-bold pt-1 shrink-0 group-hover:scale-110 transition-transform">
                          {(fIdx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="text-primary text-sm font-medium leading-snug group-hover:text-secondary transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-4 font-bold text-sm transition-colors w-full sm:w-auto"
                    >
                      Discuss This Sector &rarr;
                    </Link>
                    <span className="text-slate-500 text-xs font-medium">
                      Response within 1 business day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. CTA */}
      <CallToAction />
    </>
  )
}

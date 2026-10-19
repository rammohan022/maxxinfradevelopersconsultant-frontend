'use client'

import React from 'react'
import { Container } from '@/components/ui'
import { Infinity as InfinityIcon, UserCheck, Sliders, CheckCircle2 } from 'lucide-react'

interface SimplifyPillar {
  badgeTitle: string
  icon: React.ElementType
  items: {
    title: string
    desc: string
  }[]
}

const pillars: SimplifyPillar[] = [
  {
    badgeTitle: 'End-to-End Compliance Expertise',
    icon: InfinityIcon,
    items: [
      {
        title: 'Labour Law Registrations',
        desc: 'Accurate and timely registrations under applicable central and state labour laws, ensuring your business starts compliant and stays compliant.',
      },
      {
        title: 'Ongoing Compliance & Audits',
        desc: 'Monthly and annual statutory filings, returns, registers, and audit support managed seamlessly across all operational locations.',
      },
      {
        title: 'Business-Specific Solutions',
        desc: 'Customized compliance frameworks designed for startups, SMEs, multi-location enterprises, and sector-specific regulatory environments.',
      },
    ],
  },
  {
    badgeTitle: 'Dedicated Expert Support',
    icon: UserCheck,
    items: [
      {
        title: 'Labour Law Advisory',
        desc: 'Clear guidance on applicable laws, risk exposure, employee structuring, and regulatory obligations.',
      },
      {
        title: 'Statutory Filings & Policies',
        desc: 'End-to-end management of returns, registers, policies, and compliance documentation - structured and audit-ready.',
      },
      {
        title: 'Single Point of Contact',
        desc: 'A dedicated compliance expert ensuring coordinated execution across HR, finance, and legal functions.',
      },
    ],
  },
  {
    badgeTitle: 'Tech-Driven & Reliable Execution',
    icon: Sliders,
    items: [
      {
        title: 'Real-Time Compliance Visibility',
        desc: 'Centralized dashboards providing live status tracking across entities, branches, and statutory categories.',
      },
      {
        title: 'Automated Alerts & Records',
        desc: 'Timely reminders, structured document management, and secure record keeping for inspection preparedness.',
      },
      {
        title: 'Experienced Professional expertise',
        desc: 'Supported by experienced HR, legal, and finance professionals ensuring accuracy, accountability, and regulatory reliability.',
      },
    ],
  },
]

export default function ComplianceSimplificationSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[90px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[90px] -z-10 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14 space-y-3">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold">
              Our Approach
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            How We Simplify HR & Compliance for You
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, proactive framework combining deep statutory expertise, dedicated advisory, and modern digital tracking to ensure zero penalties and complete audit readiness.
          </p>
        </div>

        {/* Outer Tinted Frame Box (matching reference layout) */}
        <div className="bg-gradient-to-br from-[#faf4f0] via-[#f7f2ed] to-[#f3f5fa] border border-[#ebdcd1] rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {pillars.map((pillar, pIdx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pIdx}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-secondary/5 hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Pill / Badge */}
                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50/90 text-xs sm:text-[13px] font-bold text-slate-900 mb-6 shadow-2xs group-hover:border-secondary/40 group-hover:bg-[#fff9f5] transition-colors">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                        <Icon size={13} strokeWidth={2.4} />
                      </div>
                      <span className="tracking-tight">{pillar.badgeTitle}</span>
                    </div>

                    {/* Stacked Content Items */}
                    <div className="space-y-5">
                      {pillar.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className={iIdx > 0 ? 'border-t border-slate-100/90 pt-5' : ''}
                        >
                          <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 mb-1.5 leading-snug group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

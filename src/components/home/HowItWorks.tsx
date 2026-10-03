'use client'

import { Container } from '@/components/ui'
import {
  UserPlus,
  SlidersHorizontal,
  PlayCircle,
  Smartphone,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const steps = [
  {
    step: '01',
    tag: 'STEP 01',
    title: 'Add Employees & Set CTC',
    description:
      'Bulk import employees or add them individually with complete compensation details.',
    icon: UserPlus,
    isTop: true,
  },
  {
    step: '02',
    tag: 'STEP 02',
    title: 'Configure Policies',
    description:
      'Set up leave policies, attendance rules, and custom workflows tailored to your business.',
    icon: SlidersHorizontal,
    isTop: false,
  },
  {
    step: '03',
    tag: 'STEP 03',
    title: 'Run Payroll',
    description:
      'Process payroll in minutes with automated calculations for all statutory compliances.',
    icon: PlayCircle,
    isTop: true,
  },
  {
    step: '04',
    tag: 'STEP 04',
    title: 'Employees Use Mobile App',
    description:
      'Staff access payslips, mark attendance, apply for leave, and more via the mobile app.',
    icon: Smartphone,
    isTop: false,
  },
  {
    step: '05',
    tag: 'STEP 05',
    title: 'Analyze Insights',
    description:
      'Get actionable insights with real-time analytics and exportable reports.',
    icon: TrendingUp,
    isTop: true,
  },
]

export default function HowItWorks() {
  return (
    <section
      className="py-16 md:py-20 bg-gradient-to-b from-[#fff7f0] via-[#fffbf7] to-[#fff3e8] relative overflow-hidden border-b border-orange-100/80"
      id="how-it-works"
    >
      {/* Background soft decorative dotted grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#f58235 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold tracking-widest mb-3.5">
            How It Works
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            Get Started in Minutes with Our <span className="text-secondary">Simple 5-Step Process</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
            From your first employee to actionable insights &mdash; our platform guides you through every step of running a modern workforce.
          </p>
        </div>

        {/* 5 Steps Desktop Staggered / Mobile Grid Flow */}
        <div className="relative mb-12 md:mb-16">
          {/* Horizontal Track Line for large screens */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 border-t-2 border-dashed border-orange-200/90 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`flex flex-col items-center ${
                    item.isTop
                      ? 'lg:-translate-y-3'
                      : 'lg:translate-y-3'
                  }`}
                >
                  {/* Step Badge at top for even items (Card 2 & 4 in staggered layout) */}
                  {!item.isTop && (
                    <div className="hidden lg:flex flex-col items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                        {item.step}
                      </div>
                      <div className="w-0.5 h-3 border-l-2 border-dashed border-primary/40 mt-1" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border border-orange-100/90 shadow-[0_4px_20px_rgba(245,130,53,0.06)] hover:shadow-[0_12px_28px_rgba(245,130,53,0.12)] hover:border-secondary/40 transition-all duration-300 flex flex-col items-center text-center group relative hover:-translate-y-1">
                    {/* Mobile/Tablet Step Number Pill */}
                    <div className="lg:hidden absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                      {item.step}
                    </div>

                    {/* Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-blue-50/90 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>

                    {/* Step Tag */}
                    <span className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-1.5">
                      {item.tag}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-primary mb-2 leading-snug group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Step Badge at bottom for odd items (Card 1, 3, 5 in staggered layout) */}
                  {item.isTop && (
                    <div className="hidden lg:flex flex-col items-center mt-3">
                      <div className="w-0.5 h-3 border-l-2 border-dashed border-primary/40 mb-1" />
                      <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                        {item.step}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

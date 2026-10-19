'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui'
import {
  CheckCircle2,
  BellRing,
  LayoutDashboard,
  LineChart,
  MapPin,
  Factory,
  FileSignature,
  ShieldAlert,
  BookOpen,
  ChevronDown,
  LucideIcon,
} from 'lucide-react'

interface FeatureItem {
  title: string
  desc: string
  icon: LucideIcon
}

const features: FeatureItem[] = [
  {
    title: 'Centralised Dashboard',
    desc: 'Manage all your compliance activities, documents, deadlines, and status updates from one centralised dashboard for complete visibility and control.',
    icon: LayoutDashboard,
  },
  {
    title: 'Automated Alerts & Reminders',
    desc: 'Stay ahead of compliance deadlines with automated alerts and reminders for upcoming, pending, and overdue compliance activities.',
    icon: BellRing,
  },
  {
    title: 'Track, Manage & Analyse',
    desc: 'Track compliance progress, manage tasks, and analyse compliance data to identify gaps, monitor performance, and make informed decisions.',
    icon: LineChart,
  },
  {
    title: 'Unit / Branch / Location-Wise Compliance Management',
    desc: 'Manage compliance requirements across multiple units, branches, establishments, and locations with location-wise tracking and monitoring.',
    icon: MapPin,
  },
  {
    title: 'Establishment & Factory Compliance',
    desc: 'Simplify compliance management for establishments and factories by monitoring applicable requirements, records, registrations, and statutory obligations.',
    icon: Factory,
  },
  {
    title: 'Licensing & Registration Services',
    desc: 'Manage and monitor licences, registrations, renewals, and related compliance requirements to help keep your business legally compliant.',
    icon: FileSignature,
  },
  {
    title: 'Notice & Inspection Handling / Management',
    desc: 'Centralise notices, inspection-related records, actions, and follow-ups to ensure timely responses and better inspection preparedness.',
    icon: ShieldAlert,
  },
  {
    title: 'Digital Compliance Library',
    desc: 'Access a centralised digital library of compliance documents, laws, rules, registers, formats, and reference materials whenever you need them.',
    icon: BookOpen,
  },
]

export default function ComplianceDashboardSection() {
  const [showAll, setShowAll] = useState(false)
  // First item open by default as requested: "pahle uske des show kro"
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx))
  }

  const handleToggleShowAll = () => {
    if (showAll && openIndex !== null && openIndex >= 4) {
      setOpenIndex(0)
    }
    setShowAll((prev) => !prev)
  }

  const visibleFeatures = showAll ? features : features.slice(0, 4)

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative border-b border-slate-200/80 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Heading, Subtitle & Interactive Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold">
                Compliance Dashboard
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold">
                Powered by Digiliance
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight leading-tight">
                Simplifying HR Compliance &amp; Labour Law Compliance services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Integrated HR compliance services and labour law compliance services to support any scale of business across India.
              </p>
            </div>

            {/* Accordion / Dropdown List (4 shown initially, rest on Load More) */}
            <div className="space-y-3 pt-2">
              <AnimatePresence>
                {visibleFeatures.map((item, idx) => {
                  const Icon = item.icon
                  const isOpen = openIndex === idx

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                        isOpen
                          ? 'bg-white border-secondary/50 shadow-md shadow-secondary/5 ring-1 ring-secondary/20'
                          : 'bg-[#f8faff] border-slate-200/80 hover:border-secondary/40 hover:bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(idx)}
                        className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left transition-colors cursor-pointer group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs border ${
                              isOpen
                                ? 'bg-secondary text-white border-secondary'
                                : 'bg-secondary/10 text-secondary border-secondary/20 group-hover:bg-secondary group-hover:text-white'
                            }`}
                          >
                            <Icon size={19} strokeWidth={2.2} />
                          </div>
                          <span
                            className={`font-bold text-xs sm:text-sm leading-snug transition-colors line-clamp-1 ${
                              isOpen ? 'text-secondary' : 'text-primary group-hover:text-secondary'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen ? 'bg-secondary/10 text-secondary rotate-180' : 'text-slate-400 group-hover:text-secondary'
                          }`}
                        >
                          <ChevronDown size={17} strokeWidth={2.5} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0 pl-13 sm:pl-15 pr-4 sm:pr-5 text-xs text-slate-600 leading-relaxed">
                              <p className="border-t border-slate-100 pt-2.5">
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {features.length > 4 && (
              <div className="pt-2 text-center sm:text-left">
                <button
                  type="button"
                  onClick={handleToggleShowAll}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-medium shadow-xs hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                >
                  <span>{showAll ? 'Show Less' : 'Load More'}</span>
                  <ChevronDown
                    size={14}
                    className={`transform transition-transform duration-300 ${
                      showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dashboard Visual (Sticky on Desktop) */}
          <div className="lg:col-span-6 relative lg:sticky lg:top-28 self-start pt-2">
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Device Window Frame */}
            <div className="relative bg-slate-900 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-5 shadow-2xl overflow-visible border-4 border-slate-100/90 group transform hover:scale-[1.01] transition-transform duration-500">
              {/* Browser Top Chrome */}
              <div className="flex items-center justify-between gap-3 mb-4 px-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/50 shadow-xs"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50 shadow-xs"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/50 shadow-xs"></div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 text-[11px] sm:text-xs font-mono shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  app.digiliance.com/dashboard
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 font-semibold tracking-wide">
                  <span className="text-secondary font-extrabold tracking-wider">DIGILIANCE</span>
                </div>
              </div>

              {/* Real Digiliance Dashboard Screen Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white">
                <Image
                  src="/img/dashbaord.jpeg"
                  alt="Digiliance dashboard for tracking statutory compliance filings and deadlines"
                  fill
                  className="object-cover object-left-top origin-top-left group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating Bottom Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-100 flex items-center gap-3 animate-bounce-slow z-20">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                  <CheckCircle2 size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-primary">Audit Ready</div>
                  <div className="text-[11px] text-slate-500 font-medium">All statutory records verified</div>
                </div>
              </div>

              {/* Floating Top-Right Bell Alert */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-100 z-20">
                <div className="relative">
                  <BellRing size={24} className="text-secondary" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

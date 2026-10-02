'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const digilianceFeatures = [
  {
    title: "Centralised Dashboard",
    desc: "Manage all your compliance activities, documents, deadlines, and status updates from one centralised dashboard for complete visibility and control.",
  },
  {
    title: "Automated Alerts & Reminders",
    desc: "Stay ahead of compliance deadlines with automated alerts and reminders for upcoming, pending, and overdue compliance activities.",
  },
  {
    title: "Track, Manage & Analyse",
    desc: "Track compliance progress, manage tasks, and analyse compliance data to identify gaps, monitor performance, and make informed decisions.",
  },
  {
    title: "Unit / Branch / Location-Wise Compliance Management",
    desc: "Manage compliance requirements across multiple units, branches, establishments, and locations with location-wise tracking and monitoring.",
  },
  {
    title: "Establishment & Factory Compliance",
    desc: "Simplify compliance management for establishments and factories by monitoring applicable requirements, records, registrations, and statutory obligations.",
  },
  {
    title: "Licensing & Registration Services",
    desc: "Manage and monitor licences, registrations, renewals, and related compliance requirements to help keep your business legally compliant.",
  },
  {
    title: "Notice & Inspection Handling / Management",
    desc: "Centralise notices, inspection-related records, actions, and follow-ups to ensure timely responses and better inspection preparedness.",
  },
  {
    title: "Digital Compliance Library",
    desc: "Access a centralised digital library of compliance documents, laws, rules, registers, formats, and reference materials whenever you need them.",
  },
]

export default function IndustriesServe() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden border-b border-slate-100/80" id="industries">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <Container className="relative z-10">
        {/* Top: Centered Heading, Subtitle & Button */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3.5">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            <span className="text-secondary">Simplifying</span> Labour Law Compliance <br className="hidden sm:inline" />
            <span>for your Business</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            <span className="text-primary font-semibold">All in one Platform:</span> Software, Compliance Management services, Registrations, Legal Advisory &amp; More &ndash; PAN India
          </p>
          <div className="pt-1.5 flex items-center justify-center">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-secondary-dark shadow-md hover:shadow-secondary/25 transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              Explore Compliance
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Large Centered Laptop Mockup with Compliance Dashboard */}
        <div className="relative w-full max-w-4xl lg:max-w-5xl mx-auto aspect-[16/10] my-8 sm:my-10 group">
          {/* Laptop mock border */}
          <div className="w-full h-full bg-slate-900 rounded-t-2xl sm:rounded-t-3xl rounded-b-md flex flex-col overflow-hidden border-8 sm:border-[10px] border-b-[18px] sm:border-b-[24px] border-slate-800 shadow-2xl relative">
            {/* Webcam dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-600 rounded-full z-20"></div>

            {/* Browser top chrome */}
            <div className="bg-slate-800 h-6 sm:h-7 w-full flex items-center px-3 sm:px-4 gap-1.5 border-b border-slate-700/80 z-10 shrink-0">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400"></div>
              <div className="mx-auto text-[9px] sm:text-xs text-slate-400 font-mono tracking-tight">app.digiliance.com/dashboard</div>
            </div>

            {/* Dashboard Screen Image */}
            <div className="relative flex-1 w-full bg-white overflow-hidden">
              <Image
                src="/img/dashbaord.jpeg"
                alt="Digiliance Compliance Dashboard"
                fill
                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Laptop base */}
          <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[108%] h-3 sm:h-4 bg-slate-300 rounded-b-xl sm:rounded-b-2xl shadow-lg border-t border-slate-400">
            <div className="mx-auto w-28 sm:w-36 h-1 sm:h-1.5 bg-slate-400 rounded-b-md"></div>
          </div>
        </div>

        {/* Bottom: 8 Feature Cards Grid */}
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {digilianceFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md hover:border-secondary/40 transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-primary mb-1 leading-snug group-hover:text-secondary transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Button */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 px-7 py-3 bg-secondary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-secondary-dark shadow-md hover:shadow-secondary/25 transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              Explore Complete Compliance Solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

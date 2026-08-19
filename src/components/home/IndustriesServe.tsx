'use client'

import Link from 'next/link'
import { Container } from '@/components/ui'
import { Monitor, AlertTriangle, MessageSquare, Network, ArrowRight } from 'lucide-react'

export default function IndustriesServe() {
  return (
    <section className="py-16 lg:py-14 bg-slate-50 relative overflow-hidden" id="industries">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text, Image, Button */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              <span className="text-secondary">Access to</span> India&apos;s first unified{' '}
              <span className="text-secondary">Compliance Management Solution</span>
            </h2>

            <div className="relative w-full aspect-[16/10] mt-8 mb-6 group">
              {/* Laptop mock border */}
              <div className="w-full h-full bg-white rounded-t-3xl rounded-b-md flex flex-col overflow-hidden border-8 border-b-[24px] border-slate-800 shadow-2xl relative">
                {/* Webcam dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-600 rounded-full"></div>

                <div className="bg-slate-100 h-6 w-full flex items-center px-3 gap-1.5 border-b border-slate-200 mt-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-6 text-center text-slate-400 relative overflow-hidden">
                  <Monitor size={48} className="mb-4 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-sm font-medium">Dashboard Interface</span>
                  <span className="text-xs mt-2 text-slate-300">(Insert Dashboard Image Here)</span>
                </div>
              </div>
              {/* Laptop base */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-slate-300 rounded-b-xl shadow-md border-t border-slate-400">
                <div className="mx-auto w-32 h-1 bg-slate-400 rounded-b-md"></div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Card 1 */}
            <div className="bg-white/90 backdrop-blur-sm border border-orange-200/70 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2.5">
                <Monitor className="text-secondary w-6 h-6 flex-shrink-0" />
                <h3 className="font-semibold text-primary leading-tight">Centralized Dashboard</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                View, track, and manage all regulatory obligations in one place.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/90 backdrop-blur-sm border border-orange-200/70 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2.5">
                <AlertTriangle className="text-secondary w-6 h-6 flex-shrink-0" />
                <h3 className="font-semibold text-primary leading-tight">Automated Alerts & Reminders</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never miss a deadline with real-time notifications for upcoming filings.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/90 backdrop-blur-sm border border-orange-200/70 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2.5">
                <MessageSquare className="text-secondary w-6 h-6 flex-shrink-0" />
                <h3 className="font-semibold text-primary leading-tight">Regulation Mapping</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Stay updated with central, state, and sector-specific compliance.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/90 backdrop-blur-sm border border-orange-200/70 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2.5">
                <Network className="text-secondary w-6 h-6 flex-shrink-0" />
                <h3 className="font-semibold text-primary leading-tight">Customizable Workflows</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create organization-specific compliance workflows efficiently.
              </p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}

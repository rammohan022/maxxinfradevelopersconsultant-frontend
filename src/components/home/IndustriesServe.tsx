'use client'

import { Container } from '@/components/ui'
import { CheckCircle2 } from 'lucide-react'

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
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Heading, Subtitle & Laptop Analytics Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                <span className="text-secondary">Simplifying</span> Labour Law Compliance <br className="hidden sm:inline" />
                <span>for your Business</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                <span className="text-primary font-semibold">All in one Platform:</span> Software, Compliance Management services, Registrations, Legal Advisory &amp; More &ndash; PAN India
              </p>
            </div>

            {/* Laptop Mockup with Compliance Analytics Dashboard */}
            <div className="relative w-full aspect-[16/10] mt-6 group">
              {/* Laptop mock border */}
              <div className="w-full h-full bg-slate-900 rounded-t-2xl rounded-b-md flex flex-col overflow-hidden border-8 border-b-[20px] border-slate-800 shadow-2xl relative">
                {/* Webcam dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-600 rounded-full z-20"></div>

                {/* Browser top chrome */}
                <div className="bg-slate-800 h-5 w-full flex items-center px-3 gap-1.5 border-b border-slate-700/80 z-10">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="mx-auto text-[9px] text-slate-400 font-mono tracking-tight">app.digiliance.com/dashboard</div>
                </div>

                {/* Dashboard Screen */}
                <div className="flex-1 bg-slate-900 text-white p-3 flex flex-col justify-between overflow-hidden relative select-none font-sans">
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-secondary flex items-center justify-center text-white text-[9px] font-black">
                        D
                      </div>
                      <span className="text-[10px] font-bold text-slate-200">Digiliance &bull; Compliance Hub</span>
                    </div>
                    <span className="text-[8px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                      Audit Ready (100%)
                    </span>
                  </div>

                  {/* Stat Cards Row */}
                  <div className="grid grid-cols-3 gap-1.5 my-1.5">
                    <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-1.5 text-center">
                      <div className="text-[8px] text-slate-400">Total Filings</div>
                      <div className="text-xs font-bold text-white">1,420</div>
                      <div className="text-[7.5px] text-emerald-400">&uarr; 100% On-time</div>
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-1.5 text-center">
                      <div className="text-[8px] text-slate-400">Health Score</div>
                      <div className="text-xs font-bold text-secondary">99.8%</div>
                      <div className="text-[7.5px] text-emerald-400">Low Risk</div>
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-1.5 text-center">
                      <div className="text-[8px] text-slate-400">Acts Tracked</div>
                      <div className="text-xs font-bold text-white">48/48</div>
                      <div className="text-[7.5px] text-blue-400">PAN India</div>
                    </div>
                  </div>

                  {/* Chart and Live List */}
                  <div className="grid grid-cols-12 gap-1.5 items-stretch">
                    {/* Mini Bar Chart */}
                    <div className="col-span-7 bg-slate-800/60 border border-slate-700/60 rounded-lg p-1.5 flex flex-col justify-between">
                      <div className="text-[8px] text-slate-400 font-medium">Monthly Statutory Filings</div>
                      <div className="flex items-end justify-between gap-1 h-8 pt-1 px-1">
                        {[45, 60, 75, 90, 85, 95, 100].map((val, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-secondary to-orange-400 rounded-t-sm" style={{ height: `${val}%` }}></div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Live Checklist */}
                    <div className="col-span-5 bg-slate-800/60 border border-slate-700/60 rounded-lg p-1.5 flex flex-col justify-center space-y-1 text-[7.5px]">
                      <div className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 size={9} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">PF &amp; ESI Challans</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 size={9} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">Factory Returns</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 size={9} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">Bonus &amp; Gratuity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[108%] h-3 bg-slate-300 rounded-b-xl shadow-md border-t border-slate-400">
                <div className="mx-auto w-24 h-1 bg-slate-400 rounded-b-md"></div>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Short Feature Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {digilianceFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 group"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-primary mb-0.5 leading-snug group-hover:text-secondary transition-colors">
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
          </div>

        </div>
      </Container>
    </section>
  )
}

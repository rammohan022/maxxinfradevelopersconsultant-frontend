'use client'

import { Container } from "@/components/ui"
import { Cpu, HeartPulse, Building2, Factory, ShoppingCart, Briefcase } from "lucide-react"

const industries = [
  { name: "IT & Technology", icon: Cpu, desc: "Software engineering, product development, cloud operations, and leadership talent." },
  { name: "Healthcare & Life Sciences", icon: HeartPulse, desc: "Hospital administration, nursing, specialized medicine, and biotech research profiles." },
  { name: "Banking & Finance", icon: Building2, desc: "Investment banking, compliance officers, risk advisory, and accounting talent." },
  { name: "Manufacturing & Core", icon: Factory, desc: "Operations head, supply chain experts, QA engineering, and plant management." },
  { name: "Retail & E-commerce", icon: ShoppingCart, desc: "Logistics managers, merchandise planners, brand managers, and digital strategists." },
  { name: "Corporate & Services", icon: Briefcase, desc: "Legal counsel, HR directors, administrative leaders, and executive staff." },
]

export default function IndustriesServe() {
  return (
    <section className="py-16 md:py-14 bg-slate-50" id="industries">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Specialized recruitment across <span className="text-secondary">six core sectors</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            Our search team brings sector-specific compliance knowledge and deep candidate networks to deliver optimal placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <div
                key={ind.name}
                className="group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">{ind.name}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{ind.desc}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

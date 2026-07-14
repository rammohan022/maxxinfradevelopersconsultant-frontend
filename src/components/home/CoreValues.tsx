'use client'

import { Container } from "@/components/ui"
import { ShieldCheck, Flame, Users2, Award } from "lucide-react"

const values = [
  { name: "Integrity First", icon: ShieldCheck, desc: "Ethical frameworks guide all placements, advisory services, and billing practices without compromise." },
  { name: "Excellence & Quality", icon: Award, desc: "We focus on candidate quality, strict background validation, and measurable corporate training results." },
  { name: "Partnership Spirit", icon: Users2, desc: "We operate as an extension of your in-house teams, aligning our search parameters with your strategic vision." },
  { name: "Continuous Evolution", icon: Flame, desc: "Adapting modern search technologies and dynamic training curriculum to match changing market realities." },
]

export default function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-slate-50" id="core-values">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Our Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            The principles that <span className="text-secondary">guide our decisions</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            We are committed to maintaining high standard deliverables, ensuring compliance, and delivering growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((val) => {
            const Icon = val.icon
            return (
              <div
                key={val.name}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

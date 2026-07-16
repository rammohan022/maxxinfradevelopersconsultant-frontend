'use client'

import { Container } from "@/components/ui"

const steps = [
  {
    num: "01",
    title: "Discovery & Alignment",
    desc: "We analyze your strategic objectives, company culture, and core competency gaps to formulate custom hiring parameters.",
  },
  {
    num: "02",
    title: "Targeted Search & Screening",
    desc: "Leveraging our database and active outreach networks, we build a qualified pipeline of active and passive candidates.",
  },
  {
    num: "03",
    title: "Validation & Assessment",
    desc: "Each candidate goes through rigorous skill assessments and compliance checks before presentation to stakeholders.",
  },
  {
    num: "04",
    title: "Onboarding & Optimization",
    desc: "We assist with contract finalization, offer negotiation, structured training, and initial performance tracking.",
  },
]

export default function OurProcess() {
  return (
    <section className="py-16 md:py-14 bg-white" id="our-process">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Our structured <span className="text-secondary">engagement model</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            A reliable process designed to minimize time-to-hire while maintaining strict quality and compliance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl font-extrabold text-primary/20 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}



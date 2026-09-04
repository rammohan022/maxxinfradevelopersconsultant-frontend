'use client'

import { Container } from "@/components/ui"
import { motion } from "framer-motion"

const principles = [
  {
    number: "01.",
    title: "Integrity First",
    desc: "We uphold the highest ethical frameworks and statutory standards across all our advisory services, talent placements, and business partnerships. By maintaining complete transparency and confidentiality, we ensure our clients and candidates experience dependable, legally compliant, and trust-driven HR solutions."
  },
  {
    number: "02.",
    title: "Excellence & Quality",
    desc: "We are committed to delivering top-tier HR services through meticulous candidate screening, verified background intelligence, and measurable corporate training programs. Our relentless dedication to excellence guarantees superior organizational performance aligned with fast-evolving industry demands."
  },
  {
    number: "03.",
    title: "Partnership Spirit",
    desc: "We operate as an authentic, seamless extension of your internal leadership and HR teams. By aligning our recruitment strategies, modern digital tools, and statutory advisory with your overarching strategic vision, we forge long-term partnerships that foster enduring workforce growth."
  }
]

export default function CoreValues() {
  return (
    <section className="relative bg-[#2b4376] text-white py-12 md:py-16 overflow-hidden" id="core-values">
      {/* Top Center Arrow Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[18px] border-t-white z-10" />

      <Container>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold tracking-widest mb-3">
            Our Core Values
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            The Principles That <span className="text-secondary">Guide Our Decisions</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-200 mt-1.5 max-w-2xl mx-auto leading-relaxed">
            We are committed to maintaining high standard deliverables, ensuring compliance, and delivering growth.
          </p>
        </motion.div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {principles.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col"
            >
              {/* Number */}
              <span className="text-2xl sm:text-3xl font-medium text-secondary tracking-tight block mb-2 select-none">
                {item.number}
              </span>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

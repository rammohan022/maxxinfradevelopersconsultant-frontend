'use client'

import { Container } from "@/components/ui"
import { motion } from "framer-motion"

const spiceValues = [
  {
    letter: "S",
    title: "Strategic Partnership",
    desc: "Working as a trusted extension of our clients' business and HR teams"
  },
  {
    letter: "P",
    title: "Pragmatic Innovation",
    desc: "Using practical ideas, technology and new approaches to solve real business problems"
  },
  {
    letter: "I",
    title: "Integrity",
    desc: "Transparency, confidentiality, ethics and doing the right thing"
  },
  {
    letter: "C",
    title: "Continuous Learning",
    desc: "Staying ahead of evolving talent practices, technology, regulations and business needs"
  },
  {
    letter: "E",
    title: "Excellence",
    desc: "Commitment to quality, accuracy, speed and measurable outcomes"
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
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold tracking-widest mb-3 backdrop-blur-sm">
            S.P.I.C.E. — Our Core Values
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            The Principles That <span className="text-secondary">Guide Our Decisions</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-200 mt-2.5 max-w-3xl mx-auto leading-relaxed">
            Our <span className="text-secondary font-bold tracking-wider">SPICE</span> is our commitment to building <strong className="text-white font-semibold">Strategic Partnerships</strong>, driving <strong className="text-white font-semibold">Pragmatic Innovation</strong>, operating with <strong className="text-white font-semibold">Integrity</strong>, embracing <strong className="text-white font-semibold">Continuous Learning</strong>, and delivering <strong className="text-white font-semibold">Excellence</strong>.
          </p>
        </motion.div>

        {/* 5 S.P.I.C.E. Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {spiceValues.map((item, idx) => {
            return (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between bg-white/5 hover:bg-white/[0.09] border border-white/10 hover:border-secondary/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1.5 shadow-lg hover:shadow-2xl"
              >
                <div>
                  {/* Letter Monogram */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-secondary font-black text-2xl shadow-inner group-hover:bg-secondary group-hover:text-white transition-colors duration-300 mb-4">
                    {item.letter}
                  </div>

                  {/* Core Value Title */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>

                  {/* What it represents */}
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

"use client";

import { Container } from "@/components/ui"
import { motion } from "framer-motion"

export default function CTAQuote() {
  return (
    <section className="py-10 lg:py-14 bg-[#1e2a4a] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: 'url(/img/hr_hero_bg_1783707638359.png)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e2a4a] via-[#1e2a4a]/90 to-[#1e2a4a]/40" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif-heading mb-6 leading-tight drop-shadow-md">
              Connecting Exceptional Talent With Leading Global Organizations
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-serif italic mb-8">
              &quot;Our commitment to excellence format is not just a promise, it&#39;s the foundation of every client relationship we build.&quot;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="bg-primary p-8 sm:p-10 lg:p-12 rounded-2xl relative shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10" />

            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm shadow-inner border border-white/20">
                <svg className="w-8 h-8 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white/95 mb-6 text-lg sm:text-xl font-serif italic leading-relaxed">
                  &quot;Their dedication, expertise, and recruitment support are unmatched. They found us the perfect leadership team, making the process seamless.&quot;
                </p>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-bold text-xl mb-1">N.K. Singh</p>
                  <p className="text-white/80 text-sm font-medium tracking-wider">Founder & Managing Director, People Consulting</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

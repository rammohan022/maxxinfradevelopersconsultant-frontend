'use client'

import Image from "next/image"
import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"

const reasons = [
  {
    title: "Industry Expertise",
    desc: "Experience spanning over two decades across corporate recruitment, executive search, and human resource management.",
  },
  {
    title: "Integrated HR Solutions",
    desc: "Matters are handled through cross-disciplinary collaboration, enabling coordinated talent acquisition and training solutions.",
  },
  {
    title: "End-to-End Compliance",
    desc: "Assistance extends beyond recruitment to include strategic advisory support in labor compliance, payroll, and policy-related issues.",
  },
]

const stats = [
  { value: "500+", label: "Active Jobs" },
  { value: "3000+", label: "Active Resumes" },
  { value: "120+", label: "Employer Profiles" },
  { value: "250+", label: "Positions Matched" },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-50 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            WHY US
          </span>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy font-serif-heading leading-tight">
            A Structured Approach to Talent and Culture
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants} className="text-gray-600 mb-10 text-lg leading-relaxed">
              In a dynamic corporate environment, talent acquisition involves overlapping regulatory and procedural considerations. <strong> People Consulting</strong> follows a coordinated approach that integrates recruitment, training, and compliance support across practice areas.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-600 mb-10 text-lg leading-relaxed">We focus on building long-term professional relationships through consistent engagement, clear communication, and delivering High Performance workplace solutions.</motion.p>
            <div className="space-y-8">
              {reasons.map((r, i) => (
                <motion.div variants={itemVariants} key={r.title} className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl font-serif-heading mt-1">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy font-serif-heading mb-2">
                      {r.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col h-full justify-between gap-8 mt-4 lg:mt-0"
          >
            <div className="rounded-2xl overflow-hidden bg-navy/80 relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] shadow-2xl group">
              <Image
                src="/img/hr_about_us_1783707647467.png"
                alt="Our team"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-60" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {stats.map((s) => (
                <motion.div
                  variants={itemVariants}
                  key={s.label}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center"
                >
                  <span className="text-primary font-bold text-3xl sm:text-4xl font-serif-heading mb-2">{s.value}</span>
                  <span className="font-semibold text-navy/80 text-sm sm:text-base">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

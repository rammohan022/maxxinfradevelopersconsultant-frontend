"use client";

import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"

const partners = [
  { name: 'Partner 1', placeholder: true },
  { name: 'Partner 2', placeholder: true },
  { name: 'Partner 3', placeholder: true },
  { name: 'Partner 4', placeholder: true },
  { name: 'Partner 5', placeholder: true },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", bounce: 0.4 } },
}

export default function Partners() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white border-t border-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-3">
            Our Partner
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Trusted By Many Front Line Teams Everywhere
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
        >
          {partners.map((p, i) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, filter: "grayscale(0%)", y: -5 }}
              key={`${p.name}-${i}`}
              className="w-28 h-14 sm:w-32 sm:h-16 lg:w-40 lg:h-20 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-sm sm:text-base tracking-wider filter grayscale opacity-70 hover:opacity-100 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Logo
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

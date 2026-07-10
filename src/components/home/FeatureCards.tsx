'use client'

import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"

const features = [
  {
    title: 'Executive Search',
    desc: 'We specialize in identifying, assessing, and placing top-tier leadership talent across various industries, ensuring a perfect cultural and strategic fit for your organization.',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
    ),
  },
  {
    title: 'Compliance & Payroll',
    desc: 'Navigate complex labor laws seamlessly. Our team manages payroll administration and ensures strict adherence to all statutory compliance and regulatory requirements.',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 10h6v2h-6v-2zm0-4h6v2h-6v-2z" /></svg>
    ),
  },
  {
    title: 'Training & Development',
    desc: 'Empower your workforce with targeted training programs designed to enhance skills, boost productivity, and foster leadership qualities at all organizational levels.',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
    ),
  },
  {
    title: 'Strategic Consulting',
    desc: 'Transform your HR operations with our strategic advisory services, focusing on organizational restructuring, performance management, and employee engagement.',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function FeatureCards() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-6 sm:p-8 rounded-xl border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center bg-white"
            >
              <div className="text-primary mb-5 flex justify-start group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg sm:text-xl text-start font-bold text-navy font-serif-heading mb-3">{f.title}</h3>
              <p className="text-gray-600 text-start text-sm sm:text-base leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

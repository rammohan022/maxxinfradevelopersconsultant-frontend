'use client'

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"

const bulletsLeft = [
  "Strategic Talent Acquisition",
  "Executive Search & Headhunting",
  "HR Compliance & Labor Law",
  "Payroll Management",
]

const bulletsRight = [
  "Employee Engagement Programs",
  "Corporate Training & Development",
  "Performance Management Systems",
  "Organizational Restructuring",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden" id="about">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-3 sm:gap-4 relative"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="space-y-3 sm:space-y-4">
              <motion.div variants={imageVariants} className="aspect-[4/5] rounded-2xl bg-slate-100 overflow-hidden relative shadow-lg">
                <Image
                  src="/img/hr_about_us_1783707647467.png"
                  alt="HR Consulting"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
              <motion.div variants={imageVariants} className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative shadow-lg">
                <Image
                  src="/img/hr_training_1783707657031.png"
                  alt="Corporate Training"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12">
              <motion.div variants={imageVariants} className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative shadow-lg">
                <Image
                  src="/img/hr_hero_bg_1783707638359.png"
                  alt="Corporate Office"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
              <motion.div variants={imageVariants} className="aspect-[4/5] rounded-2xl bg-slate-100 overflow-hidden relative shadow-lg">
                <Image
                  src="/img/hr_submit_cv_1783707666212.png"
                  alt="Career Growth"
                  fill
                  className="object-cover opacity-90 hover:scale-105 hover:opacity-100 transition duration-500"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Aligning Strategy With{' '}
              <span className="text-secondary">People & Culture</span>
            </h2>

            <p className="text-slate-600 mb-6 text-base sm:text-lg leading-relaxed">
              <strong>People Consulting</strong> is a premier HR and Recruitment agency dedicated to providing strategic, solution-oriented talent acquisition and human resource management services. With a multidisciplinary approach and strong professional network, we cater to businesses and corporate entities across diverse sectors.
            </p>

            <p className="text-slate-600 mb-8 text-base sm:text-lg leading-relaxed">
              We help organizations streamline their recruitment, training, and labor compliance processes. Our goal is to connect top talent with industry leaders, ensuring High Performance workplaces and long-term organizational success.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10"
            >
              <ul className="space-y-3">
                {bulletsLeft.map((b) => (
                  <motion.li variants={itemVariants} key={b} className="flex text-sm items-center gap-3 text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {b}
                  </motion.li>
                ))}
              </ul>

              <ul className="space-y-3">
                {bulletsRight.map((b) => (
                  <motion.li variants={itemVariants} key={b} className="flex text-sm items-center gap-3 text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-secondary/30 hover:scale-[1.02]"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

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
    <section className="py-16 md:py-14 bg-white overflow-hidden" id="about">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Single Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/3] w-full rounded-2xl bg-slate-100 overflow-hidden shadow-xl"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl -z-10" />

            <Image
              src="/img/hr_about_us_1783707647467.png"
              alt="People Consulting"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              About Us
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Aligning Strategy With{' '}
              <span className="text-secondary">People & Culture</span>
            </h2>

            <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">
              <strong>People Consulting</strong> is a premier HR and Recruitment agency dedicated to providing strategic, solution-oriented talent acquisition and human resource management services. With a multidisciplinary approach and strong professional network, we cater to businesses and corporate entities across diverse sectors.
            </p>

            <p className="text-slate-600 mb-8 text-sm sm:text-base leading-relaxed">
              We help organizations streamline their recruitment, training, and labor compliance processes. Our goal is to connect top talent with industry leaders, ensuring High Performance workplaces and long-term organizational success.
            </p>

            <Link
              href="/about-us"
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-secondary/30 hover:scale-[1.02]"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

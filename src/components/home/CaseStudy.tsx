"use client";

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"

const cases = [
  {
    title: "Real Estate Issue",
    desc: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.",
  },
  {
    title: "Money Laundering",
    desc: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.",
  },
  {
    title: "Critical Murder Case",
    desc: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function CaseStudy() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-navy text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-0 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -z-0" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left max-w-3xl mb-12 sm:mb-16"
        >
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 border-l-4 border-primary pl-3">
            Case Study
          </span>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-serif-heading leading-tight drop-shadow-md">
            We Are Providing Top Services With Excellent Performance
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {cases.map((c) => (
            <motion.div
              variants={itemVariants}
              key={c.title}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group rounded-2xl overflow-hidden bg-navy-light/40 border border-white/10 hover:border-primary/50 transition-colors backdrop-blur-sm shadow-xl"
            >
              <div className="aspect-video bg-navy relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
                  alt={c.title}
                  fill
                  className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light to-transparent opacity-80" />
              </div>

              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold font-serif-heading mb-3 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-white/70 mb-6 text-sm lg:text-base leading-relaxed line-clamp-3">
                  {c.desc}
                </p>
                <Link href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors group/link text-sm uppercase tracking-wider">
                  Read More
                  <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-2 mt-12 justify-center"
        >
          <span className="w-8 h-1.5 rounded-full bg-primary" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </Container>
    </section>
  )
}

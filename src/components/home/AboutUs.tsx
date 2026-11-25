'use client'

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { motion } from "framer-motion"

export default function AboutUs() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden border-b border-slate-100/80" id="about">
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
              src="/img/aboutus.jpg"
              alt="Maxx Infra Developers & Consultant"
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-4">
              About Maxx Infra Developers & Consultant
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4 leading-snug">
              Your Trusted Real Estate Partner for <span className="text-secondary">Property in Lucknow</span>
            </h2>

            <div className="space-y-3.5 text-xs md:text-sm text-slate-600 leading-relaxed mb-8">
              <p>
                Maxx Infra Developers & Consultant is a leading real estate development and consultancy firm committed to delivering verified, high-value properties in Lucknow S.C.R and NCR. We offer premium residential plots, luxury duplex villas, and modern row houses with zero brokerage.
              </p>

              <p>
                Our HR advisory services help organisations strengthen HR processes and documentation, while our labour law compliance services support the management of applicable statutory obligations. Through our recruitment consulting services, we help businesses identify suitable talent, improve hiring processes and build capable teams.
              </p>

              <p>
                We also provide talent management services that focus on employee development, leadership capabilities and workforce effectiveness.
              </p>

              <p>
                Our goal is to help businesses manage their people more effectively, improve operational efficiency and build a workforce prepared for long-term success.
              </p>
            </div>

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

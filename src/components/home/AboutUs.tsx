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
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-4">
              About People Consulting
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4 leading-snug">
              We believe people drive organisations. We help businesses turn their{' '}
              <span className="text-secondary">
                people advantage into business advantage.
              </span>
            </h2>

            <div className="space-y-3.5 text-xs md:text-sm text-slate-600 leading-relaxed mb-8">
              <p>
                For more than a decade, <strong>People Consulting</strong> has partnered with organisations across India to solve the people challenges that sit at the heart of business performance. We bring together <strong>people, expertise, technology and execution</strong> to help organisations build stronger and more future ready businesses.
              </p>

              <p>
                Our capabilities span <strong>Workforce Solutions, HR Consulting &amp; Talent Advisory, Talent Development &amp; Capacity Building, Labour Compliance and HR Technology</strong>. But we don&apos;t look at these as separate services. We look at them as interconnected levers that shape how an organisation <strong>attracts talent, builds capability, manages risk, improves efficiency and performs</strong>.
              </p>

              <p>
                Our philosophy is simple: <strong>understand the business first, challenge conventional thinking and create solutions that work in the real world.</strong> We combine seasoned HR expertise with <strong>Pragmatic Innovation, Continuous Learning and Strategic Partnership</strong> to turn complex people challenges into practical, scalable outcomes.
              </p>

              <p>
                We work alongside our clients, not simply for them, as a <strong>Strategic People Partner</strong>, bringing clarity to decisions, capability to teams and technology to processes.{' '}
                <strong>Because when people, processes and technology work in sync, businesses perform better.</strong>
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

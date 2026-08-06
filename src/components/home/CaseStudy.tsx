"use client";

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui"
import { motion } from "framer-motion"

const cases = [
  {
    title: "Tech Startup Scaling",
    desc: "Helped a high-growth tech platform hire 50+ engineers and operations staff in under 3 months, aligning culture and compliance.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    title: "Labor Compliance Audit",
    desc: "Conducted a complete HR and payroll audit for a multi-state retail group, resolving key regulatory issues and restructuring contract models.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    title: "Leadership Alignment",
    desc: "Designed and implemented a custom executive training and performance management curriculum for a national logistics provider.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  },
]

export default function CaseStudy() {
  return (
    <section className="py-16 md:py-14 bg-slate-50 text-slate-900 relative overflow-hidden" id="case-studies">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-0" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left max-w-3xl mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest mb-4">
            Case Studies
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Delivering measurable growth and organizational alignment
          </h2>
        </motion.div>

        {/* Render cards directly with Tailwind transition effects to prevent visibility issues */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl backdrop-blur-sm shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-40" />
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-primary mb-3 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-sm lg:text-base leading-relaxed line-clamp-3">
                    {c.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 lg:px-8 lg:pb-8">
                <Link href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group/link text-sm tracking-wider">
                  Read More
                  <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

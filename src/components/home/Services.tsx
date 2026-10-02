'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Services() {
  return (
    <section className="py-16 md:py-18 bg-gradient-to-br from-[#e8f1fc] via-[#f1f6fc] to-[#fef1e6] relative overflow-hidden border-b border-slate-200/80" id="services">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-secondary/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle Pattern Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#2b4376 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Heading & Description in a clean card */}
          <div className="lg:col-span-5 bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white shadow-xl shadow-slate-200/60 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest">
              <Sparkles size={13} className="text-secondary" />
              <span>Our Capabilities</span>
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Discover <span className="text-secondary">How We Create Impact</span>
            </h2>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
              We help organisations solve complex <strong className="text-primary font-semibold">people and workforce challenges</strong> through integrated solutions across Workforce, Consulting, Talent Development, Compliance and HR Technology. Our focus is simple &mdash; <strong className="text-primary font-semibold">practical solutions, stronger capabilities and measurable business impact</strong>.
            </p>
          </div>

          {/* Right Column: 2 Cards (Services & Industries) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 lg:gap-8">

            {/* Card 1: Services */}
            <Link
              href="/services"
              className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 block transform hover:-translate-y-2 border-2 border-white/90"
            >
              <Image
                src="/img/capabilities_card.png"
                alt="Services"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Dark Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-center justify-between z-10">
                <span className="text-white font-bold text-lg sm:text-xl tracking-wider drop-shadow">
                  Services
                </span>

                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                  <ArrowRight size={20} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 2: Industries */}
            <Link
              href="/industries"
              className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 block transform hover:-translate-y-2 border-2 border-white/90"
            >
              <Image
                src="/img/industries_card.png"
                alt="Industries"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Dark Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-center justify-between z-10">
                <span className="text-white font-bold text-lg sm:text-xl tracking-wider drop-shadow">
                  Industries
                </span>

                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                  <ArrowRight size={20} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

          </div>

        </div>
      </Container>
    </section>
  )
}

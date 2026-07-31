'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-sky-50/40 relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Discover what we do
            </h2>

            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
              People Consulting&apos;s core services are designed to help organizations build strong leadership, navigate complexity, and accelerate long-term performance. Our partners bring firsthand expertise across major global sectors—from industrial manufacturing and technology to healthcare, consumer, financial services and the public sphere. We help clients anticipate industry shifts, build future-ready leadership, and seize opportunity in rapidly evolving markets.
            </p>
          </div>

          {/* Right Column: 2 Cards (Services & Industries) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Card 1: Services */}
            <Link
              href="/services"
              className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 block transform hover:-translate-y-1.5"
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
                <span className="text-white font-bold text-lg sm:text-xl tracking-wider uppercase drop-shadow">
                  SERVICES
                </span>
                
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                  <ArrowRight size={20} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 2: Industries */}
            <Link
              href="/industries"
              className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 block transform hover:-translate-y-1.5"
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
                <span className="text-white font-bold text-lg sm:text-xl tracking-wider uppercase drop-shadow">
                  INDUSTRIES
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

'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { ShieldCheck, Flame, Users2, Award, ArrowLeft, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { motion } from "framer-motion"

import "swiper/css"
import "swiper/css/pagination"

const values = [
  { name: "Integrity First", icon: ShieldCheck, desc: "Ethical frameworks guide all placements, advisory services, and billing practices without compromise." },
  { name: "Excellence & Quality", icon: Award, desc: "We focus on candidate quality, strict background validation, and measurable corporate training results." },
  { name: "Partnership Spirit", icon: Users2, desc: "We operate as an extension of your in-house teams, aligning our search parameters with your strategic vision." },
  { name: "Continuous Evolution", icon: Flame, desc: "Adapting modern search technologies and dynamic training curriculum to match changing market realities." },
]

export default function CoreValues() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="py-16 md:py-14 bg-slate-50 overflow-hidden" id="core-values">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Our Core Values
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            The principles that <span className="text-secondary">guide our decisions</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            We are committed to maintaining high standard deliverables, ensuring compliance, and delivering growth.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative px-4 sm:px-12"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-values',
              prevEl: '.swiper-button-prev-values',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {values.map((val) => {
              const Icon = val.icon
              return (
                <SwiperSlide key={val.name}>
                  <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col min-h-[220px]">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{val.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-values absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="swiper-button-next-values absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>
      </Container>
    </section>
  )
}

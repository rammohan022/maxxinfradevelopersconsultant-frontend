'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { Cpu, HeartPulse, Building2, Factory, ShoppingCart, Briefcase, ArrowLeft, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { motion } from "framer-motion"

import "swiper/css"
import "swiper/css/pagination"

const industries = [
  { name: "IT & Technology", icon: Cpu, desc: "Software engineering, product development, cloud operations, and leadership talent." },
  { name: "Healthcare & Life Sciences", icon: HeartPulse, desc: "Hospital administration, nursing, specialized medicine, and biotech research profiles." },
  { name: "Banking & Finance", icon: Building2, desc: "Investment banking, compliance officers, risk advisory, and accounting talent." },
  { name: "Manufacturing & Core", icon: Factory, desc: "Operations head, supply chain experts, QA engineering, and plant management." },
  { name: "Retail & E-commerce", icon: ShoppingCart, desc: "Logistics managers, merchandise planners, brand managers, and digital strategists." },
  { name: "Corporate & Services", icon: Briefcase, desc: "Legal counsel, HR directors, administrative leaders, and executive staff." },
]

export default function IndustriesServe() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="py-16 md:py-14 bg-slate-50 overflow-hidden" id="industries">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Industries We Serve
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Specialized recruitment across <span className="text-secondary">six core sectors</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed">
            Our search team brings sector-specific compliance knowledge and deep candidate networks to deliver optimal placements.
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
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl,
              nextEl,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {industries.map((ind) => {
              const Icon = ind.icon
              return (
                <SwiperSlide key={ind.name}>
                  <div className="group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col min-h-[220px]">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-primary mb-1 flex items-center gap-1.5">{ind.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button 
            ref={setPrevEl}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            ref={setNextEl}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>
      </Container>
    </section>
  )
}

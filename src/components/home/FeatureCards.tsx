'use client'

import { Container } from "@/components/ui"
import { motion, Variants } from "framer-motion"

const partners = [
  {
    name: 'Warner Bros. Discovery',
    logo: (
      <svg viewBox="0 0 140 35" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="14" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="10" fill="#1e3a8a" letterSpacing="0.5">WARNER BROS.</text>
        <text x="5" y="27" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="11" fill="#0284c7" letterSpacing="0.5">DISCOVERY</text>
      </svg>
    )
  },
  {
    name: 'Deloitte',
    logo: (
      <svg viewBox="0 0 120 30" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="#000000">Deloitte</text>
        <circle cx="94" cy="20" r="3.5" fill="#86BC25" />
      </svg>
    )
  },
  {
    name: 'Wipro',
    logo: (
      <svg viewBox="0 0 120 40" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(20, 20)">
          <circle cx="-8" cy="-8" r="3.5" fill="#5F259F"/>
          <circle cx="0" cy="-11" r="3" fill="#005A9C"/>
          <circle cx="8" cy="-8" r="3.5" fill="#008542"/>
          <circle cx="11" cy="0" r="3" fill="#FFBC00"/>
          <circle cx="8" cy="8" r="3.5" fill="#E4002B"/>
          <circle cx="0" cy="11" r="3" fill="#D3007D"/>
          <circle cx="-8" cy="8" r="3.5" fill="#00A9E0"/>
          <circle cx="-11" cy="0" r="3" fill="#7C2529"/>
        </g>
        <text x="45" y="26" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#121212">wipro</text>
      </svg>
    )
  },
  {
    name: 'Sterlite',
    logo: (
      <svg viewBox="0 0 130 35" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5) scale(0.8)">
          <path d="M5 25 C 10 10, 25 10, 30 20 C 25 25, 15 25, 5 25 Z" fill="#005A9C"/>
          <path d="M15 15 C 20 5, 35 5, 35 15 C 30 20, 20 20, 15 15 Z" fill="#FF8200"/>
        </g>
        <text x="45" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="#0E4B82">Sterlite</text>
      </svg>
    )
  },
  {
    name: 'Coca-Cola',
    logo: (
      <svg viewBox="0 0 130 35" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="27" fontFamily="'Brush Script MT', cursive, sans-serif" fontWeight="bold" fontStyle="italic" fontSize="26" fill="#F40009">Coca-Cola</text>
      </svg>
    )
  },
  {
    name: 'Raymond',
    logo: (
      <svg viewBox="0 0 120 32" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="32" rx="3" fill="#D81E05" />
        <text x="60" y="21" fontFamily="Georgia, serif" fontWeight="900" fontSize="13" fill="white" textAnchor="middle" letterSpacing="1">RAYMOND</text>
      </svg>
    )
  },
  {
    name: 'HDFC Bank',
    logo: (
      <svg viewBox="0 0 140 35" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5)">
          <rect width="25" height="25" fill="#003366" />
          <rect x="10" y="3" width="5" height="19" fill="#E31E24" />
          <rect x="3" y="10" width="19" height="5" fill="#E31E24" />
          <rect x="11" y="4" width="3" height="17" fill="white" />
          <rect x="4" y="11" width="17" height="3" fill="white" />
        </g>
        <text x="38" y="18" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13" fill="#003366">HDFC BANK</text>
        <text x="38" y="28" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#666666">We understand your world</text>
      </svg>
    )
  }
]

export default function FeatureCards() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100 overflow-hidden">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            A leading HR service provider
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed">
            Join hands with People Consulting, your HR partner with a rich experience of over 5 years in collaborating with organizations. Our comprehensive end-to-end{" "}
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              HR services
            </a>{" "}
            and solutions are driven by deep domain expertise, ensuring you get the best support for your HR needs
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full overflow-hidden py-4"
        >
          {/* Edge fading gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Container */}
          <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
            {[...partners, ...partners, ...partners].map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className="flex items-center justify-center bg-gray-50/80 hover:bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md rounded-lg px-6 py-4 w-44 h-16 transition-all duration-200 cursor-pointer shrink-0"
              >
                {p.logo}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

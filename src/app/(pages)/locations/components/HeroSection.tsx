"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

type Props = {
  city: string
  bannerUrl: string
}

export default function HeroSection({ city, bannerUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
      <Image
        src={bannerUrl}
        alt={`${city} skyline`}
        fill
        priority
        className="object-cover scale-100 transition-transform duration-700 will-change-transform"
      />
      <div className="absolute inset-0 bg-[#1f2f46]/70" />
      <div
        ref={ref}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-3 transition-all duration-700"
      >
        <div className="text-gray-200 text-sm mb-3">Home / Leading law firm in {city}</div>
        <h1 className="text-white text-4xl md:text-5xl font-serif-heading font-semibold tracking-tight">
          Leading law firm in&nbsp;{city}
        </h1>
        <p className="text-gray-200 text-lg mt-4 max-w-3xl">
          We provide strategic corporate advisory and high-stakes dispute resolution for
          businesses and individuals in {city}. Trusted counsel with deep sector expertise.
        </p>
      </div>
    </section>
  )
}

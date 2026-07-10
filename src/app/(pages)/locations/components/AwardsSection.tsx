"use client"

import Image from "next/image"
import { useEffect } from "react"

const awards = [
  {
    title: "IFLR1000",
    image:
      "/img/award-iflr1000.png",
  },
  {
    title: "Asian Legal Business",
    image:
      "/img/award-alb.png",
  },
  {
    title: "Benchmark Litigation",
    image:
      "/img/award-benchmark.png",
  },
  {
    title: "Legal 500",
    image:
      "/img/award-legal500.png",
  },
]

export default function AwardsSection() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.1 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 opacity-0 translate-y-3 transition-all duration-700" data-reveal>
          <h2 className="text-3xl md:text-4xl font-serif-heading font-semibold text-gray-900">
            Awards&nbsp;&nbsp;&&nbsp;&nbsp;Recognition
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8 items-center">
          {awards.map((a) => (
            <div key={a.title} className="flex items-center justify-center opacity-0 translate-y-3 transition-all duration-700" data-reveal>
              <div className="grayscale hover:grayscale-0 transition duration-300">
                <Image
                  src={a.image}
                  alt={a.title}
                  width={180}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

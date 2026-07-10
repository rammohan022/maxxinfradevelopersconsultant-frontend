'use client'
import { WhyChooseUs } from '@/components/about'
import { CareerHero, HiringProcess, LifeAtCompany, OpenPosition } from '@/components/career'
import { CallToAction, Container } from '@/components/ui'

export default function CareerPage() {
  return (
    <>
      {/* ================= 1. HERO ================= */}
      <CareerHero />
      <OpenPosition/>
      <HiringProcess/>
      <WhyChooseUs/>
      {/* ================= 5. LIFE AT COMPANY ================= */}
      <LifeAtCompany/>
      {/* ================= 6. CTA SECTION ================= */}
      <CallToAction />
    </>
  )
}

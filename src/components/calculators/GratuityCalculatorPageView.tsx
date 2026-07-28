'use client'

import { Container } from '@/components/ui'
import GratuityCalculator from '@/components/calculators/GratuityCalculator'
import GratuityContent from '@/components/calculators/GratuityContent'
import CalculatorSidebar from '@/components/calculators/CalculatorSidebar'

export default function GratuityCalculatorPageView() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-6 md:py-10">
      <Container>
        {/* Main Header (Compact & Small) */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Gratuity Calculator
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Estimate your statutory gratuity payout under the Payment of Gratuity Act 1972 using your last drawn basic salary and tenure of service.
          </p>
        </div>

        {/* Main Grid: Calculator & Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <GratuityCalculator />
            <GratuityContent />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <CalculatorSidebar currentPath="/gratuity-calculator" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

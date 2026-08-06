'use client'

import { useState, useMemo } from 'react'
import { Info } from 'lucide-react'

export default function GratuityCalculator() {
  // Input States
  const [monthlySalary, setMonthlySalary] = useState<number>(60000)
  const [yearsOfService, setYearsOfService] = useState<number>(20)

  // Gratuity Formula: G = (Years of Service * (Basic + DA) * 15) / 26
  const gratuityCalculation = useMemo(() => {
    const rawAmount = (yearsOfService * monthlySalary * 15) / 26
    const calculatedGratuity = Math.round(rawAmount)
    const statutoryCap = 2000000 // ₹ 20 Lakhs statutory tax exemption cap
    const isExceedingCap = calculatedGratuity > statutoryCap
    const taxableExGratia = isExceedingCap ? calculatedGratuity - statutoryCap : 0

    return {
      calculatedGratuity,
      statutoryCap,
      isExceedingCap,
      taxableExGratia,
    }
  }, [monthlySalary, yearsOfService])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      {/* Main Grid: Left Sliders, Right Result Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Field 1: Monthly Salary (Basic + DA) */}
          <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Monthly Salary (Basic + DA)
              </label>
              <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3.5 py-1.5 rounded-lg border border-secondary/30 min-w-[140px] justify-end">
                <span className="text-secondary/70">₹</span>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  className="w-24 text-right bg-transparent focus:outline-none text-secondary font-bold"
                />
              </div>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={2000}
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary mt-2"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          {/* Field 2: Years of Service */}
          <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Years of Service
              </label>
              <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3.5 py-1.5 rounded-lg border border-secondary/30 min-w-[90px] justify-end">
                <input
                  type="number"
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(Number(e.target.value))}
                  className="w-12 text-right bg-transparent focus:outline-none text-secondary font-bold"
                />
                <span className="text-xs font-normal text-secondary/70">yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={yearsOfService}
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary mt-2"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>
          </div>

          {/* 5-Year Requirement Info Note */}
          <div className="bg-[#fff5ee]/60 border border-secondary/20 p-4 rounded-xl text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-primary flex items-center gap-1.5">
              <Info className="w-4 h-4 text-secondary shrink-0" />
              Eligibility Benchmark
            </p>
            <p className="leading-relaxed">
              Standard statutory gratuity requires a minimum of 5 years of continuous service in the organization (exempted in case of disability or fatal injury).
            </p>
          </div>
        </div>

        {/* Right Result Card (Single Light Theme Color) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="bg-[#fef8f4] rounded-2xl p-8 border border-secondary/30 shadow-xs text-center space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 tracking-widest block">
                Total Gratuity Payable
              </span>
              <span className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight mt-3 block">
                {formatCurrency(gratuityCalculation.calculatedGratuity)}
              </span>
            </div>

            <div className="pt-6 border-t border-secondary/20 space-y-3 text-xs text-slate-600 text-left">
              <div className="flex justify-between items-center">
                <span>Calculated Formula</span>
                <span className="font-mono text-slate-800 font-semibold">(Years × Salary × 15) / 26</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Max Tax-Exempt Limit</span>
                <span className="font-semibold text-slate-800">₹ 20,00,000</span>
              </div>
              {gratuityCalculation.isExceedingCap && (
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-800 text-[11px]">
                  <strong>Ex-Gratia Note:</strong> Amount above ₹20 Lakhs ({formatCurrency(gratuityCalculation.taxableExGratia)}) is treated as taxable ex-gratia payment.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SalaryCalculator() {
  // Field States matching exact user requested fields
  const [ctc, setCtc] = useState<number>(600000)
  const [bonusType, setBonusType] = useState<'percentage' | 'amount'>('percentage')
  const [bonusValue, setBonusValue] = useState<number>(15)
  const [professionalTax, setProfessionalTax] = useState<number>(200)
  const [employerPF, setEmployerPF] = useState<number>(1800)
  const [employeePF, setEmployeePF] = useState<number>(1800)
  const [additionalDeduction1, setAdditionalDeduction1] = useState<number>(33)
  const [additionalDeduction2, setAdditionalDeduction2] = useState<number>(0)

  // Calculations
  const calculated = useMemo(() => {
    const monthlyCTC = Math.round(ctc / 12)
    
    // Annual & Monthly Bonus
    const annualBonus = bonusType === 'percentage'
      ? Math.round(ctc * (bonusValue / 100))
      : bonusValue
    const monthlyBonus = Math.round(annualBonus / 12)

    // Gross Salary = Monthly CTC - Employer PF - Monthly Bonus
    const grossMonthly = Math.max(0, monthlyCTC - employerPF - monthlyBonus)

    // Total Monthly Deductions = Employee PF + PT + Deduction 1 + Deduction 2
    const monthlyDeductions = employeePF + professionalTax + additionalDeduction1 + additionalDeduction2

    // Net Take Home Salary
    const netMonthlyInHand = Math.max(0, grossMonthly - monthlyDeductions)
    const annualInHand = netMonthlyInHand * 12
    const totalAnnualDeductions = monthlyDeductions * 12

    // Breakdown Percentages for Chart
    const takeHomeShare = Math.min(100, Math.max(0, Math.round((netMonthlyInHand / (monthlyCTC || 1)) * 100)))
    const pfShare = Math.min(100, Math.max(0, Math.round(((employerPF + employeePF) / (monthlyCTC || 1)) * 100)))
    const otherShare = Math.max(0, 100 - takeHomeShare - pfShare)

    return {
      monthlyCTC,
      annualBonus,
      monthlyBonus,
      grossMonthly,
      monthlyDeductions,
      netMonthlyInHand,
      annualInHand,
      totalAnnualDeductions,
      takeHomeShare,
      pfShare,
      otherShare,
    }
  }, [ctc, bonusType, bonusValue, professionalTax, employerPF, employeePF, additionalDeduction1, additionalDeduction2])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Exact Fields) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Field 1: Cost to Company (CTC) */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Cost to Company (CTC)
              </label>
              <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[140px] justify-end">
                <span className="text-secondary/70">₹</span>
                <input
                  type="number"
                  value={ctc}
                  onChange={(e) => setCtc(Number(e.target.value))}
                  className="w-24 text-right bg-transparent focus:outline-none text-secondary font-bold"
                />
              </div>
            </div>
            <input
              type="range"
              min={200000}
              max={10000000}
              step={25000}
              value={ctc}
              onChange={(e) => setCtc(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary mt-1"
            />
          </div>

          {/* Field 2: Bonus Included in CTC (Percentage / Amount Selector) */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Bonus Included in CTC
                </label>
                <div className="relative inline-block">
                  <select
                    value={bonusType}
                    onChange={(e) => {
                      const newType = e.target.value as 'percentage' | 'amount'
                      setBonusType(newType)
                      if (newType === 'percentage') setBonusValue(15)
                      else setBonusValue(90000)
                    }}
                    className="appearance-none bg-white border border-slate-300 text-xs font-semibold text-slate-700 py-1 pl-2.5 pr-7 rounded-lg cursor-pointer focus:outline-none focus:border-secondary"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="amount">Amount</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[120px] justify-end">
                <span className="text-secondary/70">
                  {bonusType === 'percentage' ? '%' : '₹'}
                </span>
                <input
                  type="number"
                  value={bonusValue}
                  onChange={(e) => setBonusValue(Number(e.target.value))}
                  className="w-20 text-right bg-transparent focus:outline-none text-secondary font-bold"
                />
              </div>
            </div>
            {bonusType === 'percentage' && (
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={bonusValue}
                onChange={(e) => setBonusValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary mt-1"
              />
            )}
          </div>

          {/* Field 3: Monthly Professional Tax */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700">
              Monthly Professional Tax
            </label>
            <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[120px] justify-end">
              <span className="text-secondary/70">₹</span>
              <input
                type="number"
                value={professionalTax}
                onChange={(e) => setProfessionalTax(Number(e.target.value))}
                className="w-20 text-right bg-transparent focus:outline-none text-secondary font-bold"
              />
            </div>
          </div>

          {/* Field 4: Monthly Employer PF */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700">
              Monthly Employer PF
            </label>
            <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[120px] justify-end">
              <span className="text-secondary/70">₹</span>
              <input
                type="number"
                value={employerPF}
                onChange={(e) => setEmployerPF(Number(e.target.value))}
                className="w-20 text-right bg-transparent focus:outline-none text-secondary font-bold"
              />
            </div>
          </div>

          {/* Field 5: Monthly Employee PF */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700">
              Monthly Employee PF
            </label>
            <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[120px] justify-end">
              <span className="text-secondary/70">₹</span>
              <input
                type="number"
                value={employeePF}
                onChange={(e) => setEmployeePF(Number(e.target.value))}
                className="w-20 text-right bg-transparent focus:outline-none text-secondary font-bold"
              />
            </div>
          </div>

          {/* Field 6: Monthly Additional Deduction 1 (Optional) */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700">
              Monthly Additional Deduction <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[120px] justify-end">
              <span className="text-secondary/70">₹</span>
              <input
                type="number"
                value={additionalDeduction1}
                onChange={(e) => setAdditionalDeduction1(Number(e.target.value))}
                className="w-20 text-right bg-transparent focus:outline-none text-secondary font-bold"
              />
            </div>
          </div>

          {/* Field 7: Monthly Additional Deduction 2 (Optional) */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700">
              Monthly Additional Deduction <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="flex items-center gap-1 bg-[#fff5ee] text-secondary font-bold text-sm px-3 py-1.5 rounded-lg border border-secondary/30 min-w-[120px] justify-end">
              <span className="text-secondary/70">₹</span>
              <input
                type="number"
                value={additionalDeduction2}
                onChange={(e) => setAdditionalDeduction2(Number(e.target.value))}
                className="w-20 text-right bg-transparent focus:outline-none text-secondary font-bold"
              />
            </div>
          </div>
        </div>

        {/* Right Summary Card & Breakdown Chart (Single Clean Theme Color) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Main Results Summary Card */}
          <div className="bg-[#fef8f4] rounded-2xl p-6 border border-secondary/30 shadow-xs relative">
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-secondary/20">
                <div>
                  <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                    Monthly In-Hand Salary
                  </span>
                  <span className="text-xs text-slate-400 font-medium">(Take-Home Pay)</span>
                </div>
                <span className="text-2xl md:text-3xl font-extrabold text-secondary tracking-tight">
                  {formatCurrency(calculated.netMonthlyInHand)}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Monthly Cost to Company (CTC)</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(calculated.monthlyCTC)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Gross Monthly Salary</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(calculated.grossMonthly)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Monthly Bonus</span>
                  <span className="font-medium text-slate-700">
                    {formatCurrency(calculated.monthlyBonus)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Total Monthly Deductions</span>
                  <span className="font-semibold text-rose-500">
                    - {formatCurrency(calculated.monthlyDeductions)}
                  </span>
                </div>
              </div>

              {/* Annual Summary Boxes */}
              <div className="pt-4 border-t border-secondary/20 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white p-3.5 rounded-xl border border-secondary/20 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Annual Take-Home
                  </p>
                  <p className="text-sm font-bold text-secondary mt-1">
                    {formatCurrency(calculated.annualInHand)}
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-secondary/20 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Annual Deductions
                  </p>
                  <p className="text-sm font-bold text-rose-500 mt-1">
                    {formatCurrency(calculated.totalAnnualDeductions)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Single Tone Component Distribution Bar */}
          <div className="bg-[#fef8f4] p-5 rounded-2xl border border-secondary/30 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              Salary Distribution
              <span className="text-slate-400 font-normal">100% CTC</span>
            </h3>

            {/* Progress Bar in Single Color Tones */}
            <div className="h-4 w-full bg-slate-200/80 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${calculated.takeHomeShare}%` }}
                className="bg-secondary h-full transition-all duration-300"
                title={`Take Home: ${calculated.takeHomeShare}%`}
              />
              <div
                style={{ width: `${calculated.pfShare}%` }}
                className="bg-secondary/60 h-full transition-all duration-300"
                title={`PF Savings: ${calculated.pfShare}%`}
              />
              <div
                style={{ width: `${calculated.otherShare}%` }}
                className="bg-secondary/30 h-full transition-all duration-300"
                title={`Bonus/Deductions: ${calculated.otherShare}%`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="text-slate-600 font-medium truncate">In-Hand ({calculated.takeHomeShare}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                <span className="text-slate-600 font-medium truncate">PF ({calculated.pfShare}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary/30" />
                <span className="text-slate-600 font-medium truncate">Other ({calculated.otherShare}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

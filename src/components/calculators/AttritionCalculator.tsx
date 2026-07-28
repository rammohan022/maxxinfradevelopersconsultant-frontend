'use client'

import { useState } from 'react'

export default function AttritionCalculator() {
  const [employeesStart, setEmployeesStart] = useState<string>('100')
  const [employeesEnd, setEmployeesEnd] = useState<string>('110')
  const [employeesLeft, setEmployeesLeft] = useState<string>('5')
  const [calculatedRate, setCalculatedRate] = useState<string>('4.76')
  const [hasCalculated, setHasCalculated] = useState<boolean>(true)

  const handleCalculate = () => {
    const start = parseFloat(employeesStart) || 0
    const end = parseFloat(employeesEnd) || 0
    const left = parseFloat(employeesLeft) || 0

    const average = (start + end) / 2
    if (average > 0) {
      const rate = (left / average) * 100
      setCalculatedRate(rate.toFixed(2))
    } else {
      setCalculatedRate('0.00')
    }
    setHasCalculated(true)
  }

  const handleClear = () => {
    setEmployeesStart('')
    setEmployeesEnd('')
    setEmployeesLeft('')
    setCalculatedRate('')
    setHasCalculated(false)
  }

  const numRate = parseFloat(calculatedRate) || 0
  const startVal = parseFloat(employeesStart) || 0
  const endVal = parseFloat(employeesEnd) || 0
  const avgEmp = (startVal + endVal) / 2

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* FIELD 1: Employees at the start */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Employees at the start
          </label>
          <input
            type="number"
            value={employeesStart}
            onChange={(e) => {
              setEmployeesStart(e.target.value)
              setHasCalculated(false)
            }}
            placeholder="e.g., 100"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-base"
          />
        </div>

        {/* FIELD 2: Employees at the end */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Employees at the end
          </label>
          <input
            type="number"
            value={employeesEnd}
            onChange={(e) => {
              setEmployeesEnd(e.target.value)
              setHasCalculated(false)
            }}
            placeholder="e.g., 110"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-base"
          />
        </div>

        {/* FIELD 3: Employees that left */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Employees that left
          </label>
          <input
            type="number"
            value={employeesLeft}
            onChange={(e) => {
              setEmployeesLeft(e.target.value)
              setHasCalculated(false)
            }}
            placeholder="e.g., 5"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-base"
          />
        </div>

        {/* FIELD 4: Attrition rate (Result Input Box) */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Attrition rate
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              readOnly
              value={calculatedRate}
              placeholder=""
              className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 rounded-xl text-slate-900 font-bold text-lg pr-12 focus:outline-none"
            />
            <span className="absolute right-4 text-slate-500 font-bold text-lg pointer-events-none">
              %
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-md active:scale-98 text-sm"
          >
            Calculate Rate
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition duration-200 text-sm"
          >
            Clear all changes
          </button>
        </div>

        {/* SUMMARY BREAKDOWN CARD */}
        {hasCalculated && calculatedRate !== '' && (
          <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-primary border-b border-slate-200 pb-2">
              Attrition Calculation Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div>Average Workforce:</div>
              <div className="font-bold text-slate-900 text-right">{avgEmp} employees</div>
              <div>Employees Departed:</div>
              <div className="font-bold text-slate-900 text-right">{employeesLeft || 0}</div>
              <div>Attrition Rate:</div>
              <div className="font-bold text-primary text-right">{calculatedRate}%</div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Turnover Benchmark Status:</span>
              {numRate <= 10 ? (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  Healthy Attrition Rate (&le; 10%) — Excellent retention metrics.
                </div>
              ) : numRate <= 20 ? (
                <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                  Moderate Attrition Rate (10% &ndash; 20%) — Standard industry average. Consider review.
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                  High Attrition Rate (&gt; 20%) — Requires strategic engagement & retention strategy.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import SalaryCalculatorPageView from '@/components/calculators/SalaryCalculatorPageView'

export const metadata: Metadata = {
  title: 'Salary Calculator - Calculate Take-Home Pay & CTC Breakdown | People Consulting',
  description:
    'Free online Salary Calculator for India. Calculate monthly take-home salary, annual CTC breakdown, provident fund (EPF), professional tax, and net pay in seconds.',
}

export default function Page() {
  return <SalaryCalculatorPageView />
}

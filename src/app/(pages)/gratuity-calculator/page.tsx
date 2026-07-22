import type { Metadata } from 'next'
import GratuityCalculatorPageView from '@/components/calculators/GratuityCalculatorPageView'

export const metadata: Metadata = {
  title: 'Gratuity Calculator - Estimate Retirement & Exit Benefits | People Consulting',
  description:
    'Free online Gratuity Calculator under Payment of Gratuity Act 1972. Calculate your statutory gratuity payout based on monthly basic pay and completed years of service.',
}

export default function Page() {
  return <GratuityCalculatorPageView />
}

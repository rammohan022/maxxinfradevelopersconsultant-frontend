import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | Equity & Legal Solutions',
  description:
    'Build your career with us. Explore open positions, our hiring process, and why professionals choose Equity & Legal Solutions. View jobs in litigation, corporate, and more.',
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | Maxx Infra Developers & Consultant',
  description:
    'Build your real estate career with Maxx Infra Developers & Consultant. Explore open positions in sales, marketing, consulting, and property management in Lucknow & NCR.',
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import Link from 'next/link'
import { Container } from '@/components/ui'

const cyberItems = [
  'Child Pornography Case Lawyer',
  'Digital Arrest Case Lawyer',
  'Cyber Bullying Case Lawyer',
  'Cyber Stalking Case Lawyer',
  'Cyber Grooming Case lawyer',
  'Online Job Fraud Case lawyer',
  'Online Sextortion Case Lawyer',
  'Vishing Case Lawyer',
  'Sexting Case Lawyer',
  'Smishing Case Lawyer',
  'SIM Swap Scam Case Lawyer',
  'Debit/Credit Card Fraud Case Lawyer',
]

export default function CyberCrime() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <Container>
        <span className="inline-block text-primary font-semibold text-sm tracking-wide mb-2">
          Areas of Expertise in Cyber Crime & Online Offences
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4">
          Facing Property Disputes? Maxx Infra Developers & Consultant Offers Expert Legal Remedies & Advisory
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl">
          At Maxx Infra Developers & Consultant, we provide verified property documentation, registry assistance, and clear title verification.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cyberItems.map((item) => (
            <Link
              key={item}
              href="#contact"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-md transition group"
            >
              <span className="font-medium text-navy group-hover:text-primary transition">{item}</span>
              <span className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Read more
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="#"
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded font-medium transition"
          >
            View All Cyber Crime & Online Offences
          </Link>
        </div>
      </Container>
    </section>
  )
}

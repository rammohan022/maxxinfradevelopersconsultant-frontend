import React from 'react'
import { Building2, MapPin, Mail, Phone } from 'lucide-react'
import { Container } from '@/components/ui'

type Branch = {
  city: string
  address: string
  email: string
  phone: string
}

const branches: Branch[] = [
  {
    city: 'Faridabad',
    address:
      '7th Floor, Tower 3, RPS 12th Avenue,\nMain Mathura Road, Sector 27C, Faridabad',
    email: 'hello@peopleconsultings.com',
    phone: '+91 8800177307',
  },
]

const BranchOffices: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <Container>
        {/* Heading */}
        <div className="mb-6">
          <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Our Other Offices
          </h2>
          <p className="text-lg text-gray-600">
            Our nationwide presence to serve you better
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <div
              key={branch.city}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary">
                  {branch.city}
                </h3>
                <div className="rounded-full bg-maroon p-3">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-maroon" />
                  <p className="whitespace-pre-line text-sm text-gray-600">
                    {branch.address}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-maroon" />
                  <a
                    href={`mailto:${branch.email}`}
                    className="text-sm text-gray-600 transition-colors hover:text-maroon"
                  >
                    {branch.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-maroon" />
                  <p className="text-sm text-gray-600">{branch.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default BranchOffices

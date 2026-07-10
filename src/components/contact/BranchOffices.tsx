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
    city: 'Mumbai',
    address:
      'Nariman Point Complex, 12th Floor\nMumbai - 400021, Maharashtra',
    email: 'mumbai@lexington.com',
    phone: '+91 22 6789 0123',
  },
  {
    city: 'Bengaluru',
    address:
      'UB City, 8th Floor, Vittal Mallya Road\nBengaluru - 560001, Karnataka',
    email: 'bengaluru@lexington.com',
    phone: '+91 80 4567 8901',
  },
  {
    city: 'Hyderabad',
    address:
      'Hitech City, Cyber Towers, 6th Floor\nHyderabad - 500081, Telangana',
    email: 'hyderabad@lexington.com',
    phone: '+91 40 2345 6789',
  },
  {
    city: 'Chennai',
    address:
      'Anna Salai, Express Towers, 10th Floor\nChennai - 600002, Tamil Nadu',
    email: 'chennai@lexington.com',
    phone: '+91 44 3456 7890',
  },
  {
    city: 'Kolkata',
    address:
      'Park Street, Camac Court, 7th Floor\nKolkata - 700016, West Bengal',
    email: 'kolkata@lexington.com',
    phone: '+91 33 4567 8901',
  },
  {
    city: 'Pune',
    address:
      'Koregaon Park, Business Plaza, 5th Floor\nPune - 411001, Maharashtra',
    email: 'pune@lexington.com',
    phone: '+91 20 5678 9012',
  },
]

const BranchOffices: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <Container>
        {/* Heading */}
        <div className="mb-6">
          <h2 className="mb-4 text-4xl font-bold text-navy">
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
                <h3 className="text-2xl font-bold text-navy">
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

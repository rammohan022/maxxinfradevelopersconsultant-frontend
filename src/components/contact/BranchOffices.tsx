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
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
            Our Other Offices
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Our nationwide presence to serve you better
          </p>
        </div>

        {/* 2-col layout: cards left, map right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Office Cards */}
          <div className="flex flex-col gap-6 h-full">
            {branches.map((branch) => (
              <div
                key={branch.city}
                className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
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

          {/* Right: Google Map */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full min-h-[320px] h-[320px] lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.151357955893!2d77.32389!3d28.3908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd18f0000001%3A0x1f5c6e3c3b3b3b3b!2sRPS%2012th%20Avenue%2C%20Sector%2027C%2C%20Faridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="People Consulting - Faridabad Office"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default BranchOffices

import React from 'react';
import { Building2, MapPin, Phone, Clock } from 'lucide-react';
import { Container } from '@/components/ui';

type Branch = {
  city: string;
  tag: string;
  address: string;
  phone: string;
};

const branches: Branch[] = [
  {
    city: 'Lucknow Main Office',
    tag: 'Main Sales & Consultation Desk',
    address: 'G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow, Uttar Pradesh',
    phone: '+91 79051 45968 / +91 63861 00070',
  },
  {
    city: 'Goyala City Township Desk',
    tag: 'Project Site Office',
    address: 'Goyala City Township, Outer Ring Road (Kisan Path) Corridor, Lucknow S.C.R',
    phone: '+91 79051 45968',
  },
];

const BranchOffices: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16">
      <Container>
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Visit Us</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            Our Project &amp; Consultation Offices
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2">
            Walk into any of our consultation desks or request a complimentary cab visit for multiple site tours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {branches.map((branch) => (
            <div
              key={branch.city}
              className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {branch.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Clock size={12} /> Mon-Sun: 9 AM - 7:30 PM
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 size={18} className="text-primary" />
                {branch.city}
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-secondary shrink-0" />
                  <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="font-semibold text-primary hover:underline">
                    {branch.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BranchOffices;

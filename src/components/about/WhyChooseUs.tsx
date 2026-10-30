"use client";

import { Container } from "@/components/ui";
import { ShieldCheck, CheckCircle2, IndianRupee, Key, Clock, Award, Building2, MapPin } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "100% Legally Verified Titles",
    description: "Every plot and row house in our portfolio undergoes thorough 30-year title searches, registry verification, and revenue mutation verification."
  },
  {
    icon: IndianRupee,
    title: "Zero Brokerage & Transparent Rates",
    description: "Deal directly with the developer. No middlemen, no inflated commission rates, and absolute transparency in payment schedules."
  },
  {
    icon: Building2,
    title: "Prime Growth Corridors",
    description: "Handpicked locations with high appreciation potential along Outer Ring Road (Kisan Path), Deva Road, Sultanpur Road, and Goyala City."
  },
  {
    icon: Key,
    title: "Instant Registry & Mutation",
    description: "Immediate possession and full registry execution with mutation assistance at the local Sub-Registrar / Tehsil office."
  },
  {
    icon: Clock,
    title: "Pre-Approved Bank Home Loans",
    description: "Tie-ups with SBI, HDFC, PNB, ICICI, and Bank of Baroda providing up to 90% loan sanction with minimal documentation."
  },
  {
    icon: Award,
    title: "Free Cab Site Inspection",
    description: "We provide hassle-free complimentary cab pickup and drop facility for you and your family across Lucknow for property inspections."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            The Maxx Infra Advantage
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-2">
            Why Hundreds of Families Choose Us
          </h2>
          <p className="text-sm text-slate-600 mt-3">
            Setting the highest standards of safety, quality, and affordability in Lucknow and North Indian real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0">
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Compass, 
  FileCheck2, 
  Calculator, 
  DraftingCompass, 
  KeyRound, 
  ShieldCheck, 
  ArrowRight, 
  Phone 
} from "lucide-react";
import { Container, CallToAction } from "@/components/ui";

const realEstateServices = [
  {
    icon: Building2,
    title: "Residential Property Development",
    subtitle: "Turnkey Villas & Modern Row Houses",
    description: "We build high-specification modern row houses, luxury duplexes, and independent builder floors with earthquake-resistant RCC frame structures, modular kitchens, and premium sanitary fittings.",
    features: [
      "2 BHK, 3 BHK & 4 BHK custom floorplans",
      "Branded construction materials (Tata Steel, UltraTech)",
      "Strict quality control & timely handover",
      "Vastu-compliant architectural layouts"
    ]
  },
  {
    icon: DraftingCompass,
    title: "Gated Township & Land Development",
    subtitle: "Master-Planned Communities (e.g. Goyala City)",
    description: "End-to-end township development featuring wide 30-40 ft. concrete boulevards, underground drainage, solar street lighting, electricity transformers, and demarcated freehold plots.",
    features: [
      "Wide interlocking & concrete roads",
      "Lush landscaped parks & open spaces",
      "Commercial market & utility provisions",
      "24x7 security gate & boundary perimeter"
    ]
  },
  {
    icon: FileCheck2,
    title: "Legal Title Verification & Registry Desk",
    subtitle: "100% Clear & Verified Titles",
    description: "Our in-house legal team performs 30-year chain searches, 143 conversion checks, revenue records mutation verification, and guides you through Sub-Registrar deed execution.",
    features: [
      "Zero-risk certified title clearance",
      "Tehsil & revenue record mutation support",
      "Stamp duty & registration facilitation",
      "Transparent paperwork with zero hidden fees"
    ]
  },
  {
    icon: Calculator,
    title: "Home Loan & Financial Advisory",
    subtitle: "Tie-ups with SBI, HDFC, PNB & ICICI",
    description: "Get maximum home loan eligibility and fast-track approval at the lowest interest rates. We handle all bank documentation, property appraisal, and doorstep verification.",
    features: [
      "Up to 90% property funding",
      "Quick sanction within 48 to 72 hours",
      "Low processing charges & flexible tenure",
      "Free financial consultation for buyers"
    ]
  },
  {
    icon: Compass,
    title: "Strategic Property Investment Advisory",
    subtitle: "High ROI Corridors in Lucknow & NCR",
    description: "Expert guidance on high-growth corridors along Outer Ring Road (Kisan Path), Shaheed Path, Deva Road, and Sultanpur Road to maximize capital appreciation and rental yield.",
    features: [
      "In-depth market rate & trend analysis",
      "Government infrastructure impact assessment",
      "High capital gain projection models",
      "Portfolio diversification for NRI investors"
    ]
  },
  {
    icon: KeyRound,
    title: "Site Tour & Cab Inspection Service",
    subtitle: "Complimentary Pickup & Drop Across Lucknow",
    description: "Experience our project developments firsthand. We arrange comfortable, free cab pickup and drop for you and your family to inspect multiple sites at your convenience.",
    features: [
      "Air-conditioned cab pickup from your home",
      "Guided site walkthrough by senior engineer",
      "Detailed project brochures & floorplans provided",
      "Zero obligation & zero inspection charges"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative bg-primary text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/img/hero/real_estate_hero.jpg"
            alt="Maxx Infra Services"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

        <Container className="relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/30">
            <ShieldCheck size={16} /> Comprehensive Real Estate Solutions
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Development &amp; Consulting Services
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            From architectural construction and master-planned township development to title registry and home loan sanction, Maxx Infra provides full lifecycle real estate excellence.
          </p>
        </Container>
      </div>

      {/* Services Grid */}
      <Container className="-mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realEstateServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-secondary transition-colors flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block mb-1">
                    {service.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition uppercase tracking-wider"
                  >
                    Inquire About This Service <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Call to Action */}
      <Container className="mt-16">
        <CallToAction
          badge="Direct Developer Support"
          title="Looking for a Customized Villa or Gated Plot?"
          description="Speak with our chief infrastructure consultant today to discuss your budget, preferred locality, and custom construction options."
          buttons={[
            { label: "Book Free Consultation", href: "/contact", primary: true },
            { label: "View Available Properties", href: "/properties" },
          ]}
        />
      </Container>
    </div>
  );
}

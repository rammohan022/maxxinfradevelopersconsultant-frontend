import Link from "next/link";
import { Container } from "@/components/ui";
import { MapPin, TrendingUp, Building, ArrowRight } from "lucide-react";

const corridors = [
  {
    name: "Deva Road & Outer Ring Road",
    tag: "High Growth & Ready Homes",
    growth: "+22% Annually",
    description: "Home to modern row houses and gated colonies 2 minutes from Kisan Path. Near D-Mart, Crown Mall, and Chinhat.",
    propertiesCount: "18+ Available",
    link: "/properties?location=Deva+Road"
  },
  {
    name: "Outer Ring Road (Kisan Path)",
    tag: "104 KM Mega Expressway Corridor",
    growth: "+28% Annually",
    description: "The economic lifeline connecting Ayodhya Highway, Sultanpur Road, and Kanpur Road. Ideal for high-ROI residential plots.",
    propertiesCount: "25+ Plots",
    link: "/properties?location=Outer+Ring+Road"
  },
  {
    name: "Gomti Nagar Extension & Shaheed Path",
    tag: "Luxury Living Hub",
    growth: "+18% Annually",
    description: "Prestigious zone near Ekana International Stadium, Phoenix Palassio Mall, top hospitals, and corporate IT parks.",
    propertiesCount: "10+ Luxury Floors",
    link: "/properties?location=Gomti+Nagar"
  },
  {
    name: "Sultanpur Road & Royal Garden Enclave",
    tag: "Executive Duplex Villas",
    growth: "+24% Annually",
    description: "Fast-developing residential corridor with ready 4 BHK duplex villas and gated family colonies.",
    propertiesCount: "8+ Villas",
    link: "/properties?location=Sultanpur+Road"
  },
];

export default function LocationsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
              Prime Investment Zones
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lucknow’s Top Real Estate Hotspots
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-xl">
              We focus on strategic highway corridors and metro-connected zones where infrastructure is expanding rapidly.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary uppercase tracking-wider transition"
          >
            Explore All Localities &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corridors.map((corridor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={12} /> {corridor.growth}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary block mb-1">
                  {corridor.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {corridor.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {corridor.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{corridor.propertiesCount}</span>
                <Link
                  href={corridor.link}
                  className="text-xs font-bold text-primary hover:text-secondary transition flex items-center gap-1"
                >
                  View <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


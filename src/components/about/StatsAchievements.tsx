"use client";

import { Container } from "@/components/ui";
import { Building, Users, ShieldCheck, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function StatsAchievements() {
  const stats = [
    {
      value: "500+",
      label: "Happy Families",
      sublabel: "Homeowners across Lucknow & NCR",
      icon: Users,
    },
    {
      value: "50+",
      label: "Verified Properties",
      sublabel: "Villas, Row Houses & Plots",
      icon: Building,
    },
    {
      value: "100%",
      label: "Clear Land Titles",
      sublabel: "Zero dispute track record",
      icon: ShieldCheck,
    },
    {
      value: "10+",
      label: "Prime Corridors",
      sublabel: "Deva Rd, Shaheed Path, Goyala City",
      icon: MapPin,
    },
    {
      value: "90%",
      label: "Bank Funding",
      sublabel: "Tie-up with SBI, HDFC, PNB, ICICI",
      icon: Award,
    },
    {
      value: "15+",
      label: "Years of Excellence",
      sublabel: "Trusted infrastructure builders",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Proven Track Record
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2">
            Numbers That Reflect Our Commitment
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            Delivering quality housing, clear titles, and unmatched investment appreciation for over a decade.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs font-bold text-secondary mt-1">{s.label}</div>
                <div className="text-[11px] text-slate-300 mt-1">{s.sublabel}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Car,
  Home as HomeIcon,
  BadgePercent
} from "lucide-react";
import { Container } from "@/components/ui";
import { PROPERTIES, PROPERTY_CATEGORIES } from "@/data/properties";

export default function FeaturedProperties() {
  const [categoryTab, setCategoryTab] = useState<string>("All");

  const filtered = PROPERTIES.filter((p) => {
    if (categoryTab === "All") return true;
    if (categoryTab === "Resell Plots") return p.dealType === "Resale";
    if (categoryTab === "Plots") return p.category === "Plots";
    return p.category === categoryTab;
  }).slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
              Handpicked Portfolios
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Properties in Lucknow S.C.R
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-xl">
              100% legally pre-verified titles, direct developer deals, and instant registry in Lucknow’s fastest-growing corridors.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary uppercase tracking-wider transition"
          >
            Explore All Properties &rarr;
          </Link>
        </div>

        {/* Filter Bar: Category Filters + Sell CTA */}
        <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-100 mb-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {PROPERTY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  categoryTab === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                }`}
              >
                {cat === "All" ? `All Properties (${PROPERTIES.length})` : cat}
              </button>
            ))}
          </div>

          <Link
            href="/#sell-property"
            className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-xl transition flex items-center gap-1.5 ml-auto"
          >
            <BadgePercent size={14} /> + Sell Your Property
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-white shadow">
                    FOR SALE
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-primary-dark shadow">
                    {prop.category}
                  </span>
                  {prop.dealType === "Resale" && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow">
                      RESALE
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow">
                    {prop.possession}
                  </span>
                </div>

                {/* Trust overlay on bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-bold">
                      Registry Title
                    </span>
                    <span className="text-xs font-black text-white">
                      100% Pre-Verified
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg bg-secondary text-primary-dark shadow">
                    Zero Brokerage
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                {prop.subtitle && (
                  <p className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                    {prop.subtitle}
                  </p>
                )}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition line-clamp-1 mb-2">
                  <Link href={`/properties/${prop.id}`}>{prop.title}</Link>
                </h3>

                <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <MapPin size={14} className="text-secondary shrink-0" />
                  <span className="line-clamp-1">{prop.location}</span>
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-700 text-xs mb-4">
                  {prop.configuration ? (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Bed size={14} className="text-secondary shrink-0" />
                      <span className="truncate font-semibold text-slate-800">{prop.configuration}</span>
                    </div>
                  ) : prop.beds ? (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Bed size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{prop.beds} Beds</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Car size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{prop.roadWidth || "30 ft."}</span>
                    </div>
                  )}

                  {prop.baths ? (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Bath size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{prop.baths} Baths</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span className="truncate">Freehold</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 min-w-0">
                    <Maximize2 size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate" title={prop.area}>{prop.area}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 mb-5 flex-1">
                  {prop.highlights.slice(0, 2).map((hl, idx) => (
                    <p key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{hl}</span>
                    </p>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/properties/${prop.id}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold text-center hover:bg-primary-dark transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                  <a
                    href="tel:+917905145968"
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-primary hover:border-primary transition flex items-center justify-center"
                    title="Call Consultant (+91 79051 45968)"
                  >
                    <Phone size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

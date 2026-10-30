"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Home as HomeIcon
} from "lucide-react";
import { Container } from "@/components/ui";
import { PROPERTY_CATEGORIES, POPULAR_LOCALITIES } from "@/data/properties";

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [budget, setBudget] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (category !== "All") query.set("category", category);
    if (location !== "All Locations") query.set("location", location);
    if (budget !== "All") query.set("budget", budget);
    router.push(`/properties?${query.toString()}`);
  };

  return (
    <div className="relative bg-primary text-white overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Imagery with Subtle Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero/real_estate_hero.jpg"
          alt="Luxury Homes & Plots in Lucknow"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary-dark/75" />
      </div>

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider mb-5">
            <ShieldCheck size={16} /> 100% Verified Titles &amp; Zero Brokerage
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            Find Your Dream Property in <span className="text-secondary">Lucknow &amp; NCR</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
            Handpicked modern row houses, luxury duplex villas, independent builder floors, and gated society plots. Direct developer pricing, immediate mutation, and bank home loan support.
          </p>

          {/* Search Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-2xl border border-white/20 text-slate-800">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Property Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary bg-white"
                >
                  {PROPERTY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c === "All" ? "All Types" : c}</option>
                  ))}
                </select>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Locality
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary bg-white"
                >
                  {POPULAR_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary bg-white"
                >
                  <option value="All">Any Budget</option>
                  <option value="under-30l">Under ₹30 Lakhs</option>
                  <option value="30l-60l">₹30 Lakhs - ₹60 Lakhs</option>
                  <option value="60l-1cr">₹60 Lakhs - ₹1 Crore</option>
                  <option value="above-1cr">Above ₹1 Crore</option>
                </select>
              </div>

              {/* Search Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Search size={15} className="text-secondary" /> Search Properties
                </button>
              </div>
            </form>
          </div>

          {/* Quick Stats Banner below search */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-white">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-secondary shrink-0" />
              <div>
                <div className="text-lg font-black leading-none">500+</div>
                <div className="text-[11px] text-slate-300 mt-1">Families Settled</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-secondary shrink-0" />
              <div>
                <div className="text-lg font-black leading-none">100%</div>
                <div className="text-[11px] text-slate-300 mt-1">Clear Titles</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-secondary shrink-0" />
              <div>
                <div className="text-lg font-black leading-none">0%</div>
                <div className="text-[11px] text-slate-300 mt-1">Brokerage Fee</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-secondary shrink-0" />
              <div>
                <div className="text-lg font-black leading-none">Free Cab</div>
                <div className="text-[11px] text-slate-300 mt-1">Site Visits</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

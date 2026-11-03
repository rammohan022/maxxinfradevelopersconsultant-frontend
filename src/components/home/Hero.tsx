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
  Home as HomeIcon,
  BadgePercent
} from "lucide-react";
import { Container } from "@/components/ui";
import { PROPERTY_CATEGORIES, POPULAR_LOCALITIES } from "@/data/properties";

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [dealType, setDealType] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    query.set("purpose", "Buy");
    if (dealType !== "All") {
      query.set("category", dealType);
    } else if (category !== "All") {
      query.set("category", category);
    }
    if (location !== "All Locations") query.set("location", location);
    router.push(`/properties?${query.toString()}`);
  };

  const scrollToSell = () => {
    const el = document.getElementById("sell-property") || document.getElementById("sell-rent-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#sell-property");
    }
  };

  return (
    <div className="relative bg-primary text-white overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center">
      {/* Background Imagery with Subtle Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero/real_estate_hero.jpg"
          alt="Buy, Sell & Resell Properties in Lucknow S.C.R"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary-dark/75" />
      </div>

      <Container className="relative z-10 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider mb-4 mx-auto">
            <ShieldCheck size={16} /> 100% Verified Titles • Buy, Sell &amp; Resell • Lucknow S.C.R
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3 mx-auto">
            Buy, Sell &amp; Resell Property in <span className="text-secondary">Lucknow S.C.R</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto mb-8">
            Your trusted destination to buy, sell, and resell verified 2 &amp; 3 BHK apartments, freehold plots, modern row houses, and luxury villas across Lucknow S.C.R with zero brokerage.
          </p>

          {/* Purpose Toggle Tabs + Search Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-2xl border border-white/20 text-slate-800 text-left">
            {/* Top Purpose Switcher */}
            <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-slate-200">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all bg-primary text-white shadow-md flex items-center gap-2"
              >
                <HomeIcon size={14} className="text-secondary" />
                Buy Property
              </button>

              <button
                type="button"
                onClick={scrollToSell}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 ml-auto flex items-center gap-1.5"
              >
                <BadgePercent size={14} /> Sell Your Property &rarr;
              </button>
            </div>

            {/* Filter Controls */}
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

              {/* Deal Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Deal Type
                </label>
                <select
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary bg-white"
                >
                  <option value="All">All Deals &amp; Plots</option>
                  <option value="Resell Plots">Verified Resale Plots</option>
                  <option value="Plots">Highway Gated Plots</option>
                  <option value="Flats">2 &amp; 3 BHK Luxury Flats</option>
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
                <div className="text-lg font-black leading-none">Buy &amp; Sell</div>
                <div className="text-[11px] text-slate-300 mt-1">Verified Properties</div>
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
                <div className="text-lg font-black leading-none">Fast Sale</div>
                <div className="text-[11px] text-slate-300 mt-1">Verified Buyers</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

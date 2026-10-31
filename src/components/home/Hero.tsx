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
  Key,
  BadgePercent
} from "lucide-react";
import { Container } from "@/components/ui";
import { PROPERTY_CATEGORIES, POPULAR_LOCALITIES } from "@/data/properties";

export default function Hero() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [budget, setBudget] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    query.set("purpose", purpose);
    if (category !== "All") query.set("category", category);
    if (location !== "All Locations") query.set("location", location);
    if (budget !== "All") query.set("budget", budget);
    router.push(`/properties?${query.toString()}`);
  };

  const scrollToSell = () => {
    const el = document.getElementById("sell-rent-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact?action=sell");
    }
  };

  return (
    <div className="relative bg-primary text-white overflow-hidden min-h-[600px] lg:min-h-[680px] flex items-center">
      {/* Background Imagery with Subtle Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero/real_estate_hero.jpg"
          alt="Buy, Sell & Rent Properties in Lucknow & NCR"
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
            <ShieldCheck size={16} /> Buy • Sell • Rent • Zero Brokerage
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            Buy, Sell &amp; Rent Property in <span className="text-secondary">Lucknow &amp; NCR</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
            Your single destination to purchase verified villas and row houses, rent premium furnished homes, or sell your property directly to genuine buyers with zero hassle.
          </p>

          {/* Purpose Toggle Tabs + Search Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-2xl border border-white/20 text-slate-800">
            {/* Top Purpose Switcher */}
            <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-slate-200">
              <button
                type="button"
                onClick={() => { setPurpose("Buy"); setBudget("All"); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  purpose === "Buy"
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <HomeIcon size={14} className={purpose === "Buy" ? "text-secondary" : "text-slate-500"} />
                Buy / Purchase
              </button>

              <button
                type="button"
                onClick={() => { setPurpose("Rent"); setBudget("All"); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  purpose === "Rent"
                    ? "bg-secondary text-primary-dark shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Key size={14} />
                Rent
              </button>

              <button
                type="button"
                onClick={scrollToSell}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 ml-auto flex items-center gap-1.5"
              >
                <BadgePercent size={14} /> Sell With Us
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

              {/* Budget (changes dynamically depending on Buy vs Rent) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {purpose === "Buy" ? "Purchase Budget" : "Monthly Rent"}
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary bg-white"
                >
                  {purpose === "Buy" ? (
                    <>
                      <option value="All">Any Budget</option>
                      <option value="under-30l">Under ₹30 Lakhs</option>
                      <option value="30l-60l">₹30 Lakhs - ₹60 Lakhs</option>
                      <option value="60l-1cr">₹60 Lakhs - ₹1 Crore</option>
                      <option value="above-1cr">Above ₹1 Crore</option>
                    </>
                  ) : (
                    <>
                      <option value="All">Any Rent Range</option>
                      <option value="under-15k">Under ₹15,000 / mo</option>
                      <option value="15k-25k">₹15,000 - ₹25,000 / mo</option>
                      <option value="25k-40k">₹25,000 - ₹40,000 / mo</option>
                      <option value="above-40k">Above ₹40,000 / mo</option>
                    </>
                  )}
                </select>
              </div>

              {/* Search Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Search size={15} className="text-secondary" /> Search {purpose === "Buy" ? "Homes to Buy" : "Rental Properties"}
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
                <div className="text-lg font-black leading-none">Buy &amp; Rent</div>
                <div className="text-[11px] text-slate-300 mt-1">Verified Options</div>
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

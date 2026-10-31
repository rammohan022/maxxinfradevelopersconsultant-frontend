"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  Car,
  Key,
  Home as HomeIcon,
  Sparkles
} from "lucide-react";
import { Container } from "@/components/ui";
import { PROPERTIES, PROPERTY_CATEGORIES, POPULAR_LOCALITIES, PROPERTY_PURPOSES } from "@/data/properties";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialPurpose = searchParams?.get("purpose") || "All";
  const initialCategory = searchParams?.get("category") || "All";
  const initialLocation = searchParams?.get("location") || "All Locations";

  const [selectedPurpose, setSelectedPurpose] = useState(initialPurpose);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocality, setSelectedLocality] = useState(initialLocation);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  useEffect(() => {
    if (searchParams?.get("purpose")) setSelectedPurpose(searchParams.get("purpose")!);
    if (searchParams?.get("category")) setSelectedCategory(searchParams.get("category")!);
    if (searchParams?.get("location")) setSelectedLocality(searchParams.get("location")!);
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      const matchPurpose =
        selectedPurpose === "All" || prop.purpose === selectedPurpose;
      const matchCategory =
        selectedCategory === "All" || prop.category === selectedCategory;
      const matchLocality =
        selectedLocality === "All Locations" ||
        prop.locality.toLowerCase().includes(selectedLocality.toLowerCase()) ||
        prop.location.toLowerCase().includes(selectedLocality.toLowerCase());
      const matchQuery =
        !searchQuery.trim() ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prop.subtitle && prop.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchPurpose && matchCategory && matchLocality && matchQuery;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceNumeric - b.priceNumeric;
      if (sortBy === "price-desc") return b.priceNumeric - a.priceNumeric;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedPurpose, selectedCategory, selectedLocality, searchQuery, sortBy]);

  const buyCount = useMemo(() => PROPERTIES.filter(p => p.purpose === "Buy").length, []);
  const rentCount = useMemo(() => PROPERTIES.filter(p => p.purpose === "Rent").length, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/img/hero/real_estate_hero.jpg"
            alt="Maxx Infra Properties"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        
        <Container className="relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-semibold tracking-wide uppercase mb-4 border border-secondary/30">
            <ShieldCheck size={16} /> Buy • Sell • Rent • Zero Brokerage
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Properties for Sale &amp; Rent in Lucknow &amp; NCR
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Discover verified luxury duplexes, modern row houses, independent builder floors, and residential plots available for immediate purchase or lease.
          </p>
        </Container>
      </div>

      {/* Filter and Search Bar */}
      <Container className="-mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6 border border-slate-100">
          {/* Main Purpose Switcher */}
          <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-slate-100">
            <button
              onClick={() => setSelectedPurpose("All")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedPurpose === "All"
                  ? "bg-primary text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Listings ({PROPERTIES.length})
            </button>
            <button
              onClick={() => setSelectedPurpose("Buy")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                selectedPurpose === "Buy"
                  ? "bg-primary text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <HomeIcon size={14} className={selectedPurpose === "Buy" ? "text-secondary" : ""} />
              For Sale / Buy ({buyCount})
            </button>
            <button
              onClick={() => setSelectedPurpose("Rent")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                selectedPurpose === "Rent"
                  ? "bg-secondary text-primary-dark shadow-md font-extrabold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Key size={14} />
              For Rent ({rentCount})
            </button>

            <Link
              href="/#sell-rent-section"
              className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
            >
              + Want to Sell or Rent Out?
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Search Property
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Keywords (e.g. Villa, Goyala, Deva Road)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Property Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-white"
              >
                {PROPERTY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Locality Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-white"
              >
                {POPULAR_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-white"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-100">
            {PROPERTY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Property Results */}
      <Container className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> verified properties {selectedPurpose !== "All" && `for ${selectedPurpose}`}
          </p>
          {(selectedPurpose !== "All" || selectedCategory !== "All" || selectedLocality !== "All Locations" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedPurpose("All");
                setSelectedCategory("All");
                setSelectedLocality("All Locations");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <Building2 className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No matching properties found</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your category, purpose, or locality filters, or reach out to our team for custom property options.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition"
            >
              Contact Our Consultants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
              >
                {/* Image & Tags */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow ${
                      prop.purpose === "Rent"
                        ? "bg-secondary text-primary-dark font-black"
                        : "bg-primary text-white"
                    }`}>
                      {prop.purpose === "Rent" ? "FOR RENT" : "FOR SALE"}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {prop.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow">
                      {prop.possession}
                    </span>
                  </div>

                  {/* Price overlay on bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-300 block font-medium">
                        {prop.purpose === "Rent" ? "Monthly Rent" : "Price"}
                      </span>
                      <span className="text-2xl font-black tracking-tight text-white">{prop.price}</span>
                    </div>
                    {prop.furnishing && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-secondary">
                        {prop.furnishing}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {prop.subtitle && (
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                      {prop.subtitle}
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition line-clamp-1 mb-2">
                    <Link href={`/properties/${prop.id}`}>{prop.title}</Link>
                  </h3>

                  <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <MapPin size={14} className="text-secondary shrink-0" />
                    <span className="line-clamp-1">{prop.location}</span>
                  </p>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-700 text-xs mb-4">
                    {prop.beds ? (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Bed size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate">{prop.beds} Beds</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Car size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate">{prop.roadWidth || "30 ft."}</span>
                      </div>
                    )}

                    {prop.baths ? (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Bath size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate">{prop.baths} Baths</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                        <span className="truncate">{prop.purpose === "Rent" ? "Verified" : "Freehold"}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 min-w-0">
                      <Maximize2 size={15} className="text-slate-400 shrink-0" />
                      <span className="truncate" title={prop.area}>{prop.area}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-5 flex-1">
                    {prop.highlights.slice(0, 2).map((hl, idx) => (
                      <p key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </p>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/properties/${prop.id}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold text-center hover:bg-primary-dark transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {prop.purpose === "Rent" ? "Rental Details" : "View Details"} <ArrowRight size={14} />
                    </Link>
                    <a
                      href="tel:+918303145434"
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-primary hover:border-primary transition flex items-center justify-center"
                      title="Call Consultant"
                    >
                      <Phone size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center"><p className="text-sm font-bold text-slate-500">Loading properties...</p></div>}>
      <PropertiesContent />
    </Suspense>
  );
}

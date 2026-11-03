"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  MapPin,
  ShieldCheck
} from "lucide-react";

export default function AravaliSpotlight() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-primary-dark text-white overflow-hidden relative border-t border-white/5">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Media Column: Video Player */}
          <div className="lg:col-span-6 order-1">
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20 aspect-video group">
              <video
                src="/video/aravali.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/video/aravali.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Caption */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <ShieldCheck size={14} className="text-secondary" /> Actual On-Site Video Walkthrough
              </span>
              <span>Ayodhya Highway • Badel, Barabanki</span>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6 order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Mega Highway Plotting Project
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-snug">
              Aravali Green City — <span className="text-secondary">Ayodhya Highway Plots</span>
            </h2>

            {/* Location Tag Pill */}
            <div className="space-y-1.5 bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <MapPin size={16} className="text-rose-500 shrink-0" />
                <span>Ayodhya Highway Near Police Aawas Colony, Badel (Barabanki)</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6">
                Official Desk: G-1 Shivani Arcade Dewa Road, Opp. Axis Bank- Lucknow
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Explore prime verified freehold residential plots located directly on the Lucknow - Ayodhya 4-lane national highway. <strong>Aravali Green City</strong> features wide 40-foot and 30-foot internal boulevards, high-capacity electric transformers, underground drainage, and immediate registry with guaranteed dakhil-kharij (mutation).
            </p>

            {/* Key Project Amenities Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Ayodhya Highway Frontage</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Immediate Registry &amp; Dakhil Kharij</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>40 ft. &amp; 30 ft. Concrete Roads</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Dedicated Transformer Installed</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>100% Freehold Clear Title</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Free Cab Visit from Office</span>
              </div>
            </div>

            {/* Township Highlights Callout (No Price) */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">Gated Society Residential Plots</span>
                <span className="text-base sm:text-lg font-bold text-white">1,000 to 2,500 Sq.Ft. Dimensions</span>
              </div>

              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                Immediate Possession
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/properties/aravali-green-city-barabanki-badel"
                className="px-6 py-3.5 rounded-xl bg-secondary text-primary-dark font-extrabold text-xs uppercase tracking-wider hover:bg-secondary-light transition shadow-lg flex items-center gap-2"
              >
                View Project Details <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition border border-white/20"
              >
                Book Free Cab Site Visit
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight
} from "lucide-react";

export default function GoyalaCitySpotlight() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-slate-900 via-primary-dark to-slate-900 text-white overflow-hidden relative">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Signature Master Township Project
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-snug">
              Goyala City — <span className="text-secondary">Integrated Gated Living</span>
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Experience the pinnacle of planned township development. <strong>Goyala City</strong> offers clear-title residential plots, modern duplex villas, wide 40-foot main boulevards, solar street lighting, underground sewage, and 24x7 secured access.
            </p>

            {/* Key Project Amenities Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>40 ft. &amp; 30 ft. Wide Roads</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Immediate Registry &amp; Dakhil Kharij</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Gated Security &amp; CCTV</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Bank Loan Up to 90%</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Solar Street Lights Installed</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Lush Green Central Park</span>
              </div>
            </div>

            {/* Township Highlights Callout (Price Removed) */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">Master Planned Township</span>
                <span className="text-base sm:text-lg font-bold text-white">Residential Plots &amp; Luxury Villas</span>
              </div>

              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                Immediate Possession &amp; Registry
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/properties/goyala-city-township"
                className="px-6 py-3.5 rounded-xl bg-secondary text-primary-dark font-extrabold text-xs uppercase tracking-wider hover:bg-secondary-light transition shadow-lg flex items-center gap-2"
              >
                View Project Details <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition border border-white/20"
              >
                Book Site Visit Cab
              </Link>
            </div>
          </div>

          {/* Right Media Column: Video & Gallery preview */}
          <div className="lg:col-span-6 space-y-4">
            {/* Embedded Drone / Project Video */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20 aspect-video group">
              <video
                src="/img/goyala-city.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                poster="/img/projects/goyala-site-1.jpeg"
                className="w-full h-full object-cover"
              >
                <source src="/img/goyala-city.mp4" type="video/mp4" />
                <source src="/img/Goyala%20City-.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


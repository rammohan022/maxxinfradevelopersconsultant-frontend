"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Building,
  KeyRound,
  ShieldCheck,
  Car
} from "lucide-react";

export default function ApartmentsSpotlight() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-slate-900 via-primary-dark to-slate-900 text-white overflow-hidden relative border-t border-white/5">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Luxury Flats &amp; Modern Apartments
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-snug">
              Eiffel Palm Vista &amp; Sai Yash — <span className="text-secondary">2 &amp; 3 BHK Flats</span>
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Step into elegant, hassle-free modern living. <strong>Eiffel Palm Vista</strong> on Deva Road and <strong>Sai Yash Residency</strong> on Ayodhya Road bring you premium 2 BHK and 3 BHK ready-to-move flats with high-speed elevators, covered stilt parking, spacious ventilation balconies, modular interiors, 24×7 security, and 100% bank loan approval.
            </p>

            {/* Key Project Amenities Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>2 BHK &amp; 3 BHK Configurations</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Immediate Registry &amp; Possession</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>High-Speed Elevator &amp; Lobby</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Bank Loan Up to 90%</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>Covered Stilt &amp; Open Parking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span>24×7 Security &amp; CCTV Vigilance</span>
              </div>
            </div>

            {/* Township / Apartment Highlights Callout (Zero Price) */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">Ready Residential Apartments</span>
                <span className="text-base sm:text-lg font-bold text-white">Eiffel Palm Vista &amp; Sai Yash Residency</span>
              </div>

              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                Immediate Possession &amp; Registry
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/properties?category=Flats"
                className="px-6 py-3.5 rounded-xl bg-secondary text-primary-dark font-extrabold text-xs uppercase tracking-wider hover:bg-secondary-light transition shadow-lg flex items-center gap-2"
              >
                View Flats &amp; Apartments <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition border border-white/20"
              >
                Book Free Site Visit Cab
              </Link>
            </div>
          </div>

          {/* Right Media Column: Video & Gallery preview */}
          <div className="lg:col-span-6 space-y-3">
            {/* Embedded Apartment Walkthrough Video */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20 aspect-video group">
              <video
                src="/img/apartment.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                poster="/img/projects/eiffel-palm-vista-facade.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/img/apartment.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Real On-site Photos Preview (Eiffel Palm Vista & Sai Yash Residency) */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { 
                  src: "/img/projects/eiffel-palm-vista-facade.jpg", 
                  alt: "Eiffel Palm Vista Modern Facade",
                  href: "/properties/eiffel-palm-vista-deva-road"
                },
                { 
                  src: "/img/projects/sai-yash-residency-yellow-facade.jpg", 
                  alt: "Sai Yash Residency Yellow Building Elevation",
                  href: "/properties/sai-yash-residency-ayodhya-road"
                },
                { 
                  src: "/img/projects/eiffel-palm-vista-interior-1.jpg", 
                  alt: "Living Room Walkthrough & Interior",
                  href: "/properties/eiffel-palm-vista-deva-road"
                },
                { 
                  src: "/img/projects/eiffel-palm-vista-interior-2.jpg", 
                  alt: "Master Bedroom & Balcony View",
                  href: "/properties/eiffel-palm-vista-deva-road"
                },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="relative aspect-video rounded-lg overflow-hidden border border-white/20 hover:border-secondary transition group block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition" />
                </Link>
              ))}
            </div>

            {/* Special Available Callout */}
            <Link
              href="/properties?category=Flats"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-white/10 transition text-xs"
            >
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span><strong>Available Now:</strong> 2 BHK &amp; 3 BHK Flats — Deva Road &amp; Ayodhya Road</span>
              </div>
              <span className="text-secondary font-bold flex items-center gap-1">
                View Flats &rarr;
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


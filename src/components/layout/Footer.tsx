'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { Mail, Phone, MapPin, Building2, ShieldCheck, Clock, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { useGetAdminProfileQuery } from '@/services/auth';
import { useGetSiteSettingsQuery } from '@/services/siteSettings';

export default function Footer() {
  const { data: adminProfile } = useGetAdminProfileQuery();
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const email = siteSettings?.contactEmail || adminProfile?.email || "contact@maxxinfradevelopersconsultant.com";
  const phone = siteSettings?.contactPhone || adminProfile?.phoneNumber || "+91 83031 45434";

  return (
    <footer className="bg-primary-dark text-slate-300">
      {/* 1. Pre-Footer Banner */}
      <section className="bg-primary py-12 border-b border-white/10">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-secondary text-xs font-bold uppercase tracking-wider block mb-1">
                Free Site Visit Facility
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Book a Free Cab Site Inspection in Lucknow
              </h2>
              <p className="text-slate-300 text-xs md:text-sm mt-2">
                Inspect multiple row houses, duplex villas, and township plots with our expert engineers. Free doorstep cab pickup &amp; drop available.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-secondary text-primary-dark font-extrabold text-xs uppercase tracking-wider hover:bg-secondary-light transition shadow-lg flex items-center gap-2"
              >
                Schedule Site Visit <ArrowRight size={15} />
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition font-bold text-xs uppercase tracking-wider border border-white/20 flex items-center gap-2"
              >
                <Phone size={15} className="text-secondary" /> {phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Footer Links */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-secondary text-primary-dark flex items-center justify-center font-black">
                  <Building2 size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-black text-white tracking-tight">MAXX</span>
                    <span className="text-lg font-black text-secondary tracking-tight">INFRA</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block -mt-1">
                    Developers &amp; Consultant
                  </span>
                </div>
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Maxx Infra Developers &amp; Consultant is your trusted partner for clear-title residential row houses, luxury duplex villas, master-planned townships, and gated society plots across Lucknow and NCR. Zero brokerage, 100% verified registry titles.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/20 transition">
                  <Facebook size={16} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/20 transition">
                  <Instagram size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/20 transition">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* Col 2: Property Categories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Buy, Rent &amp; Sell
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link href="/properties?purpose=Buy" className="text-slate-200 hover:text-secondary font-semibold transition">
                    Properties For Sale (Buy)
                  </Link>
                </li>
                <li>
                  <Link href="/properties?purpose=Rent" className="text-slate-200 hover:text-secondary font-semibold transition">
                    Properties For Rent
                  </Link>
                </li>
                <li>
                  <Link href="/#sell-rent-section" className="text-slate-200 hover:text-secondary font-semibold transition">
                    Sell / Lease Your Property
                  </Link>
                </li>
                <li>
                  <Link href="/properties/goyala-city-township" className="hover:text-secondary transition">
                    Goyala City Township
                  </Link>
                </li>
                <li>
                  <Link href="/properties?category=Row+House" className="hover:text-secondary transition">
                    2 &amp; 3 BHK Row Houses
                  </Link>
                </li>
                <li>
                  <Link href="/properties?category=Villas" className="hover:text-secondary transition">
                    Luxury Duplex Villas
                  </Link>
                </li>
                <li>
                  <Link href="/loan" className="hover:text-secondary transition">
                    Home Loan Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Prime Locations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Prime Locations
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link href="/properties?location=Deva+Road" className="hover:text-secondary transition">
                    Deva Road Corridor
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=Outer+Ring+Road" className="hover:text-secondary transition">
                    Outer Ring Road (Kisan Path)
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=Gomti+Nagar" className="hover:text-secondary transition">
                    Gomti Nagar Extension
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=Sultanpur+Road" className="hover:text-secondary transition">
                    Sultanpur Road
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=Shaheed+Path" className="hover:text-secondary transition">
                    Shaheed Path
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=Faizabad+Road" className="hover:text-secondary transition">
                    Faizabad Road / Chinhat
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Office &amp; Contact
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <p className="flex items-start gap-2">
                  <MapPin size={15} className="text-secondary shrink-0 mt-0.5" />
                  <span>Deva Road, Outer Ring Road (Kisan Path), Lucknow, Uttar Pradesh</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-secondary shrink-0" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-white hover:text-secondary font-semibold">
                    {phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={15} className="text-secondary shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-secondary truncate">
                    {email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={15} className="text-secondary shrink-0" />
                  <span>Open: Mon - Sun (9 AM - 7:30 PM)</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Bottom Legal Bar */}
      <div className="py-6 border-t border-white/10 text-xs text-slate-400">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Maxx Infra Developers &amp; Consultant. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-secondary transition">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-secondary transition">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-secondary transition">
              Site Map
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

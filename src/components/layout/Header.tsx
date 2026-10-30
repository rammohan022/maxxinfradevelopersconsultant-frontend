"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Home, 
  Layers, 
  Landmark, 
  Calculator,
  MessageCircle
} from "lucide-react";
import { useGetSiteSettingsQuery } from "@/services/siteSettings";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [propertiesDropdown, setPropertiesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: siteSettings } = useGetSiteSettingsQuery();
  const phone = siteSettings?.contactPhone || "+91 83031 45434";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { 
      label: "Properties", 
      href: "/properties",
      dropdown: true,
      subItems: [
        { label: "All Properties", href: "/properties", desc: "View all verified listings" },
        { label: "Goyala City Township", href: "/properties/goyala-city-township", desc: "Master-planned residential plots & villas" },
        { label: "Modern Row Houses", href: "/properties?category=Row+House", desc: "Ready to move 2 & 3 BHK homes" },
        { label: "Luxury Duplex Villas", href: "/properties?category=Villas", desc: "Premium 4 BHK villas in gated enclaves" },
        { label: "Independent Builder Floors", href: "/properties?category=Builder+Floor", desc: "Stilt + 4 elevations with elevator" },
        { label: "Gated Society Plots", href: "/properties?category=Plots", desc: "Freehold plots near Ring Road" },
      ]
    },
    { label: "Services", href: "/services" },
    { label: "Home Loan", href: "/loan" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-white py-4 border-b border-slate-100"
    }`}>
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary text-secondary flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
            <Building2 size={24} className="text-secondary" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg md:text-xl font-black text-primary tracking-tight">MAXX</span>
              <span className="text-lg md:text-xl font-black text-secondary tracking-tight">INFRA</span>
            </div>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest block -mt-1">
              Developers &amp; Consultant
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setPropertiesDropdown(true)}
              onMouseLeave={() => item.dropdown && setPropertiesDropdown(false)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-primary transition py-2"
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} className="text-slate-400" />}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && propertiesDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.subItems?.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setPropertiesDropdown(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition group/sub"
                    >
                      <div className="text-xs font-bold text-slate-800 group-hover/sub:text-primary">
                        {sub.label}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {sub.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-primary transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary">
              <Phone size={14} />
            </div>
            <span>{phone}</span>
          </a>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-md flex items-center gap-1.5"
          >
            <Calendar size={14} className="text-secondary" /> Book Site Visit
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="p-2 rounded-lg bg-slate-100 text-primary"
            aria-label="Call"
          >
            <Phone size={18} />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 shadow-xl space-y-4 animate-in slide-in-from-top duration-300">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-slate-100 ml-3">
                    {item.subItems?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-xs text-slate-600 hover:text-primary"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider text-center block shadow"
            >
              Book Free Site Visit
            </Link>

            <a
              href="https://wa.me/918303145434?text=Hello%20Maxx%20Infra,%20I%20am%20looking%20for%20property%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

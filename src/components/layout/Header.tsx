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
  const phone = siteSettings?.contactPhone || "+91 79051 45968";
  const phone2 = "+91 63861 00070";

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
    { 
      label: "Buy Property", 
      href: "/properties",
      dropdown: true,
      subItems: [
        { label: "All Properties for Sale", href: "/properties", desc: "Explore all verified listings for sale" },
        { label: "2 & 3 BHK Flats & Apartments", href: "/properties?category=Flats", desc: "Sai Yash Residency & Eiffel Palm Vista" },
        { label: "Gated Residential Plots", href: "/properties?category=Plots", desc: "Aravali Green City & Highway plotting" },
        { label: "Goyala City Township", href: "/properties/goyala-city-township", desc: "Integrated gated township plots & villas" },
        { label: "Modern Row Houses", href: "/properties?category=Row+House", desc: "Ready to move 2 & 3 BHK gated homes" },
        { label: "Luxury Duplex Villas", href: "/properties?category=Villas", desc: "Premium 3 & 4 BHK villas in prime enclaves" },
        { label: "Independent Builder Floors", href: "/properties?category=Builder+Floor", desc: "Stilt + 4 elevations with reserved parking" },
      ]
    },
    { label: "Sell Property", href: "/#sell-property" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-white py-4 border-b border-slate-100"
    }`}>
      <Container className="flex items-center justify-between gap-4 max-w-[1440px]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <Image
            src="/img/logo-horizontal.png"
            alt="Maxx Infra Developers & Consultant"
            width={240}
            height={56}
            className="h-11 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-102 transition-transform"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map((item) => (
            <div
              key={item.label}
              className="relative shrink-0"
              onMouseEnter={() => item.dropdown && setPropertiesDropdown(true)}
              onMouseLeave={() => item.dropdown && setPropertiesDropdown(false)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-[11px] xl:text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-primary transition py-2 whitespace-nowrap shrink-0"
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} className="text-slate-400 shrink-0" />}
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
                      <div className="text-xs font-bold text-slate-800 group-hover/sub:text-primary whitespace-nowrap">
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
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-primary transition shrink-0 whitespace-nowrap"
              title={`Call ${phone}`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary shrink-0 hover:bg-slate-200 transition">
                <Phone size={14} />
              </div>
              <span className="hidden xl:inline whitespace-nowrap">{phone}</span>
            </a>
            <span className="text-slate-300 hidden xl:inline">/</span>
            <a
              href={`tel:${phone2.replace(/\s+/g, '')}`}
              className="hidden 2xl:inline text-xs font-bold text-slate-600 hover:text-primary transition whitespace-nowrap"
              title={`Call ${phone2}`}
            >
              {phone2}
            </a>
          </div>

          <Link
            href="/contact"
            className="px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-xl bg-primary text-white text-[11px] xl:text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-md flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Calendar size={14} className="text-secondary shrink-0" />
            <span className="whitespace-nowrap">Book Site Visit</span>
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
              href="https://wa.me/917905145968?text=Hello%20Maxx%20Infra,%20I%20am%20looking%20for%20property%20details."
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

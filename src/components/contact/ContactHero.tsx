import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const ContactHero: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative h-[380px] flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/hero/real_estate_hero.jpg"
          alt="Contact Maxx Infra Developers & Consultant"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 text-slate-300">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-secondary">Contact Us</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-3 border border-secondary/30">
          <ShieldCheck size={14} /> Free Site Visit &amp; Consultancy
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          Get in Touch with Our Real Estate Experts
        </h1>

        <p className="text-xs md:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Planning to buy a verified home, villa, row house, or residential plot in Lucknow or NCR? Schedule a free site tour or request a direct callback from our project consultants.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;

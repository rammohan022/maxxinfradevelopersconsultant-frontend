import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const HeroAbout = () => {
  return (
    <section className="relative h-[480px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero/about_us_hero.png"
          alt="Maxx Infra Developers & Consultant"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-slate-300 text-xs md:text-sm mb-4 flex items-center justify-center space-x-2">
          <Link href="/" className="hover:text-secondary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-secondary font-medium">About Us</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/30">
          <ShieldCheck size={14} /> Building Homes, Developing Legacies
        </div>

        {/* Heading */}
        <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
          About Maxx Infra Developers &amp; Consultant
        </h1>

        {/* Subtitle */}
        <p className="text-xs md:text-base text-slate-200 mt-2 max-w-2xl mx-auto leading-relaxed">
          Lucknow &amp; NCR&apos;s trusted infrastructure developer and real estate consultancy. Delivering clear-title residential row houses, luxury duplex villas, master-planned townships, and gated society plots with zero brokerage and total transparency.
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;

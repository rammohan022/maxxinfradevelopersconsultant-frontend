import Image from "next/image";
import { Container } from "@/components/ui";

const CareerHero = () => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-primary min-h-[380px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/hero/real_estate_hero.jpg"
          alt="Careers at Maxx Infra"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-primary/85" />

      {/* Content */}
      <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
        <div className="max-w-3xl w-full text-left">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-xs text-slate-300 font-medium">
            <a href="/" className="transition-colors hover:text-white">
              Home
            </a>
            <span>/</span>
            <span className="font-bold text-secondary">Careers</span>
          </nav>

          {/* Heading */}
          <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
            Build Your Career with Maxx Infra Developers
          </h1>

          {/* Description */}
          <p className="text-xs md:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed mb-8">
            Join Lucknow &amp; NCR’s rapidly expanding real estate and infrastructure development team. We offer rewarding opportunities in civil engineering, architecture, property sales, and project marketing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#open-positions"
              className="bg-secondary hover:bg-secondary-dark text-primary-dark font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-md"
            >
              View Open Roles
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareerHero;

import { Container } from "@/components/ui"
import Image from "next/image";

const TeamHeroSection = () => {
  return (
    <section className="relative flex h-[400px] items-center justify-center bg-navy">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/img/team-hero-bg.png"
          alt="Professional legal team in modern law office"
          fill
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center justify-center space-x-2 text-sm text-gray-300">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <span>/</span>
          <span className="text-white">Our People</span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-4">
          Our People
        </h1>

        {/* Divider */}
        <div className="mx-auto mb-4 h-1 w-24 bg-maroon" />

        {/* Sub text */}
        <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl mx-auto leading-relaxed">
          Excellence in Legal Practice Through Distinguished Professionals
        </p>
      </Container>
    </section>
  );
};

export default TeamHeroSection;

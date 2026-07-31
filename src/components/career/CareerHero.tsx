import Image from "next/image";
import { Container } from "@/components/ui";

const CareerHero = () => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-[rgb(13_33_55)] min-h-[380px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/career-hero.png"
          alt="Careers at People Consulting"
          fill
          priority
          className="object-cover opacity-45"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(13_33_55)]/95 via-[rgb(13_33_55)]/85 to-[rgb(13_33_55)]/65" />

      {/* Content */}
      <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
        <div className="max-w-3xl w-full text-left">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-300 font-medium">
            <a
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </a>
            <svg
              className="h-3 w-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 320 512"
              aria-hidden="true"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
            <span className="font-bold text-secondary">
              Careers
            </span>
          </nav>

          {/* Heading */}
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-4 drop-shadow-md">
            Build Your Career With Us
          </h1>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl leading-relaxed mb-8 drop-shadow-sm">
            Grow, learn, and create real impact in a consulting agency that values
            integrity, excellence, and your professional development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#open-positions"
              className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Open Positions
            </a>

            <a
              href="#why-join-us"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-primary px-6 py-3 rounded-lg font-bold transition-all duration-300"
            >
              Why Work With Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareerHero;

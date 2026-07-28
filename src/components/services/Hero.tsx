import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";

interface PracticeAreaHeroProps {
  title: string;
  subtitle?: string;
}

const PracticeAreaHero = ({ title, subtitle }: PracticeAreaHeroProps) => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[rgb(13_33_55)] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/practice-hero-bg-v2.png"
          alt="Our Services Background"
          fill
          priority
          className="object-cover opacity-50"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(13_33_55)]/95 via-[rgb(13_33_55)]/85 to-[rgb(13_33_55)]/65" />

      {/* Content */}
      <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
        <div className="max-w-3xl w-full text-left">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-300 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="font-bold text-secondary">
              Our Services
            </span>
          </nav>

          {/* Title */}
          <h1 className="mb-4 text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-md">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="max-w-2xl text-gray-200 text-base sm:text-lg leading-relaxed drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PracticeAreaHero;

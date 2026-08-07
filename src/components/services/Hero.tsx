import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";

interface PracticeAreaHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const PracticeAreaHero = ({ title, subtitle, image = "/img/services_hero_bg_clean.png" }: PracticeAreaHeroProps) => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gray-900 min-h-[400px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Solid Dark Gray Overlay with Opacity */}
      <div className="absolute inset-0 bg-gray-900/70" />

      {/* Content */}
      <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
        <div className="max-w-3xl w-full text-left">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-200 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="font-bold text-secondary">
              {title}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-4 drop-shadow-lg">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs md:text-sm text-gray-100 mt-1 max-w-3xl leading-relaxed font-normal drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PracticeAreaHero;

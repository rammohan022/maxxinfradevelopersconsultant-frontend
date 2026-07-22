import { getImageUrl } from "@/lib/utils/imageUtils";
import { Container } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  slug: string;
  innerImage?: string;
}

const HeroSection = ({ title, slug, innerImage }: HeroSectionProps) => {
  return (
    <section className="relative flex h-[400px] items-center justify-center bg-navy">

      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={getImageUrl(innerImage) || "/img/contact-hero-bg-v2.png"}
          alt={title}
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center">

        {/* Breadcrumb */}
        <div className="mb-3 flex items-center justify-center space-x-2 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <Link href="/services" className="hover:text-white">
            Our Services
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-white capitalize">
            {slug.replace(/[-\u2013\u2014]/g, " ")}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-tight">
          {title}
        </h1>

        <div className="mx-auto h-1 w-24 bg-primary" />
      </Container>
    </section>
  );
};

export default HeroSection;

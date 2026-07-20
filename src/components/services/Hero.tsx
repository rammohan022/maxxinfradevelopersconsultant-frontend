import Image from "next/image";
import Link from "next/link";

interface PracticeAreaHeroProps {
  title: string;
  subtitle?: string;
}

const PracticeAreaHero = ({ title, subtitle }: PracticeAreaHeroProps) => {
  return (
    <section
      className="relative h-[480px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "rgb(15 23 42 / var(--tw-bg-opacity, 1))",
      }}
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/contact-hero-bg-v2.png"
          alt="Modern workspace, human resource consulting background"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-5xl text-center px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-gray-300 text-sm mb-4 flex items-center justify-center space-x-2">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <Link
            href="/services"
            className="hover:text-white transition"
          >
            Our Services
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PracticeAreaHero;

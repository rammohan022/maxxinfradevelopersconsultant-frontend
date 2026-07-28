import Image from "next/image";
import Link from "next/link";

interface PracticeAreaHeroProps {
  title: string;
  subtitle?: string;
}

const PracticeAreaHero = ({ title, subtitle }: PracticeAreaHeroProps) => {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200 flex items-center justify-center overflow-hidden">
      {/* Background decoration blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] -z-0" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-5xl text-center px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-slate-500 text-sm font-semibold mb-4 flex items-center justify-center space-x-2">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span className="text-slate-400">&gt;</span>
          <Link
            href="/services"
            className="hover:text-primary transition"
          >
            Our Services
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PracticeAreaHero;

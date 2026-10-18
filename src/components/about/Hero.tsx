import Image from "next/image";
import Link from "next/link";

const HeroAbout = () => {
  return (
    <section
      className="relative h-[500px] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/about-hero-bg-v3.png"
          alt="People Consulting team providing HR compliance and recruitment consulting services"
          fill
          priority
          className="object-cover"
        />
        {/* Solid Dark Gray Overlay with Opacity */}
        <div className="absolute inset-0 bg-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-gray-300 text-sm mb-4 flex items-center justify-center space-x-2">
          <Link
            href="/"
            className="hover:text-maroon transition"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-white">About Us</span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-6">
          A Trusted Partner for HR Compliance, Recruitment &amp; Talent Management
        </h1>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-gray-300 mt-1 max-w-3xl mx-auto leading-relaxed">
          From HR compliance services and labour law compliance services to recruitment consulting and talent management, People Consulting helps businesses across India build compliant, high-performing teams.
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;

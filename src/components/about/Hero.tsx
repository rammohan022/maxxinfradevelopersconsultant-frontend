import Image from "next/image";
import Link from "next/link";

const HeroAbout = () => {
  return (
    <section
      className="relative h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "rgb(15 23 42 / var(--tw-bg-opacity, 1))",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/practice-hero-bg.png"
          alt="Professional corporate law office with law books, modern courtroom interior, legal documents, and professional handshake"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-gray-300 text-sm mb-4 flex items-center justify-center space-x-2">
          <Link
            href="/"
            className="hover:text-law-red transition"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-white">About Us</span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight mb-6">
          A Trusted Law Firm with Decades of Legal Excellence
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Delivering comprehensive legal solutions across India with unmatched
          expertise, integrity, and client commitment
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;

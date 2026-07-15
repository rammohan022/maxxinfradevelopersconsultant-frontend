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
          src="/img/about-hero-bg-v3.png"
          alt="Professional modern corporate office lobby with collaborating consultants and 'PEOPLE CONSULTING' branding on the wall"
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
            className="hover:text-maroon transition"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-white">About Us</span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight mb-6">
          A Trusted HR Consulting Partner with Decades of Excellence
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Delivering comprehensive talent and workforce solutions across India with unmatched
          expertise, integrity, and commitment
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;

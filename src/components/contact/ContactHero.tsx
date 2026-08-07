import React from "react";
import Image from "next/image"

const ContactHero: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative h-[400px] flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/img/contact-hero-bg-v2.png"
          alt="modern, bright corporate office interior with professional business consulting environment"
          fill
          className="object-cover"
        />
        {/* Solid Dark Gray Overlay with Opacity */}
        <div className="absolute inset-0 bg-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-sm font-medium tracking-wider">
          <a
            href="/"
            className="hover:text-maroon transition-colors"
          >
            Home
          </a>
          <span className="mx-3">/</span>
          <span className="text-gray-300">Contact Us</span>
        </div>

        <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-6">
          Contact Us
        </h1>

        <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-3xl mx-auto leading-relaxed">
          We&apos;re here to provide expert legal counsel and representation.
          Reach out to discuss your legal needs with our experienced attorneys.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;

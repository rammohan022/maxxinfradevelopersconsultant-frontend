"use client";

import { Container } from "@/components/ui";
import Image from "next/image";

const PrivacyHeroSection = () => {
  return (
    <section className="relative h-[450px] overflow-hidden bg-navy">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1920"
          alt="Legal privacy and confidentiality concept"
          fill
          className="object-cover opacity-60"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <Container className="relative flex h-full flex-col justify-center">
        <div className="max-w-4xl pt-10">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-200">
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

            <span className="text-gray-200">
              Privacy Policy
            </span>
          </nav>

          {/* Heading */}
          <h1 className="mb-6 font-serif-heading text-6xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Privacy Policy
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-xl leading-relaxed text-gray-200 font-light drop-shadow-md">
            Your privacy is important to us. Learn how we collect, use, and
            safeguard your personal information.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyHeroSection;

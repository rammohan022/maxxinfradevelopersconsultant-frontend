"use client";

import { Container } from "@/components/ui";
import Image from "next/image";

const PrivacyHeroSection = () => {
  return (
    <section className="relative h-[450px] overflow-hidden bg-[rgb(13_33_55)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/recruitment_banner.png"
          alt="Recruitment and hiring handshake concept"
          fill
          priority
          className="object-cover opacity-35"
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[rgb(13_33_55)]/75" />
      {/* Content */}
      <Container className="relative flex h-full flex-col justify-center">
        <div className="max-w-4xl pt-10">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-300">
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

            <span className="text-gray-300">
              Privacy Policy
            </span>
          </nav>

          {/* Heading */}
          <h1 className="mb-6 font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-white drop-shadow-lg">
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

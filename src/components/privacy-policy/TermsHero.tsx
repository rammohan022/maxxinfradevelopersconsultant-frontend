"use client";

import { Container } from "@/components/ui";
import Image from "next/image";

const TermsHero = () => {
  return (
    <section className="relative h-[400px] overflow-hidden bg-[rgb(13_33_55)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/hr_hero_bg_1783707638359.png"
          alt="Recruitment team candidate interview and consulting"
          fill
          priority
          className="object-cover opacity-35"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgb(13_33_55)]/75" />

      {/* Content */}
      <Container className="relative flex h-full flex-col justify-center">
        <div className="max-w-3xl">
          <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-300">
            <a href="/" className="hover:text-white transition">
              Home
            </a>

            <svg
              className="h-3 w-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>

            <span className="font-medium text-secondary">
              Terms & Conditions
            </span>
          </nav>

          <h1 className="mb-6 font-serif-heading text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Terms & Conditions
          </h1>

          <p className="max-w-2xl text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Please read these terms carefully before using our website or
            engaging with our legal services.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default TermsHero;

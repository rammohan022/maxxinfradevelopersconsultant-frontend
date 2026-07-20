"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon / Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-extrabold text-primary/10 tracking-widest selection:bg-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-primary bg-slate-50 px-4 py-2 rounded-xl">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
          Oops! You&apos;ve drifted off course.
        </h2>
        <p className="text-slate-600 mb-8 text-sm sm:text-base leading-relaxed">
          The link you followed may be broken, or the page has been removed. Let&apos;s get you back to the right path.
        </p>

        {/* Back Home CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wider text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

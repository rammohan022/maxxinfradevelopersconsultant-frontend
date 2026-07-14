"use client";

import { useEffect, useState } from "react";

export default function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("disclaimerAccepted");
    if (!accepted) setOpen(true);
  }, []);

  const handleAgree = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-3xl rounded-xl bg-white shadow-2xl">
        {/* Close icon */}
        {/* <button
          onClick={handleAgree}
          className="absolute right-5 top-5 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close disclaimer"
        >
          ✕
        </button> */}
        {/* Content */}
        <div className="p-8 md:p-10">
          <h2 className="mb-6 text-3xl font-serif font-semibold text-gray-900">
            Disclaimer
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              In accordance with the rules of the Bar Council of India, this
              website is intended exclusively for general informational
              purposes and does not constitute advertising, solicitation, or
              the rendering of legal advice in any manner.
            </p>

            <p>
              The information available on this website is provided solely to
              facilitate a general understanding of the Firm, its areas of
              practice, and its professionals. Nothing contained herein should
              be interpreted as a legal opinion or relied upon as such.
            </p>

            <p>
              All content, materials, and information published on this website
              are the intellectual property of the Firm and are protected under
              applicable laws.
            </p>

            <p>
              By clicking <strong>“I Agree”</strong>, you confirm that you are
              accessing this website voluntarily and solely for informational
              purposes.
            </p>
          </div>
          {/* Action */}
          <div className="mt-8">
            <button
              onClick={handleAgree}
              className="inline-flex items-center gap-3 rounded-md bg-secondary px-8 py-3 text-white font-semibold hover:bg-secondary-dark transition"
            >
              I Agree
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

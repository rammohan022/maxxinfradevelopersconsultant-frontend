"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { FAQ } from "@/services/services";
import { useCreateLeadMutation } from "@/services/lead";
import { getImageUrl } from "@/lib/utils/imageUtils";
import toast from "react-hot-toast";

interface MainContentSectionProps {
  title?: string; // Added to auto-fill subject
  overview?: string;
  contentImage?: string;
  services?: string[];
  approach?: string;
  quoteText?: string;
  quoteAuthor?: string;
  faqs?: FAQ[];
}

export default function MainContentSection({
  title,
  overview,
  contentImage,
  services,
  approach,
  quoteText,
  quoteAuthor,
  faqs = [],
}: MainContentSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: title ? `Consultation: ${title}` : "General Enquiry",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead({ ...formData, source: typeof window !== "undefined" ? window.location.pathname : "" }).unwrap();
      toast.success("Enquiry submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: title ? `Consultation: ${title}` : "General Enquiry",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit enquiry.");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Filter out invalid FAQs (handle [[ ]] or similar issues)
  const validFaqs = (faqs || []).filter(faq => faq && typeof faq === 'object' && faq.question);

  return (
    <section id="main-content-section" className="bg-white py-16">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Primary Content */}
          <div className="w-full lg:w-2/3">
            {/* Overview */}
            {overview && (
              <div className="mb-12">
                <h2 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                  Overview
                </h2>
                <div className="mb-6 h-1 w-16 bg-red-700" />
                <div
                  className="leading-relaxed text-slate-700 rich-text-content space-y-4"
                  dangerouslySetInnerHTML={{ __html: overview }}
                />
              </div>
            )}

            {/* Content Image (Overview Bottom Image) */}
            {contentImage && (
              <div className="mb-12 relative h-72 sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                <Image
                  src={getImageUrl(contentImage)}
                  alt={title || "Service Overview Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            )}

            {/* Services */}
            {services && services.length > 0 && (
              <div className="mb-12 border-l-4 border-red-700 bg-gray-50 p-6 sm:p-8">
                <h3 className="mb-6 font-serif text-2xl font-semibold text-primary">
                  Key Areas of Service Include
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {services.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-red-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Approach */}
            {approach && (
              <div className="mb-12">
                <h3 className="mb-2 font-serif text-2xl font-semibold text-primary">
                  Our Approach
                </h3>
                <div className="mb-6 h-1 w-16 bg-red-700" />
                <div
                  className="leading-relaxed text-slate-700 rich-text-content space-y-4"
                  dangerouslySetInnerHTML={{ __html: approach }}
                />
              </div>
            )}

            {/* Quote */}
            {quoteText && (
              <div className="mb-12 border-l-4 border-red-700 bg-navy p-6 sm:p-8 text-white">
                <p className="mb-2 font-serif text-xl italic">
                  “{quoteText}”
                </p>
                {quoteAuthor && (
                  <p className="text-sm text-gray-300">
                    — {quoteAuthor}
                  </p>
                )}
              </div>
            )}

            {/* FAQ */}
            {validFaqs.length > 0 && (
              <div className="mb-12">
                <h3 className="mb-2 font-serif text-2xl font-semibold text-primary">
                  Frequently Asked Questions
                </h3>
                <div className="mb-6 h-1 w-16 bg-red-700" />

                {validFaqs.map((faq, idx) => (
                  <div key={idx} className="mb-3 rounded border border-gray-200">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-primary">
                        {faq.question}
                      </span>
                      <span className="text-red-700">
                        {openFaq === idx ? "−" : "+"}
                      </span>
                    </button>

                    {openFaq === idx && (
                      <div className="bg-gray-50 px-4 sm:px-6 py-4 text-gray-700">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Contact Form */}
              <div className="border border-gray-200 bg-white p-6">
                <h4 className="mb-4 font-semibold text-primary">
                  Request a Consultation
                </h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-red-700 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-red-700 focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-red-700 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-red-700 focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Brief message"
                    required
                    className="w-full resize-none rounded border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary px-4 py-3 text-sm font-medium text-white transition hover:bg-secondary-dark disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>

              {/* Search/Links placeholder */}
              {/* <div className="border border-gray-200 bg-white p-6">
                <h4 className="mb-4 font-semibold text-primary">Search</h4>
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-red-700 focus:outline-none"
                />
              </div> */}

              {/* CTA */}
              <div className="bg-navy p-6 text-white text-center">
                <h4 className="mb-3 font-serif text-xl font-semibold">
                  Need Expert Assistance?
                </h4>
                <p className="mb-4 text-sm text-gray-300">
                  Our experts are ready to help.
                </p>
                <a
                  href="/contact-us"
                  className="block bg-secondary px-6 py-3 text-center font-medium transition hover:bg-secondary-dark"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

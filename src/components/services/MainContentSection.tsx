"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { FAQ, ServiceContentBlock } from "@/services/services";
import { useCreateLeadMutation } from "@/services/lead";
import { getImageUrl } from "@/lib/utils/imageUtils";
import toast from "react-hot-toast";
import { Check, CheckCircle2, ArrowRight } from "lucide-react";

interface MainContentSectionProps {
  title?: string; // Added to auto-fill subject
  overview?: string;
  contentImage?: string;
  contentBlocks?: ServiceContentBlock[];
  services?: any[];
  approach?: string;
  quoteText?: string;
  quoteAuthor?: string;
  faqs?: FAQ[];
  whyTitle?: string;
  whyFeatures?: { title: string; description: string }[];
  benefitsTitle?: string;
  benefitsCards?: { title: string; subtitle?: string; items: string[]; image?: string }[];
}

export default function MainContentSection({
  title,
  overview,
  contentImage,
  contentBlocks = [],
  services,
  approach,
  quoteText,
  quoteAuthor,
  faqs = [],
  whyTitle,
  whyFeatures = [],
  benefitsTitle,
  benefitsCards = [],
}: MainContentSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    company: "",
    subject: title ? `Consultation: ${title}` : "General Enquiry",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        company: "",
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
        <div className="w-full">
          {/* Primary Content */}
          <div className="w-full mb-16">
            {/* Overview */}
            {overview && (
              <div className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2">
                  Overview
                </h2>
                <div className="mb-6 h-1 w-16 bg-red-700" />
                <div
                  className="leading-relaxed text-slate-700 rich-text-content space-y-4"
                  dangerouslySetInnerHTML={{ __html: overview }}
                />
              </div>
            )}

            {/* 2-Column Content / Feature Blocks */}
            {contentBlocks && contentBlocks.length > 0 ? (
              <div className="space-y-12 mb-16">
                {contentBlocks.map((block, idx) => {
                  const isImageLeft = block.imagePosition === "left";
                  const hasImage = Boolean(block.image);
                  const hasPoints = block.points && block.points.length > 0;

                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-slate-50/80 via-white to-orange-50/30 border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Text & Points Column */}
                        <div
                          className={`space-y-4 ${
                            hasImage ? "lg:col-span-6" : "lg:col-span-12"
                          } ${
                            isImageLeft && hasImage ? "lg:order-2" : "lg:order-1"
                          }`}
                        >
                          {block.subtitle && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-secondary text-xs font-bold tracking-wider uppercase">
                              {block.subtitle}
                            </span>
                          )}

                          {block.title && (
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary tracking-tight leading-snug">
                              {block.title}
                            </h3>
                          )}

                          {block.description && (
                            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                              {block.description}
                            </p>
                          )}

                          {hasPoints && (
                            <div className="space-y-3.5 pt-2">
                              {block.points!.map((pt, ptIdx) => (
                                <div key={ptIdx} className="flex items-start gap-3 group">
                                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 text-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:bg-secondary group-hover:text-white transition-colors duration-200">
                                    <CheckCircle2 className="w-4 h-4 text-inherit" strokeWidth={2.5} />
                                  </div>
                                  <div className="min-w-0">
                                    {pt.title && (
                                      <h4 className="text-sm sm:text-base font-bold text-primary mb-0.5">
                                        {pt.title}
                                      </h4>
                                    )}
                                    <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-normal">
                                      {pt.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {block.buttonText && (
                            <div className="pt-3">
                              <Link
                                href={block.buttonUrl || "/contact-us"}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-md shadow-secondary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                              >
                                <span>{block.buttonText}</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          )}
                        </div>

                        {/* Image Column */}
                        {hasImage && (
                          <div
                            className={`lg:col-span-6 ${
                              isImageLeft ? "lg:order-1" : "lg:order-2"
                            }`}
                          >
                            <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md group">
                              <Image
                                src={getImageUrl(block.image)}
                                alt={block.title || "Service feature illustration"}
                                fill
                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Fallback for legacy single contentImage */
              contentImage && (
                <div className="mb-12 relative h-72 sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                  <Image
                    src={getImageUrl(contentImage)}
                    alt={title || "Service Overview Image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 100vw"
                  />
                </div>
              )
            )}

            {/* Services */}
            {services && services.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2">
                  Key Areas of Service Include
                </h3>
                <div className="mb-6 h-1 w-16 bg-red-700" />

                {services[0] && typeof services[0] === 'object' && 'title' in services[0] ? (
                  // Structured Cards Layout (from sketch)
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(services as Array<{ title: string; description?: string; items: string[] }>).map((card, idx) => (
                      <div
                        key={idx}
                        className="bg-orange-50/40 rounded-2xl border border-orange-100/60 p-6 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 relative group"
                      >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <h4 className="text-base font-bold text-primary tracking-tight mb-4 border-b border-slate-100 pb-2.5">
                          {card.title}
                        </h4>

                        {card.description && (
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {card.description}
                          </p>
                        )}

                        {card.items && card.items.length > 0 && (
                          <ul className="space-y-2.5 text-slate-650 text-sm">
                            {card.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start">
                                <span className="mr-2.5 mt-2 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span className="leading-snug text-slate-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback Bullet List Layout (For backwards compatibility)
                  <div className="border-l-4 border-red-700 bg-gray-50 p-6 sm:p-8">
                    <ul className="space-y-3 text-gray-700">
                      {(services as string[]).map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-red-700" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Why Choose Section */}
            {whyTitle && whyFeatures && whyFeatures.length > 0 && (
              <div className="mb-16 mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2 text-center animate-fade-in">
                  {whyTitle}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
                  {whyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white mb-4 shadow-sm">
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </div>
                      <h4 className="text-base font-bold text-primary mb-2 leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-650 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Mockup Cards Section */}
            {benefitsCards && benefitsCards.length > 0 && (
              <div className="mb-16">
                {benefitsTitle && (
                  <>
                    <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2 text-center">
                      {benefitsTitle}
                    </h3>
                  </>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                  {benefitsCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-350"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Left Column: Text & Bullets */}
                        <div>
                          <h4 className="text-lg md:text-xl font-bold text-primary mb-2 tracking-tight">
                            {card.title}
                          </h4>
                          {card.subtitle && (
                            <p className="text-xs text-slate-500 mb-4 font-semibold uppercase tracking-wider">
                              {card.subtitle}
                            </p>
                          )}

                          {card.items && card.items.length > 0 && (
                            <ul className="space-y-3">
                              {card.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start">
                                  <Check className="w-4 h-4 text-primary shrink-0 mr-2 mt-1" strokeWidth={3.5} />
                                  <span className="text-sm text-slate-700 font-medium leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Right Column: Mockup Image */}
                        {card.image && (
                          <div className="relative h-48 md:h-56 w-full rounded-xl overflow-hidden bg-white/60 border border-slate-100 flex items-center justify-center p-2 shadow-sm">
                            <Image
                              src={getImageUrl(card.image)}
                              alt={card.title}
                              fill
                              className="object-contain p-2 hover:scale-[1.02] transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 25vw"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approach */}
            {approach && (
              <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2">
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
            {(() => {
              const commonFaqs = [
                {
                  question: "What recruitment services do you offer?",
                  answer: "We offer end-to-end recruitment solutions including Executive Search, Headhunting, High-Volume Staffing, and temporary placements across IT, Finance, Healthcare, Manufacturing, and Corporate Service sectors.",
                },
                {
                  question: "How does the corporate training curriculum get customized?",
                  answer: "Our training advisors assess your specific organizational goals, compliance requirements, or leadership competency gaps first. Then, we design and deliver workshops online or on-site based on your schedule.",
                },
                {
                  question: "Do you handle statutory compliance and payroll administration?",
                  answer: "Yes. We manage monthly payroll processes, statutory compliance checks, employee benefits advisory, and ensure strict alignment with current labor law guidelines.",
                },
                {
                  question: "How can we start our partnership with People Consulting?",
                  answer: "You can book a free consultation directly through our website form, or connect with our advisors via WhatsApp/Phone call to discuss your recruitment or training needs.",
                },
              ];

              const displayFaqs = validFaqs.length > 0 ? validFaqs : commonFaqs;

              return (
                <div className="mb-12 border-t border-slate-100 pt-12">
                  <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2">
                    Frequently Asked Questions
                  </h3>
                  <div className="mb-8 h-1 w-16 bg-secondary" />

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-5 items-start">
                    {displayFaqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left"
                          >
                            <span className="font-semibold text-primary text-sm sm:text-base pr-3 leading-snug">
                              {faq.question}
                            </span>
                            <div className="w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0 font-bold text-lg leading-none">
                              {isOpen ? <span className="text-secondary">-</span> : <span className="text-slate-400">+</span>}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bottom Area: Contact Form & CTA */}
          <div className="w-full max-w-2xl mx-auto space-y-8 pt-8 border-t border-slate-200">
            {/* Contact Form */}
            <div className="border border-gray-200 bg-white p-6 sm:p-8 rounded-xl shadow-sm">
              <h4 className="mb-6 text-xl font-bold text-primary text-center">
                Request a Consultation
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                </div>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Brief message"
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary px-4 py-4 text-sm font-bold text-white uppercase tracking-wider rounded-lg transition hover:bg-secondary-dark disabled:bg-gray-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

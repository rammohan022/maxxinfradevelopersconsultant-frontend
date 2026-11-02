"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import Image from "next/image";
import { useCreateLeadMutation } from "@/services/lead";
import { PROPERTY_CATEGORIES, POPULAR_LOCALITIES } from "@/data/properties";
import toast from "react-hot-toast";
import { Phone, MapPin, Calendar, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    propertyType: "Villas",
    preferredLocation: "Deva Road",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phoneNumber) {
      toast.error("Please enter your name and phone number");
      return;
    }

    try {
      await createLead({
        fullName: formData.fullName,
        email: formData.email || "inquiry@maxxinfradevelopersconsultant.com",
        phoneNumber: formData.phoneNumber,
        subject: `Property Inquiry: ${formData.propertyType} in ${formData.preferredLocation}`,
        message: `${formData.message ? formData.message + " | " : ""}Preferred Category: ${formData.propertyType}, Location: ${formData.preferredLocation}`,
        source: typeof window !== "undefined" ? window.location.pathname : "Contact Page"
      }).unwrap();

      toast.success("Inquiry submitted! Our property consultant will contact you shortly.");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        propertyType: "Villas",
        preferredLocation: "Deva Road",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit enquiry. Please call us at +91 79051 45968 directly.");
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-slate-800";

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          {/* Left side: Information & Visual */}
          <div className="lg:col-span-5 bg-primary text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/img/hero/real_estate_hero.jpg"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative z-10">
              <span className="text-secondary text-xs font-bold uppercase tracking-widest block mb-2">
                Direct Contact
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
                We’re Here to Help You Find Your Next Home
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8">
                Speak directly with our property advisors. Whether you want to schedule a cab site visit or discuss bank loan eligibility, we are available 7 days a week.
              </p>

              <div className="space-y-5 text-xs text-slate-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-secondary flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Main Office:</span>
                    <span className="text-slate-300">G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow, Uttar Pradesh</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-secondary flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Phone / WhatsApp:</span>
                    <a href="tel:+917905145968" className="text-secondary font-semibold hover:underline block">
                      +91 79051 45968
                    </a>
                    <a href="tel:+916386100070" className="text-slate-300 hover:underline block">
                      +91 63861 00070
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-secondary flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Working Hours:</span>
                    <span className="text-slate-300">Monday - Sunday: 9:00 AM - 7:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="text-secondary shrink-0" size={18} />
              <span>Free cab facility available for Lucknow site visits</span>
            </div>
          </div>

          {/* Right side: Contact Form */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Quick Inquiry</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">Book Site Visit / Request Callback</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill the details below and we will contact you within 30 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Interested Property</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {PROPERTY_CATEGORIES.filter(c => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Locality</label>
                  <select
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {POPULAR_LOCALITIES.filter(l => l !== "All Locations").map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message or Requirements</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Share any specific requirements (budget, immediate site visit, bank loan need, etc.)..."
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry & Book Site Visit"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;

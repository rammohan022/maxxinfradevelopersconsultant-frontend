"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { 
  Building2, 
  Key, 
  BadgePercent, 
  Camera, 
  FileCheck, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  Phone
} from "lucide-react";
import { useCreateLeadMutation } from "@/services/lead";
import { POPULAR_LOCALITIES } from "@/data/properties";
import toast from "react-hot-toast";

export default function SellRentSection() {
  const [formData, setFormData] = useState({
    ownerName: "",
    phoneNumber: "",
    email: "",
    propertyType: "Row House / Villa",
    locality: "Deva Road",
    expectedPrice: "",
    propertyDetails: "",
  });

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.phoneNumber) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    try {
      await createLead({
        fullName: formData.ownerName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || "owner@maxxinfradevelopersconsultant.com",
        subject: `Owner Property Sale: ${formData.propertyType} in ${formData.locality}`,
        message: `Owner wants to sell property. Type: ${formData.propertyType}, Locality: ${formData.locality}, Expected Value: ${formData.expectedPrice || "Negotiable"}. Notes: ${formData.propertyDetails}`,
        source: `Owner Property Sale Listing`,
      }).unwrap();

      toast.success(`Property listing received! Our property valuation manager will contact you for a site inspection.`);
      setFormData({
        ownerName: "",
        phoneNumber: "",
        email: "",
        propertyType: "Row House / Villa",
        locality: "Deva Road",
        expectedPrice: "",
        propertyDetails: "",
      });
    } catch {
      toast.error("Failed to submit. Please call us directly at +91 83031 45434.");
    }
  };

  return (
    <section id="sell-property" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div id="sell-rent-section" className="scroll-mt-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Why Sell with Maxx Infra */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/30">
                <TrendingUp size={14} /> Owner Services • Sell Your Property
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Want to <span className="text-secondary">Sell</span> Your Property in Lucknow?
              </h2>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Partner with Maxx Infra Developers &amp; Consultant. We connect your property directly with genuine, pre-qualified buyers across Lucknow &amp; NCR — ensuring rapid deal closure at maximum market value with complete legal safety and zero brokerage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">100% Verified Buyers</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Pre-screened genuine buyers with ready budgets.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Free Site Media</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">High-definition photography &amp; video walkthroughs.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Best Market Valuation</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Accurate appraisal backed by current registry trends.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Complete Paperwork</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Full support for sale deed registry &amp; Tehsil mutation.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="tel:+918303145434"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition"
                >
                  <Phone size={15} className="text-secondary" /> Call For Free Property Valuation: +91 83031 45434
                </a>
              </div>
            </div>

            {/* Right Column: Listing Submission Form */}
            <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-lg">
              <div className="mb-5 pb-3 border-b border-slate-200">
                <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                  Owner Listing Portal
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  List Your Property for Sale
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Zero listing fees. Fast response from our local area valuation manager.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Srivastava"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                    >
                      <option value="Row House / Villa">Row House / Villa</option>
                      <option value="Independent Builder Floor">Independent Builder Floor</option>
                      <option value="Apartment / Flat">Apartment / Flat</option>
                      <option value="Residential Plot / Land">Residential Plot / Land</option>
                      <option value="Commercial Space">Commercial Space / Shop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Locality in Lucknow / NCR</label>
                    <select
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                    >
                      {POPULAR_LOCALITIES.filter(l => l !== "All Locations").map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Expected Selling Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹55 Lakhs"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Property Highlights &amp; Address</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 3 BHK with car parking, near Kisan Path / Deva Road, clear registry title..."
                    value={formData.propertyDetails}
                    onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-white text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-dark"
                >
                  <Send size={14} />
                  {isLoading ? "Submitting..." : "Submit Property for Sale"}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Car, 
  Compass, 
  IndianRupee, 
  Calculator, 
  ArrowLeft,
  BadgeCheck,
  Check,
  Clock
} from "lucide-react";
import { Container } from "@/components/ui";
import { PROPERTIES, Property } from "@/data/properties";
import { useCreateLeadMutation } from "@/services/lead";
import toast from "react-hot-toast";

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params?.id as string;

  const property: Property | undefined = PROPERTIES.find((p) => p.id === propertyId) || PROPERTIES[0];

  const [activeImage, setActiveImage] = useState<string>(property?.gallery?.[0] || property?.image || "");
  const [siteVisitDate, setSiteVisitDate] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: `I am interested in ${property?.title} (${property?.price}). Please arrange a site visit.`
  });

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      toast.error("Please enter your name and phone number");
      return;
    }

    try {
      await createLead({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || "no-reply@maxxinfradevelopersconsultant.com",
        subject: `Property Inquiry: ${property.title}`,
        message: `${formData.message} Preferred Visit Date: ${siteVisitDate || "Immediate"}`,
        source: `Property Details - ${property.title}`
      }).unwrap();

      toast.success("Inquiry submitted! Our representative will call you shortly.");
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        message: ""
      });
    } catch (err) {
      toast.error("Unable to submit. Please call directly at +91 8303145434");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="bg-white border-b border-slate-100 py-3.5">
        <Container className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-primary transition">Properties</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px] md:max-w-md">{property.title}</span>
          </div>

          <Link
            href="/properties"
            className="flex items-center gap-1 font-semibold text-primary hover:text-accent transition"
          >
            <ArrowLeft size={14} /> Back to all properties
          </Link>
        </Container>
      </div>

      <Container className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column (Gallery & Details) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Section */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
              <div className="relative h-[320px] md:h-[460px] w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
                <Image
                  src={activeImage || property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow ${
                    property.purpose === "Rent" ? "bg-secondary text-primary-dark font-black" : "bg-primary text-white"
                  }`}>
                    {property.purpose === "Rent" ? "FOR RENT" : "FOR SALE"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm shadow">
                    {property.category}
                  </span>
                  {property.furnishing && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow">
                      {property.furnishing}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/70 text-white shadow">
                    {property.possession}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {property.gallery && property.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {property.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-20 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                        activeImage === img ? "border-secondary ring-2 ring-secondary/30" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Key Specs Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  {property.subtitle && (
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      {property.subtitle}
                    </span>
                  )}
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                    {property.title}
                  </h1>
                  <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
                    <MapPin size={16} className="text-secondary shrink-0" />
                    <span>{property.location}</span>
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                    {property.purpose === "Rent" ? "Monthly Rent" : "Total Price"}
                  </span>
                  <span className="text-3xl font-black text-primary">{property.price}</span>
                  <span className="text-xs text-emerald-600 block font-semibold mt-0.5">
                    {property.deposit ? property.deposit : "100% Verified Title & Zero Brokerage"}
                  </span>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-5 border-y border-slate-100 text-slate-700">
                {property.beds ? (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-xs text-primary flex items-center justify-center shrink-0 border border-slate-100">
                      <Bed size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">Bedrooms</p>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{property.beds} BHK</p>
                    </div>
                  </div>
                ) : null}

                {property.baths ? (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-xs text-primary flex items-center justify-center shrink-0 border border-slate-100">
                      <Bath size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">Bathrooms</p>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{property.baths} Baths</p>
                    </div>
                  </div>
                ) : null}

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-xs text-primary flex items-center justify-center shrink-0 border border-slate-100">
                    <Maximize2 size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">Plot / Built Area</p>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm truncate" title={property.area}>{property.area}</p>
                  </div>
                </div>

                {property.roadWidth ? (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-xs text-primary flex items-center justify-center shrink-0 border border-slate-100">
                      <Car size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">Road Width</p>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate" title={property.roadWidth}>{property.roadWidth}</p>
                    </div>
                  </div>
                ) : null}

                {!property.beds && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-xs text-primary flex items-center justify-center shrink-0 border border-slate-100">
                      <Calendar size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">Possession</p>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{property.possession}</p>
                    </div>
                  </div>
                )}

                {!property.baths && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-xs text-emerald-600 flex items-center justify-center shrink-0 border border-slate-100">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">Registry Title</p>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">100% Verified</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <BadgeCheck size={16} /> Clear Title & Registry
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700">
                  <ShieldCheck size={16} /> Bank Loan Available (SBI, HDFC)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700">
                  <Check size={16} /> Free Cab Site Visit Available
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About this Property</h2>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Amenities & Society Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 text-xs font-medium text-slate-700">
                    <CheckCircle2 size={16} className="text-secondary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Location & Connectivity Highlights</h2>
              <div className="space-y-2.5">
                {property.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs font-medium text-slate-800">
                    <Compass size={18} className="text-amber-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Walkthrough (if available) */}
            {property.videoUrl && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Video Walkthrough & Site Drone Footage</h2>
                <div className="rounded-xl overflow-hidden bg-black aspect-video">
                  <video
                    src={property.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Site Visit / Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Booking / Rental Viewing Form Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                    <Calendar size={14} /> {property.purpose === "Rent" ? "Rental Viewing" : "Free Site Visit"}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {property.purpose === "Rent" ? "Schedule Rental Viewing" : "Schedule a Free Site Inspection"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {property.purpose === "Rent"
                      ? "Direct landlord & developer rental assistance with verified lease agreement."
                      : "Complimentary cab pickup & drop facility available across Lucknow for verified buyers."}
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={siteVisitDate}
                      onChange={(e) => setSiteVisitDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-primary bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-primary text-white text-xs font-bold tracking-wide uppercase hover:bg-primary-dark transition shadow-md flex items-center justify-center gap-2"
                  >
                    {isLoading ? "Submitting..." : property.purpose === "Rent" ? "Request Rental Visit Now" : "Book Site Visit Now"}
                  </button>
                </form>

                {/* Direct Action Contacts */}
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <a
                    href="tel:+918303145434"
                    className="w-full py-2.5 px-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Phone size={15} /> Call: +91 83031 45434
                  </a>

                  <a
                    href={`https://wa.me/918303145434?text=Hello%20Maxx%20Infra,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition text-xs font-bold flex items-center justify-center gap-2"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Callout: Home Loan for Buy vs Listing Assistance for Rent */}
              {property.purpose === "Rent" ? (
                <div className="bg-gradient-to-br from-slate-900 to-primary text-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Want to Rent Out Your Property?</h4>
                      <p className="text-xs text-slate-300">Fast Corporate Tenant Placement</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    List your home, flat or commercial space with Maxx Infra. We provide verified tenants, legal rent agreement drafting, and hassle-free management.
                  </p>
                  <Link
                    href="/#sell-rent-section"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                  >
                    List Your Property For Rent →
                  </Link>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
                      <Calculator size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Need a Home Loan?</h4>
                      <p className="text-xs text-slate-300">SBI, HDFC & PNB Approved</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Get up to 90% funding with quick sanction and lowest interest rates. Our loan desk handles all paperwork for free.
                  </p>
                  <Link
                    href="/loan"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                  >
                    Calculate EMI & Check Eligibility →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import {
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Send,
  Loader2,
  Building2,
  Sparkles,
  X,
  ChevronRight,
  ShieldCheck,
  Check,
  FileText,
} from "lucide-react";
import { useGetCareerByIdQuery, useGetCareersQuery, Career } from "@/services/career";
import { useCreateJobApplicationMutation } from "@/services/jobApplication";
import toast from "react-hot-toast";

// Helper for relative time
function timeAgo(dateString?: string): string {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function JobDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";

  const { data: job, isLoading, isError } = useGetCareerByIdQuery(id, {
    skip: !id,
  });

  const { data: allCareers = [] } = useGetCareersQuery();

  // Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createJobApplication, { isLoading: isSubmitting }] = useCreateJobApplicationMutation();

  useEffect(() => {
    if (!applyModalOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setApplyModalOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [applyModalOpen]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Job link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;

    const form = e.currentTarget;
    const formData = new FormData();
    formData.append(
      "fullName",
      (form.elements.namedItem("apply-name") as HTMLInputElement).value
    );
    formData.append(
      "email",
      (form.elements.namedItem("apply-email") as HTMLInputElement).value
    );
    formData.append(
      "phoneNumber",
      (form.elements.namedItem("apply-phone") as HTMLInputElement).value
    );
    formData.append(
      "message",
      (form.elements.namedItem("apply-message") as HTMLTextAreaElement).value
    );
    formData.append("jobId", job.id);

    const resumeFile = (
      form.elements.namedItem("apply-resume") as HTMLInputElement
    ).files?.[0];
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      await createJobApplication(formData).unwrap();
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        setApplyModalOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to submit application:", err);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 py-20">
        <Loader2 className="w-10 h-10 animate-spin text-secondary mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading job details...</p>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 py-20 px-4 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Opening Not Found</h2>
        <p className="text-slate-600 text-sm max-w-md mb-6">
          This position may have been closed or the link you followed might be incorrect.
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 bg-secondary hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Openings
        </Link>
      </div>
    );
  }

  // Related jobs
  const otherJobs = allCareers
    .filter((c) => c.id !== job.id && c.isActive)
    .slice(0, 3);

  // Format date
  const postedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <>
      <div className="bg-[#F8FAFC] min-h-screen pb-20">
        {/* ================= HERO / HEADER ================= */}
        <section className="bg-primary text-white pt-10 pb-16 relative overflow-hidden">
          {/* Subtle glow / grid background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <Container className="relative z-10">
            {/* Top Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-white/70 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <Link href="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span className="text-white font-medium truncate max-w-xs">{job.title}</span>
            </div>

            {/* Back link */}
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline mb-5 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Open Positions
            </Link>

            {/* Main Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  {job.department || "General"}
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                  {job.title}
                </h1>

                {/* Meta chips */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span>{job.location}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    <span>{job.jobType}</span>
                  </span>

                  {job.experience && (
                    <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                      <Briefcase className="w-3.5 h-3.5 text-secondary" />
                      <span>Exp: {job.experience}</span>
                    </span>
                  )}

                  {job.education && (
                    <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                      <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                      <span>Edu: {job.education}</span>
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>Posted {timeAgo(job.createdAt)}</span>
                  </span>
                </div>
              </div>

              {/* Actions Right */}
              <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                  title="Share this job"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>

                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-secondary/25 hover:-translate-y-0.5"
                >
                  <span>Apply Now</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= MAIN CONTENT SECTION ================= */}
        <Container className="-mt-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Columns: Job Description */}
            <div className="lg:col-span-8 space-y-6">
              {/* Main Job Description Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-primary flex items-center gap-2">
                    <FileText className="w-5 h-5 text-secondary" />
                    Job Description & Requirements
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Actively Hiring
                  </span>
                </div>

                {/* Formatted Description Body */}
                <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                  {job.description}
                </div>

                {/* Ready to Apply Box */}
                <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary to-[#18395e] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-1">
                      Ready to join our team?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Submit your resume and our recruitment team will reach out to you.
                    </p>
                  </div>
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-md shadow-secondary/30"
                  >
                    Apply for this Job
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Company Culture / Highlights Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  Why Work With People Consulting?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-primary font-semibold mb-0.5">
                        Accelerated Growth
                      </strong>
                      High-impact projects with rapid career progression and mentorship.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-primary font-semibold mb-0.5">
                        People-First Culture
                      </strong>
                      Collaborative environment where every voice and idea is valued.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-primary font-semibold mb-0.5">
                        Learning & Upskilling
                      </strong>
                      Continuous training programs and certifications for skill development.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-primary font-semibold mb-0.5">
                        Competitive Rewards
                      </strong>
                      Market-standard compensation, incentives, and wellness support.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Sticky Job Overview & Related */}
            <div className="lg:col-span-4 space-y-6">
              {/* Job Overview Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm sticky top-24">
                <h3 className="text-base font-bold text-primary mb-4 pb-3 border-b border-slate-100">
                  Job Overview
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-semibold">
                        Department
                      </span>
                      <span className="text-primary font-semibold">
                        {job.department || "General"}
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-semibold">
                        Job Location
                      </span>
                      <span className="text-primary font-semibold">{job.location}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-semibold">
                        Employment Type
                      </span>
                      <span className="text-primary font-semibold">{job.jobType}</span>
                    </div>
                  </li>

                  {job.experience && (
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-semibold">
                          Experience Required
                        </span>
                        <span className="text-primary font-semibold">{job.experience}</span>
                      </div>
                    </li>
                  )}

                  {job.education && (
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-semibold">
                          Education Qualification
                        </span>
                        <span className="text-primary font-semibold">{job.education}</span>
                      </div>
                    </li>
                  )}

                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-semibold">
                        Date Posted
                      </span>
                      <span className="text-primary font-semibold">{postedDate}</span>
                    </div>
                  </li>
                </ul>

                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full mt-6 py-3 bg-secondary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-secondary/20 flex items-center justify-center gap-2"
                >
                  Apply for this Position
                  <Send className="w-4 h-4" />
                </button>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    100% Free Application
                  </span>
                  <button
                    onClick={handleShare}
                    className="text-secondary hover:underline font-semibold flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share Job
                  </button>
                </div>
              </div>

              {/* Other Open Positions */}
              {otherJobs.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
                  <h3 className="text-base font-bold text-primary mb-3">
                    Other Open Positions
                  </h3>
                  <div className="space-y-3">
                    {otherJobs.map((other) => (
                      <Link
                        key={other.id}
                        href={`/careers/${other.id}`}
                        className="block p-3 rounded-xl border border-slate-100 hover:border-secondary/40 hover:bg-slate-50/70 transition-all group"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                          {other.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                          <span>{other.location}</span>
                          <span>•</span>
                          <span>{other.jobType}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/careers"
                    className="block text-center text-xs font-bold text-secondary hover:underline mt-4 pt-2 border-t border-slate-100"
                  >
                    View All {allCareers.length} Openings →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* ================= APPLY MODAL ================= */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-primary">
                  Apply for Position
                </h3>
                <p className="text-xs text-slate-500 font-medium">{job.title}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="py-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                    Application Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm">
                    Thank you for applying for <strong>{job.title}</strong>. Our HR team
                    will review your profile and get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setApplyModalOpen(false);
                      setIsSubmitted(false);
                    }}
                    className="mt-6 bg-secondary hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-xs text-slate-600">
                    <p className="font-bold text-primary text-sm mb-1">{job.title}</p>
                    <p className="flex items-center gap-1.5 flex-wrap">
                      <span>{job.location}</span>
                      <span>·</span>
                      <span>{job.jobType}</span>
                      {job.experience && (
                        <>
                          <span>·</span>
                          <span>Exp: {job.experience}</span>
                        </>
                      )}
                      {job.education && (
                        <>
                          <span>·</span>
                          <span>Edu: {job.education}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="apply-name"
                        className="block text-xs font-bold text-slate-700 mb-1.5"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="apply-name"
                        name="apply-name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full border border-slate-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="apply-email"
                          className="block text-xs font-bold text-slate-700 mb-1.5"
                        >
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="apply-email"
                          name="apply-email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full border border-slate-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="apply-phone"
                          className="block text-xs font-bold text-slate-700 mb-1.5"
                        >
                          Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="apply-phone"
                          name="apply-phone"
                          type="tel"
                          required
                          placeholder="+91"
                          className="w-full border border-slate-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label
                        htmlFor="apply-resume"
                        className="block text-xs font-bold text-slate-700 mb-1.5"
                      >
                        Resume / CV <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="apply-resume"
                        name="apply-resume"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        className="w-full border border-slate-200 px-3.5 py-2 text-xs rounded-xl focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary file:mr-3 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:bg-secondary/10 file:text-secondary file:font-semibold file:cursor-pointer transition-colors"
                      />
                      <p className="mt-1 text-[11px] text-slate-400">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label
                        htmlFor="apply-message"
                        className="block text-xs font-bold text-slate-700 mb-1.5"
                      >
                        Cover Letter / Notes (Optional)
                      </label>
                      <textarea
                        id="apply-message"
                        name="apply-message"
                        rows={3}
                        placeholder="Share any highlights, notice period, or relevant background..."
                        className="w-full border border-slate-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none transition-colors"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setApplyModalOpen(false)}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 bg-secondary hover:bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

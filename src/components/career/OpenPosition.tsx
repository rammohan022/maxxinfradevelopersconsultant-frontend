"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { useState, useMemo, useEffect } from "react";
import {
  X,
  MapPin,
  Calendar,
  Search,
  Info,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Loader2,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useGetCareersQuery, Career } from "@/services/career";
import { useCreateJobApplicationMutation } from "@/services/jobApplication";
import toast from "react-hot-toast";

// Helper for relative time like "2 weeks ago"
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

const OpenPosition = () => {
  const { data: careers = [], isLoading, isError } = useGetCareersQuery();

  // Search & Filter State
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("SELECT");
  const [workModel, setWorkModel] = useState("ALL");
  const [department, setDepartment] = useState("ALL");
  const [country, setCountry] = useState("ALL");
  const [locationState, setLocationState] = useState("ALL");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("RADIUS");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Apply Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createJobApplication, { isLoading: isSubmitting }] =
    useCreateJobApplicationMutation();

  // Dynamic filter option lists
  const departments = useMemo(() => {
    const depts = new Set(careers.map((j) => j.department).filter(Boolean));
    return ["ALL", ...Array.from(depts)];
  }, [careers]);

  const workModels = useMemo(() => {
    const models = new Set(careers.map((j) => j.jobType).filter(Boolean));
    return ["ALL", ...Array.from(models)];
  }, [careers]);

  const stateOptions = useMemo(() => {
    const states = new Set(careers.map((j) => j.location).filter(Boolean));
    return Array.from(states);
  }, [careers]);

  // Modal key handling
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

  const openApplyModal = (job: Career) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setSelectedJob(null);
    setIsSubmitted(false);
  };

  const handleResetFilters = () => {
    setSearchKeyword("");
    setSortOrder("SELECT");
    setWorkModel("ALL");
    setDepartment("ALL");
    setCountry("ALL");
    setLocationState("ALL");
    setCity("");
    setZipCode("");
    setRadius("RADIUS");
    setCurrentPage(1);
  };

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;

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
    formData.append("jobId", selectedJob.id);

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
        closeApplyModal();
      }, 3000);
    } catch (err) {
      console.error("Failed to submit application:", err);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  // Filtered and sorted positions
  const filteredPositions = useMemo(() => {
    let result = careers.filter((p) => {
      // Only active on public site
      if (!p.isActive) return false;

      // Search keyword filter
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchTitle = p.title?.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchDept = p.department?.toLowerCase().includes(q);
        const matchLoc = p.location?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchDept && !matchLoc) return false;
      }

      // Work model
      if (workModel !== "ALL" && p.jobType !== workModel) return false;

      // Industry / Department
      if (department !== "ALL" && p.department !== department) return false;

      // Location State
      if (
        locationState !== "ALL" &&
        !p.location?.toLowerCase().includes(locationState.toLowerCase())
      )
        return false;

      // City
      if (
        city.trim() &&
        !p.location?.toLowerCase().includes(city.trim().toLowerCase())
      )
        return false;

      return true;
    });

    // Sorting
    if (sortOrder === "NEWEST") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    } else if (sortOrder === "OLDEST") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
      );
    } else if (sortOrder === "TITLE_ASC") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "TITLE_DESC") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [
    careers,
    searchKeyword,
    workModel,
    department,
    locationState,
    city,
    sortOrder,
  ]);

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchKeyword,
    workModel,
    department,
    locationState,
    city,
    country,
    sortOrder,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPositions.slice(start, start + itemsPerPage);
  }, [filteredPositions, currentPage, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-slate-500 font-medium">
        Loading open positions...
      </div>
    );
  }

  if (isError) return null;

  return (
    <>
      <div id="open-positions" className="bg-slate-100/70">
        {/* ================= TOP SEARCH BAR ================= */}
        <div className="bg-[#17233e] py-6 px-4 border-b border-primary/40 shadow-inner">
          <Container>
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-0 shadow-lg rounded-md overflow-hidden">
              <div className="relative flex-1 w-full flex items-center bg-white px-4 py-1">
                <Info className="w-5 h-5 text-slate-400 mr-2.5 shrink-0 hidden sm:block" />
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0 sm:hidden" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Job Title, Keyword, Specialization"
                  className="w-full py-2.5 sm:py-3 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword("")}
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setCurrentPage(1)}
                className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-white font-bold text-sm px-7 py-3 flex items-center justify-center gap-1.5 transition duration-200 shrink-0 uppercase tracking-wider"
              >
                <span>Search Jobs</span>
                <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </Container>
        </div>

        {/* ================= 2-COLUMN CONTENT AREA ================= */}
        <section className="py-10 md:py-14">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ================= LEFT COLUMN: FILTERS ================= */}
              <div className="lg:col-span-4">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-3 tracking-tight">
                  Filters
                </h2>

                <div className="bg-primary p-5 sm:p-6 rounded-xl shadow-md text-white space-y-4 border border-primary-dark">
                  {/* Sort Order */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-white/90">
                      Sort Order
                    </label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs font-medium px-3 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                    >
                      <option value="SELECT">SELECT</option>
                      <option value="NEWEST">Newest First</option>
                      <option value="OLDEST">Oldest First</option>
                      <option value="TITLE_ASC">Title (A - Z)</option>
                      <option value="TITLE_DESC">Title (Z - A)</option>
                    </select>
                  </div>

                  {/* Work Model */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-white/90">
                      Work Model
                    </label>
                    <select
                      value={workModel}
                      onChange={(e) => setWorkModel(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs font-medium px-3 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                    >
                      {workModels.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-white/90">
                      Industry
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs font-medium px-3 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/90">
                      Location
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs font-medium px-3 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                    >
                      <option value="ALL">SELECT COUNTRY</option>
                      <option value="India">India</option>
                    </select>
                    <select
                      value={locationState}
                      onChange={(e) => setLocationState(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs font-medium px-3 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                    >
                      <option value="ALL">SELECT STATE</option>
                      {stateOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="CITY"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs font-medium px-3 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder-slate-400"
                    />
                  </div>

                  {/* Zip / Postal Code & Within */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-white/90">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="ZIP/POSTAL CODE"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full bg-white text-slate-800 text-xs px-2.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-white/90">
                        Within
                      </label>
                      <select
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        className="w-full bg-white text-slate-800 text-xs px-2 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                      >
                        <option value="RADIUS">RADIUS</option>
                        <option value="10">10 km</option>
                        <option value="25">25 km</option>
                        <option value="50">50 km</option>
                        <option value="100">100 km</option>
                      </select>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="w-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 rounded-lg border border-white/20 hover:border-secondary transition flex items-center justify-center gap-1.5 tracking-wider uppercase"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: JOB LIST ================= */}
              <div className="lg:col-span-8">
                {/* Header Row: Total count + Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200">
                  <div className="text-sm text-slate-600 font-medium">
                    <span className="text-2xl font-extrabold text-primary mr-1.5">
                      {filteredPositions.length}
                    </span>{" "}
                    Current Openings
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                      {currentPage > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentPage(1)}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-sm"
                            title="First Page"
                          >
                            <ChevronsLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-sm"
                            title="Previous Page"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                        )
                        .map((page, idx, arr) => (
                          <div key={page} className="flex items-center">
                            {idx > 0 && arr[idx - 1] !== page - 1 && (
                              <span className="px-1 text-slate-400 text-xs">...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 text-xs font-bold rounded-sm border ${
                                currentPage === page
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {page}
                            </button>
                          </div>
                        ))}

                      {currentPage < totalPages && (
                        <>
                          <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-sm"
                            title="Next Page"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-sm"
                            title="Last Page"
                          >
                            <ChevronsRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Job Cards */}
                {paginatedJobs.length === 0 ? (
                  <div className="text-center py-16 rounded-sm border border-slate-200 bg-white p-6">
                    <p className="text-slate-600 font-medium mb-3">
                      No open positions match your search criteria.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-secondary hover:underline uppercase tracking-wider"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedJobs.map((job) => (
                      <article
                        key={job.id}
                        className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                          <Link href={`/careers/${job.id}`}>
                            <h3 className="text-primary hover:text-secondary font-bold text-base sm:text-lg leading-snug cursor-pointer transition-colors">
                              {job.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 shrink-0 self-start">
                            <Link
                              href={`/careers/${job.id}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-secondary bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded transition"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => openApplyModal(job)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-secondary hover:bg-secondary-dark px-4 py-1.5 rounded transition shadow-sm"
                            >
                              Apply
                            </button>
                          </div>
                        </div>

                        {/* Meta info row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mb-3">
                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.location}</span>
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{timeAgo(job.createdAt)}</span>
                          </span>
                          {job.jobType && (
                            <>
                              <span className="text-slate-300">|</span>
                              <span className="text-slate-600">{job.jobType}</span>
                            </>
                          )}
                          {job.experience && (
                            <>
                              <span className="text-slate-300">|</span>
                              <span className="text-slate-600">
                                Exp: {job.experience}
                              </span>
                            </>
                          )}
                          {job.education && (
                            <>
                              <span className="text-slate-300">|</span>
                              <span className="text-slate-600">
                                Edu: {job.education}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Excerpt / Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {job.description}
                        </p>
                        <div className="mt-2.5">
                          <Link
                            href={`/careers/${job.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                          >
                            Read Full Job Description
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* Bottom Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-end mt-8 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1">
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-sm"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 text-xs font-bold rounded-sm border ${
                              currentPage === page
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-sm"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* ================= APPLY MODAL ================= */}
      {applyModalOpen && selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
          onClick={closeApplyModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 z-10">
              <h2 id="apply-modal-title" className="text-xl font-bold text-primary">
                Apply for Position
              </h2>
              <button
                type="button"
                onClick={closeApplyModal}
                className="p-2 text-gray-500 hover:text-navy rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Application Received!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for applying for the{" "}
                    <strong>{selectedJob.title}</strong> position. Our team will
                    review your application and get back to you soon.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="mt-8 bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg font-medium transition"
                  >
                    Got it, thanks!
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                    <p className="font-semibold text-navy">{selectedJob.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {selectedJob.location} · {selectedJob.jobType} ·{" "}
                      {selectedJob.experience}
                      {selectedJob.education ? ` · ${selectedJob.education}` : ""}
                    </p>
                  </div>
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="apply-name"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          Full Name *
                        </label>
                        <input
                          id="apply-name"
                          name="apply-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full border border-gray-300 px-4 py-2 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="apply-email"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          Email *
                        </label>
                        <input
                          id="apply-email"
                          name="apply-email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full border border-gray-300 px-4 py-2 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone and Resume */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="apply-phone"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          Phone *
                        </label>
                        <input
                          id="apply-phone"
                          name="apply-phone"
                          type="tel"
                          required
                          placeholder="+91 00000 00000"
                          className="w-full border border-gray-300 px-4 py-2 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="apply-resume"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          Resume / CV *
                        </label>
                        <input
                          id="apply-resume"
                          name="apply-resume"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          className="w-full border border-gray-300 px-4 py-1 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-secondary/10 file:text-secondary file:font-medium file:cursor-pointer"
                        />
                        <p className="mt-1 text-[10px] text-gray-500">
                          PDF or DOC, max 5MB
                        </p>
                      </div>
                    </div>

                    {/* Row 3: Cover Letter */}
                    <div>
                      <label
                        htmlFor="apply-message"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                      >
                        Cover letter / Message
                      </label>
                      <textarea
                        id="apply-message"
                        name="apply-message"
                        rows={4}
                        placeholder="Briefly tell us about your experience and why you are interested in this role (optional)."
                        className="w-full border border-gray-300 px-4 py-3 rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none text-sm"
                      />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeApplyModal}
                        disabled={isSubmitting}
                        className="flex-1 border border-gray-300 px-5 py-3 rounded font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-secondary hover:bg-secondary-dark text-white px-5 py-3 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
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
};

export default OpenPosition;
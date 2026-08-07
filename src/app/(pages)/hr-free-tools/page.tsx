"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Search, Download, CheckCircle2, FileText, FileSpreadsheet, File, Users, DollarSign, ShieldCheck, BookOpen, Activity, GraduationCap, Mail, ChevronRight, FolderOpen } from "lucide-react";
import { useGetPublicHrResourcesQuery } from "@/services/hrResources";
import { useGetPublicHrResourceCategoriesQuery } from "@/services/hrResourceCategories";
import { getImageUrl } from "@/lib/utils/imageUtils";

const ICON_MAP: Record<string, any> = {
  Recruitment: Users,
  Payroll: DollarSign,
  Compliance: ShieldCheck,
  "HR Policies": BookOpen,
  "Employee Lifecycle": Activity,
  Performance: Activity,
  Training: GraduationCap,
  "Letters & Formats": Mail,
};

const getIconForCategory = (name: string) => {
  return ICON_MAP[name] || FileText;
};

export default function HrFreeToolsPage() {
  const { data: dynamicCategories = [] } = useGetPublicHrResourceCategoriesQuery();

  const categoriesList = useMemo(() => {
    const list = [{ id: "All Resources", label: "All Resources", icon: File }];
    dynamicCategories.forEach((cat) => {
      list.push({
        id: cat.name,
        label: cat.name,
        icon: getIconForCategory(cat.name)
      });
    });
    return list;
  }, [dynamicCategories]);

  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset visible count when category or search changes
  React.useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery]);

  const { data: resources = [], isLoading } = useGetPublicHrResourcesQuery({
    search: searchQuery,
    category: activeCategory,
  });

  const sortedResources = useMemo(() => {
    let sorted = [...resources];
    if (sortOrder === "Oldest First") {
      sorted.reverse();
    }
    return sorted;
  }, [resources, sortOrder]);

  const handleDownload = (fileUrl: string, title: string) => {
    window.open(getImageUrl(fileUrl), "_blank");
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-[#F8FAFC] py-16 md:py-24 overflow-hidden relative">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-4 bg-secondary rounded-full"></div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  HR & RECRUITMENT
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
                HR <span className="text-secondary">Free Tools</span>
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Download free HR templates, checklists, letters and formats to simplify your HR processes.
              </p>

              {/* Search */}
              <div className="relative mb-10">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all outline-none text-slate-700 text-sm md:text-base"
                  placeholder="Search for templates, checklists, letters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-0.5">100% Free</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">All resources are completely free</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-0.5">Expert Designed</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Created by HR professionals</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-0.5">Instant Download</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Secure and easy downloads</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="relative lg:h-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0 pb-8 lg:pb-0">
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
                {/* Floating circle */}
                <div className="absolute -top-6 -right-2 md:-right-6 w-16 h-16 bg-[#2563eb] rounded-full shadow-lg flex items-center justify-center text-white z-20">
                  <Download className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-6">HR Resources</h3>

                <div className="space-y-4 mb-10">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full w-full"></div>
                    </div>
                  ))}
                </div>

                {/* File format cards floating at the bottom */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  <div className="bg-white rounded-xl shadow-md border border-slate-100 w-16 h-20 flex flex-col items-center justify-center gap-2 transform -rotate-6">
                    <span className="text-[9px] font-bold text-rose-600 uppercase">PDF</span>
                  </div>
                  <div className="bg-white rounded-xl shadow-md border border-slate-100 w-16 h-20 flex flex-col items-center justify-center gap-2 transform -translate-y-4">
                    <span className="text-[9px] font-bold text-blue-600 uppercase">DOCX</span>
                  </div>
                  <div className="bg-white rounded-xl shadow-md border border-slate-100 w-16 h-20 flex flex-col items-center justify-center gap-2 transform rotate-6">
                    <span className="text-[9px] font-bold text-emerald-600 uppercase">XLSX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TABS & CONTENT SECTION */}
      <section className="py-16 bg-[#fcf6f0]/30 min-h-[50vh]">
        <Container>
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-10 overflow-x-auto custom-scrollbar">
            <div className="flex gap-2 min-w-max">
              {categoriesList.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex flex-col items-center justify-center gap-2 py-3 px-5 rounded-lg transition-all min-w-[120px] ${isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? "bg-secondary text-white shadow-md" : "bg-slate-100 text-slate-500"}`}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className={`text-[11px] md:text-xs font-bold ${isActive ? "text-secondary-dark" : ""}`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary">{activeCategory}</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
                Showing {sortedResources.length} resource{sortedResources.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 text-xs md:text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2 outline-none shadow-sm cursor-pointer font-medium"
              >
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-64 animate-pulse">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6 mb-8"></div>
                  <div className="h-9 bg-slate-200 rounded-lg w-full mt-auto"></div>
                </div>
              ))}
            </div>
          ) : sortedResources.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <File className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-sm md:text-base font-bold text-slate-700">No resources found</h3>
              <p className="text-slate-500 text-xs md:text-sm mt-1">Try selecting a different category or change your search query.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedResources.slice(0, visibleCount).map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all flex flex-col group h-full relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/5 rounded-full z-0 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${resource.fileType === 'PDF' ? 'bg-rose-50 text-rose-600' :
                        resource.fileType === 'XLSX' ? 'bg-emerald-50 text-emerald-600' :
                          resource.fileType === 'DOCX' ? 'bg-sky-50 text-sky-600' :
                            'bg-slate-100 text-slate-600'
                        }`}>
                        {resource.fileType === 'PDF' && <FileText className="w-5 h-5" />}
                        {resource.fileType === 'XLSX' && <FileSpreadsheet className="w-5 h-5" />}
                        {resource.fileType === 'DOCX' && <FileText className="w-5 h-5" />}
                        {!['PDF', 'XLSX', 'DOCX'].includes(resource.fileType) && <File className="w-5 h-5" />}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${resource.fileType === 'PDF' ? 'bg-rose-100 text-rose-700' :
                        resource.fileType === 'XLSX' ? 'bg-emerald-100 text-emerald-700' :
                          resource.fileType === 'DOCX' ? 'bg-sky-100 text-sky-700' :
                            'bg-slate-200 text-slate-700'
                        }`}>
                        {resource.fileType}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-primary mb-2 line-clamp-2 relative z-10 group-hover:text-secondary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 line-clamp-3 mb-6 relative z-10 flex-grow font-medium">
                      {resource.description}
                    </p>

                    <button
                      onClick={() => handleDownload(resource.fileUrl, resource.title)}
                      className="w-full py-2.5 rounded-lg bg-primary/5 border border-primary/20 text-primary font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-secondary hover:border-secondary hover:text-white transition-all relative z-10 mt-auto shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              {visibleCount < sortedResources.length && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                  >
                    View More Resources
                  </button>
                </div>
              )}
            </>
          )}

          {/* CTA Banner */}
          <div className="mt-16 bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-primary mb-1">
                  Can&apos;t find what you&apos;re looking for?
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium">
                  Explore more resources or get in touch with our HR experts.
                </p>
              </div>
            </div>
            <a
              href="/contact-us"
              className="w-full md:w-auto whitespace-nowrap px-6 py-2.5 bg-white border border-primary/20 text-primary font-bold text-sm rounded-lg hover:bg-slate-50 hover:border-primary transition-all shadow-sm text-center"
            >
              Talk to Our Experts &rarr;
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

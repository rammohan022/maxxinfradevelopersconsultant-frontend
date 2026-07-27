"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Loader2,
  Globe,
  Code,
  Share2,
  FileText,
  CheckCircle2,
  ArrowRightLeft,
  Bot,
  Layers,
  Save,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import {
  useGetSeoSettingsQuery,
  useCreateSeoMutation,
  useUpdateSeoMutation,
  useDeleteSeoMutation,
  useGetGlobalSeoQuery,
  useUpdateGlobalSeoMutation,
  useGetSeoRedirectsQuery,
  useCreateSeoRedirectMutation,
  useUpdateSeoRedirectMutation,
  useDeleteSeoRedirectMutation,
  SeoSettings,
  SeoRedirect,
} from "@/services/seo";
import DeleteModal from "../components/DeleteModal";
import AdminPagination from "../components/AdminPagination";
import toast from "react-hot-toast";

const PRESET_PAGES = [
  { name: "Global Default (Fallback)", path: "default" },
  { name: "Home Page", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Our Services", path: "/services" },
  { name: "Careers & Jobs", path: "/career" },
  { name: "Submit CV / Resume", path: "/submit-cv" },
  { name: "Our Executive Team", path: "/our-team" },
  { name: "Blog & Articles", path: "/blog" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "Salary Calculator", path: "/salary-calculator" },
  { name: "Gratuity Calculator", path: "/gratuity-calculator" },
  { name: "Attrition Rate Calculator", path: "/attrition-calculator" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
];

export default function AdminSeoPage() {
  const [mainTab, setMainTab] = useState<"pages" | "global" | "redirects" | "robots">("pages");

  /* ================= HOOKS ================= */
  // Page Meta
  const { data: seoList = [], isLoading: isPageLoading } = useGetSeoSettingsQuery();
  const [createSeo, { isLoading: isCreatingPage }] = useCreateSeoMutation();
  const [updateSeo, { isLoading: isUpdatingPage }] = useUpdateSeoMutation();
  const [deleteSeo] = useDeleteSeoMutation();

  // Global Settings
  const { data: globalSeo, isLoading: isGlobalLoading } = useGetGlobalSeoQuery();
  const [updateGlobalSeo, { isLoading: isSavingGlobal }] = useUpdateGlobalSeoMutation();

  // Redirects
  const { data: redirectsList = [], isLoading: isRedirectsLoading } = useGetSeoRedirectsQuery();
  const [createRedirect, { isLoading: isCreatingRedirect }] = useCreateSeoRedirectMutation();
  const [updateRedirect, { isLoading: isUpdatingRedirect }] = useUpdateSeoRedirectMutation();
  const [deleteRedirect] = useDeleteSeoRedirectMutation();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [activeModalTab, setActiveModalTab] = useState<"meta" | "og" | "advanced">("meta");

  // Pagination State for Page Meta
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Page Meta Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "", type: "page" as "page" | "redirect" });
  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    id: "",
    pageName: "",
    pagePath: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    structuredData: "",
    customHeadTags: "",
  });

  // Global Settings Form State
  const [globalForm, setGlobalForm] = useState({
    siteName: "People Consulting",
    siteUrl: "https://peopleconsultings.com",
    gaMeasurementId: "",
    gtmId: "",
    googleSiteVerification: "",
    bingSiteVerification: "",
    facebookPixelId: "",
    twitterHandle: "@peopleconsultco",
    robotsTxtContent: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /login`,
    headScripts: "",
    bodyScripts: "",
  });

  useEffect(() => {
    if (globalSeo) {
      setGlobalForm({
        siteName: globalSeo.siteName || "People Consulting",
        siteUrl: globalSeo.siteUrl || "https://peopleconsultings.com",
        gaMeasurementId: globalSeo.gaMeasurementId || "",
        gtmId: globalSeo.gtmId || "",
        googleSiteVerification: globalSeo.googleSiteVerification || "",
        bingSiteVerification: globalSeo.bingSiteVerification || "",
        facebookPixelId: globalSeo.facebookPixelId || "",
        twitterHandle: globalSeo.twitterHandle || "@peopleconsultco",
        robotsTxtContent: globalSeo.robotsTxtContent || `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /login`,
        headScripts: globalSeo.headScripts || "",
        bodyScripts: globalSeo.bodyScripts || "",
      });
    }
  }, [globalSeo]);

  // Redirect Modal State
  const [redirectModal, setRedirectModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    id: "",
    sourcePath: "",
    targetPath: "",
    statusCode: 301,
    isActive: true,
  });

  /* ================= HANDLERS ================= */
  const handlePageFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModal.pageName.trim() || !formModal.pagePath.trim()) {
      toast.error("Page Name and Page Path are required.");
      return;
    }

    if (formModal.structuredData.trim()) {
      try {
        JSON.parse(formModal.structuredData);
      } catch (err) {
        toast.error("Structured Data (JSON-LD) is not valid JSON.");
        return;
      }
    }

    const payload = {
      pageName: formModal.pageName.trim(),
      pagePath: formModal.pagePath.trim(),
      metaTitle: formModal.metaTitle.trim(),
      metaDescription: formModal.metaDescription.trim(),
      keywords: formModal.keywords.trim(),
      canonicalUrl: formModal.canonicalUrl.trim(),
      ogTitle: formModal.ogTitle.trim(),
      ogDescription: formModal.ogDescription.trim(),
      ogImage: formModal.ogImage.trim(),
      twitterCard: formModal.twitterCard,
      robots: formModal.robots,
      structuredData: formModal.structuredData.trim(),
      customHeadTags: formModal.customHeadTags.trim(),
    };

    try {
      if (formModal.mode === "create") {
        await createSeo(payload).unwrap();
        toast.success("SEO Settings created successfully!");
      } else {
        await updateSeo({ id: formModal.id, data: payload }).unwrap();
        toast.success("SEO Settings updated successfully!");
      }
      setFormModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  const handleGlobalFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateGlobalSeo(globalForm).unwrap();
      toast.success("Global Webmaster & Analytics settings saved!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save global settings.");
    }
  };

  const handleRedirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!redirectModal.sourcePath.trim() || !redirectModal.targetPath.trim()) {
      toast.error("Source and Target paths are required.");
      return;
    }

    try {
      if (redirectModal.mode === "create") {
        await createRedirect({
          sourcePath: redirectModal.sourcePath.trim(),
          targetPath: redirectModal.targetPath.trim(),
          statusCode: Number(redirectModal.statusCode) || 301,
          isActive: redirectModal.isActive,
        }).unwrap();
        toast.success("URL Redirect created successfully!");
      } else {
        await updateRedirect({
          id: redirectModal.id,
          data: {
            sourcePath: redirectModal.sourcePath.trim(),
            targetPath: redirectModal.targetPath.trim(),
            statusCode: Number(redirectModal.statusCode) || 301,
            isActive: redirectModal.isActive,
          },
        }).unwrap();
        toast.success("URL Redirect updated successfully!");
      }
      setRedirectModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save redirect.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteModal.type === "page") {
        await deleteSeo(deleteModal.id).unwrap();
        toast.success("SEO Settings deleted successfully!");
      } else {
        await deleteRedirect(deleteModal.id).unwrap();
        toast.success("Redirect deleted successfully!");
      }
      setDeleteModal({ isOpen: false, id: "", name: "", type: "page" });
    } catch (err) {
      toast.error("Failed to delete item.");
    }
  };

  // Filtered Page Items
  const filteredPages = (seoList || []).filter(
    (item) =>
      (item.pageName || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.pagePath || "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = filteredPages.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)] flex items-center gap-2">
            <Globe className="text-secondary" /> No-Code SEO & Webmaster Suite
          </h1>
          <p className="text-gray-500 text-sm">
            Self-serve SEO control center: Page Meta, Open Graph, GA4/GTM, 301 Redirects, Robots.txt & Sitemap
          </p>
        </div>
      </div>

      {/* Main Suite Tabs */}
      <div className="flex border-b bg-white rounded-t-xl shadow-sm px-4 pt-3 gap-2 overflow-x-auto">
        <button
          onClick={() => setMainTab("pages")}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            mainTab === "pages"
              ? "border-secondary text-secondary bg-blue-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText size={18} /> Page Meta & OpenGraph
        </button>

        <button
          onClick={() => setMainTab("global")}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            mainTab === "global"
              ? "border-secondary text-secondary bg-blue-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck size={18} /> Global Webmaster & Analytics
        </button>

        <button
          onClick={() => setMainTab("redirects")}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            mainTab === "redirects"
              ? "border-secondary text-secondary bg-blue-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <ArrowRightLeft size={18} /> 301/302 URL Redirects
        </button>

        <button
          onClick={() => setMainTab("robots")}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            mainTab === "robots"
              ? "border-secondary text-secondary bg-blue-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bot size={18} /> Robots.txt & Sitemap Status
        </button>
      </div>

      {/* ================= TAB 1: PAGE META ================= */}
      {mainTab === "pages" && (
        <div className="bg-white rounded-b-xl border border-t-0 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search pages..."
                className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setActiveModalTab("meta");
                setFormModal({
                  isOpen: true,
                  mode: "create",
                  id: "",
                  pageName: "",
                  pagePath: "",
                  metaTitle: "",
                  metaDescription: "",
                  keywords: "",
                  canonicalUrl: "",
                  ogTitle: "",
                  ogDescription: "",
                  ogImage: "",
                  twitterCard: "summary_large_image",
                  robots: "index, follow",
                  structuredData: "",
                  customHeadTags: "",
                });
              }}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-bold"
            >
              <Plus size={18} /> Add Page SEO
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b">
                <tr>
                  <th className="p-4 text-left whitespace-nowrap">Page Name & Path</th>
                  <th className="p-4 text-left whitespace-nowrap">Meta Title</th>
                  <th className="p-4 text-left whitespace-nowrap">Meta Description</th>
                  <th className="p-4 text-center whitespace-nowrap">Robots</th>
                  <th className="p-4 text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-10 text-gray-400">
                      No page SEO configurations found.
                    </td>
                  </tr>
                ) : (
                  currentPages.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-[rgb(13_33_55)]">{item.pageName}</div>
                        <div className="text-xs text-secondary font-mono bg-blue-50 px-2 py-0.5 rounded inline-block mt-1">
                          {item.pagePath}
                        </div>
                      </td>
                      <td className="p-4 max-w-xs truncate font-medium text-slate-800">
                        {item.metaTitle || <span className="text-slate-400 italic">Not Set</span>}
                      </td>
                      <td className="p-4 max-w-sm">
                        <div className="line-clamp-2 text-xs text-slate-600">
                          {item.metaDescription || <span className="text-slate-400 italic">Not Set</span>}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          item.robots?.includes('noindex') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                        }`}>
                          {item.robots || 'index, follow'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setActiveModalTab("meta");
                              setFormModal({
                                isOpen: true,
                                mode: "edit",
                                id: item.id,
                                pageName: item.pageName || "",
                                pagePath: item.pagePath || "",
                                metaTitle: item.metaTitle || "",
                                metaDescription: item.metaDescription || "",
                                keywords: item.keywords || "",
                                canonicalUrl: item.canonicalUrl || "",
                                ogTitle: item.ogTitle || "",
                                ogDescription: item.ogDescription || "",
                                ogImage: item.ogImage || "",
                                twitterCard: item.twitterCard || "summary_large_image",
                                robots: item.robots || "index, follow",
                                structuredData: item.structuredData || "",
                                customHeadTags: item.customHeadTags || "",
                              });
                            }}
                            className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: item.id, name: item.pageName, type: "page" })}
                            className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalResults={filteredPages.length}
            indexOfFirst={indexOfFirstItem}
            indexOfLast={indexOfLastItem}
          />
        </div>
      )}

      {/* ================= TAB 2: GLOBAL WEBMASTER & ANALYTICS ================= */}
      {mainTab === "global" && (
        <form onSubmit={handleGlobalFormSubmit} className="bg-white rounded-b-xl border border-t-0 p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site General Info */}
            <div className="space-y-4 p-4 border rounded-xl bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                <Globe size={16} className="text-secondary" /> Website Branding & Domain
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={globalForm.siteName}
                  onChange={(e) => setGlobalForm((p) => ({ ...p, siteName: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Canonical Base Site URL</label>
                <input
                  type="url"
                  value={globalForm.siteUrl}
                  onChange={(e) => setGlobalForm((p) => ({ ...p, siteUrl: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Twitter Handle</label>
                <input
                  type="text"
                  placeholder="@peopleconsultco"
                  value={globalForm.twitterHandle}
                  onChange={(e) => setGlobalForm((p) => ({ ...p, twitterHandle: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
            </div>

            {/* Analytics & Trackers */}
            <div className="space-y-4 p-4 border rounded-xl bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                <Zap size={16} className="text-secondary" /> Analytics & Pixel Trackers
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Analytics 4 (GA4 Measurement ID)</label>
                <input
                  type="text"
                  placeholder="e.g. G-XXXXXXXXXX"
                  value={globalForm.gaMeasurementId}
                  onChange={(e) => setGlobalForm((p) => ({ ...p, gaMeasurementId: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Tag Manager (GTM ID)</label>
                <input
                  type="text"
                  placeholder="e.g. GTM-XXXXXXX"
                  value={globalForm.gtmId}
                  onChange={(e) => setGlobalForm((p) => ({ ...p, gtmId: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Pixel ID</label>
                <input
                  type="text"
                  placeholder="e.g. 1234567890"
                  value={globalForm.facebookPixelId}
                  onChange={(e) => setGlobalForm((p) => ({ ...p, facebookPixelId: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 font-mono text-xs"
                />
              </div>
            </div>

            {/* Webmaster Verifications */}
            <div className="space-y-4 p-4 border rounded-xl bg-slate-50/50 md:col-span-2">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-secondary" /> Webmaster Verification Codes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Search Console Verification Tag Code</label>
                  <input
                    type="text"
                    placeholder="Content string from google-site-verification"
                    value={globalForm.googleSiteVerification}
                    onChange={(e) => setGlobalForm((p) => ({ ...p, googleSiteVerification: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bing Webmaster Verification Code</label>
                  <input
                    type="text"
                    placeholder="Content string from msvalidate.01"
                    value={globalForm.bingSiteVerification}
                    onChange={(e) => setGlobalForm((p) => ({ ...p, bingSiteVerification: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              disabled={isSavingGlobal}
              className="flex items-center gap-2 bg-secondary text-white px-6 py-2.5 rounded-lg hover:bg-secondary-dark transition text-sm font-bold disabled:opacity-75"
            >
              {isSavingGlobal ? <Loader2 size={16} className="animate-spin" /> : <Save size={18} />}
              Save Global Settings
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 3: URL REDIRECTS ================= */}
      {mainTab === "redirects" && (
        <div className="bg-white rounded-b-xl border border-t-0 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">URL Redirects Manager (301 / 302)</h3>
              <p className="text-xs text-slate-500">Redirect deprecated or changed URLs automatically without code edits</p>
            </div>
            <button
              onClick={() => {
                setRedirectModal({
                  isOpen: true,
                  mode: "create",
                  id: "",
                  sourcePath: "",
                  targetPath: "",
                  statusCode: 301,
                  isActive: true,
                });
              }}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-bold"
            >
              <Plus size={18} /> Add Redirect Rule
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b">
                <tr>
                  <th className="p-4 text-left whitespace-nowrap">Source Path</th>
                  <th className="p-4 text-left whitespace-nowrap">Target Path / URL</th>
                  <th className="p-4 text-center whitespace-nowrap">Redirect Code</th>
                  <th className="p-4 text-center whitespace-nowrap">Status</th>
                  <th className="p-4 text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {redirectsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-10 text-gray-400">
                      No URL redirect rules configured.
                    </td>
                  </tr>
                ) : (
                  redirectsList.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-slate-50 transition">
                      <td className="p-4 font-mono text-xs text-red-600 font-semibold">{r.sourcePath}</td>
                      <td className="p-4 font-mono text-xs text-emerald-700 font-semibold">{r.targetPath}</td>
                      <td className="p-4 text-center">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold font-mono">
                          HTTP {r.statusCode || 301}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          r.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {r.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setRedirectModal({
                                isOpen: true,
                                mode: "edit",
                                id: r.id,
                                sourcePath: r.sourcePath,
                                targetPath: r.targetPath,
                                statusCode: r.statusCode || 301,
                                isActive: r.isActive ?? true,
                              });
                            }}
                            className="text-slate-400 hover:text-secondary p-2 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: r.id, name: `${r.sourcePath} -> ${r.targetPath}`, type: "redirect" })}
                            className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: ROBOTS.TXT & SITEMAP ================= */}
      {mainTab === "robots" && (
        <div className="bg-white rounded-b-xl border border-t-0 p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Robots.txt Editor */}
            <form onSubmit={handleGlobalFormSubmit} className="space-y-4 p-5 border rounded-xl bg-slate-50/50">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Bot size={16} className="text-secondary" /> Dynamic Robots.txt Rules
                </h3>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary hover:underline flex items-center gap-1 font-bold"
                >
                  View Live /robots.txt <ExternalLink size={12} />
                </a>
              </div>
              <p className="text-xs text-slate-500">Configure search engine indexing & crawl permissions</p>
              <textarea
                rows={10}
                value={globalForm.robotsTxtContent}
                onChange={(e) => setGlobalForm((p) => ({ ...p, robotsTxtContent: e.target.value }))}
                className="w-full border rounded-lg p-3 text-xs font-mono bg-slate-900 text-emerald-400 outline-none focus:ring-2 focus:ring-secondary/20"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingGlobal}
                  className="flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-lg hover:bg-secondary-dark transition text-xs font-bold"
                >
                  {isSavingGlobal ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Robots.txt
                </button>
              </div>
            </form>

            {/* Sitemap Status */}
            <div className="space-y-4 p-5 border rounded-xl bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                    <Layers size={16} className="text-secondary" /> Live Dynamic XML Sitemap
                  </h3>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary hover:underline flex items-center gap-1 font-bold"
                  >
                    View Live /sitemap.xml <ExternalLink size={12} />
                  </a>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  The website sitemap is dynamically generated in real-time. It automatically indexes all published services, categories, blog posts, and core website pages.
                </p>

                <div className="space-y-3 bg-white p-4 rounded-lg border text-xs text-slate-700">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Endpoint:</span>
                    <span className="font-mono text-secondary">/sitemap.xml</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Status:</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Auto Sync Active
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Format:</span>
                    <span className="font-mono text-slate-500">XML (sitemaps.org standard)</span>
                  </div>
                </div>
              </div>

              {/* AI / LLM Optimization (GEO) Box */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={14} className="text-secondary" /> AI Search Engine Indexing (GEO)
                  </h4>
                  <div className="flex gap-2">
                    <a
                      href="/llms.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:underline flex items-center gap-1 font-bold"
                    >
                      /llms.txt <ExternalLink size={12} />
                    </a>
                    <a
                      href="/llms-full.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:underline flex items-center gap-1 font-bold"
                    >
                      /llms-full.txt <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Optimized for ChatGPT, Perplexity, Google Gemini, Claude & SearchGPT LLM crawlers using markdown schema standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Form Dialog Modal */}
      {formModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
            <div className="flex justify-between items-center border-b p-4 bg-slate-50">
              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  {formModal.mode === "create" ? "Add Page SEO Configuration" : `Edit SEO: ${formModal.pageName}`}
                </h3>
              </div>
              <button
                onClick={() => setFormModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex border-b bg-slate-100/70 px-4 pt-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveModalTab("meta")}
                className={`py-2 px-4 border-b-2 text-xs font-bold transition-all ${
                  activeModalTab === "meta" ? "border-secondary text-secondary bg-white rounded-t-lg" : "text-slate-600"
                }`}
              >
                Basic Meta
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab("og")}
                className={`py-2 px-4 border-b-2 text-xs font-bold transition-all ${
                  activeModalTab === "og" ? "border-secondary text-secondary bg-white rounded-t-lg" : "text-slate-600"
                }`}
              >
                Social / Open Graph
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab("advanced")}
                className={`py-2 px-4 border-b-2 text-xs font-bold transition-all ${
                  activeModalTab === "advanced" ? "border-secondary text-secondary bg-white rounded-t-lg" : "text-slate-600"
                }`}
              >
                Schema & Code
              </button>
            </div>

            <form onSubmit={handlePageFormSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
              {activeModalTab === "meta" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preset Route Selection</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none bg-slate-50"
                      onChange={(e) => {
                        const val = e.target.value;
                        const preset = PRESET_PAGES.find((p) => p.path === val);
                        if (preset) {
                          setFormModal((prev) => ({ ...prev, pageName: preset.name, pagePath: preset.path }));
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>-- Select a standard website page --</option>
                      {PRESET_PAGES.map((p) => (
                        <option key={p.path} value={p.path}>{p.name} ({p.path})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Page Name *</label>
                      <input
                        type="text"
                        value={formModal.pageName}
                        onChange={(e) => setFormModal((prev) => ({ ...prev, pageName: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Page Route Path *</label>
                      <input
                        type="text"
                        value={formModal.pagePath}
                        onChange={(e) => setFormModal((prev) => ({ ...prev, pagePath: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={formModal.metaTitle}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, metaTitle: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={formModal.metaDescription}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, metaDescription: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Meta Keywords</label>
                    <input
                      type="text"
                      value={formModal.keywords}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, keywords: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              {activeModalTab === "og" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">OG Title</label>
                    <input
                      type="text"
                      value={formModal.ogTitle}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, ogTitle: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">OG Description</label>
                    <textarea
                      rows={3}
                      value={formModal.ogDescription}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, ogDescription: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">OG Image URL</label>
                    <input
                      type="text"
                      value={formModal.ogImage}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, ogImage: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              {activeModalTab === "advanced" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Structured Data JSON-LD</label>
                    <textarea
                      rows={6}
                      value={formModal.structuredData}
                      onChange={(e) => setFormModal((prev) => ({ ...prev, structuredData: e.target.value }))}
                      className="w-full border rounded-lg p-3 text-xs font-mono bg-slate-900 text-emerald-400"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setFormModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingPage || isUpdatingPage}
                  className="bg-secondary text-white px-5 py-2 rounded-lg text-sm font-bold"
                >
                  {formModal.mode === "create" ? "Create SEO" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Redirect Form Dialog Modal */}
      {redirectModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-bold text-lg text-slate-800">
                {redirectModal.mode === "create" ? "Add URL Redirect Rule" : "Edit Redirect Rule"}
              </h3>
              <button
                onClick={() => setRedirectModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRedirectSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Source Path (e.g. /old-page) *</label>
                <input
                  type="text"
                  placeholder="/old-service"
                  value={redirectModal.sourcePath}
                  onChange={(e) => setRedirectModal((prev) => ({ ...prev, sourcePath: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Path / URL *</label>
                <input
                  type="text"
                  placeholder="/services/new-service"
                  value={redirectModal.targetPath}
                  onChange={(e) => setRedirectModal((prev) => ({ ...prev, targetPath: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Redirect Code</label>
                  <select
                    value={redirectModal.statusCode}
                    onChange={(e) => setRedirectModal((prev) => ({ ...prev, statusCode: Number(e.target.value) }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value={301}>301 Permanent</option>
                    <option value={302}>302 Temporary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={redirectModal.isActive ? "true" : "false"}
                    onChange={(e) => setRedirectModal((prev) => ({ ...prev, isActive: e.target.value === "true" }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="true font-bold text-green-600">Active</option>
                    <option value="false text-gray-500">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setRedirectModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingRedirect || isUpdatingRedirect}
                  className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Save Redirect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", name: "", type: "page" })}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        itemName={deleteModal.name}
      />
    </div>
  );
}

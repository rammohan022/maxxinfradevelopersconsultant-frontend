"use client";

import { useState, useEffect } from "react";
import { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } from "@/services/siteSettings";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { Save, Globe, Phone, Share2, Sparkles, Key } from "lucide-react";

export default function SiteSettingsPage() {
  const { data: settings, isLoading } = useGetSiteSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSiteSettingsMutation();

  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "ai">("general");

  const [form, setForm] = useState({
    siteName: "",
    contactPhone: "",
    contactEmail: "",
    officeAddress: "",
    workingHours: "",
    logo: "",
  });

  const [aiKeys, setAiKeys] = useState({
    geminiApiKey: "",
    openaiApiKey: "",
    openrouterApiKey: "",
    defaultAiProvider: "gemini",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (settings) {
      setForm({
        siteName: settings.siteName || "People Consulting",
        contactPhone: settings.contactPhone || "",
        contactEmail: settings.contactEmail || "",
        officeAddress: settings.officeAddress || "",
        workingHours: settings.workingHours || "",
        logo: settings.logo || "",
      });
      setAiKeys({
        geminiApiKey: settings.geminiApiKey || "",
        openaiApiKey: settings.openaiApiKey || "",
        openrouterApiKey: settings.openrouterApiKey || "",
        defaultAiProvider: settings.defaultAiProvider || "gemini",
      });
      setSocialLinks({
        facebook: settings.socialLinks?.facebook || "",
        twitter: settings.socialLinks?.twitter || "",
        linkedin: settings.socialLinks?.linkedin || "",
        instagram: settings.socialLinks?.instagram || "",
        youtube: settings.socialLinks?.youtube || "",
        whatsapp: settings.socialLinks?.whatsapp || "",
      });
      if (settings.logo) setPreview(settings.logo);
    }
  }, [settings]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("siteName", form.siteName);
    formData.append("contactPhone", form.contactPhone);
    formData.append("contactEmail", form.contactEmail);
    formData.append("officeAddress", form.officeAddress);
    formData.append("workingHours", form.workingHours);
    formData.append("geminiApiKey", aiKeys.geminiApiKey);
    formData.append("openaiApiKey", aiKeys.openaiApiKey);
    formData.append("openrouterApiKey", aiKeys.openrouterApiKey);
    formData.append("defaultAiProvider", aiKeys.defaultAiProvider);
    formData.append("socialLinks", JSON.stringify(socialLinks));

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      await updateSettings(formData).unwrap();
      toast.success("Site settings & AI Keys updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update site settings.");
    }
  };

  if (isLoading) return <div className="p-4 text-center text-slate-500">Loading settings...</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Site Settings</h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Manage branding, contact info, social links, and AI configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-bold shadow"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === "general"
              ? "border-secondary text-secondary"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Globe size={16} /> General & Logo
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === "contact"
              ? "border-secondary text-secondary"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Phone size={16} /> Contact Details
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === "social"
              ? "border-secondary text-secondary"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Share2 size={16} /> Social Media Links
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === "ai"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Sparkles size={16} className="text-purple-600 animate-pulse" /> 🤖 AI Configuration
        </button>
      </div>

      {/* Content Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border shadow space-y-6">
        {activeTab === "ai" && (
          <div className="space-y-5">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-xs text-purple-800 space-y-1">
              <p className="font-bold text-sm flex items-center gap-1.5 text-purple-900">
                <Sparkles size={16} /> Multi-Provider AI Engine Setup
              </p>
              <p>
                Configure your API Keys for <strong>Google Gemini</strong>, <strong>OpenAI</strong>, or <strong>OpenRouter</strong>.
                AI tools across the portal (Blog Generator, Meta Description, SEO Title, FAQ Generator, Image Alt Text, Content Rewrite, and Grammar Fixer) will use your default provider key automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Key size={14} className="text-purple-600" /> Default AI Provider
                </label>
                <select
                  value={aiKeys.defaultAiProvider}
                  onChange={(e) => setAiKeys({ ...aiKeys, defaultAiProvider: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-xs font-bold bg-white text-slate-800"
                >
                  <option value="gemini">Google Gemini (Recommended / Fast & Free Tier)</option>
                  <option value="openai">OpenAI (GPT-4o-mini)</option>
                  <option value="openrouter">OpenRouter (Universal Router)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={aiKeys.geminiApiKey}
                  onChange={(e) => setAiKeys({ ...aiKeys, geminiApiKey: e.target.value })}
                  placeholder="AIzaSy..."
                  className="w-full border rounded-lg px-3 py-2 text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400">Get key from Google AI Studio (aistudio.google.com)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={aiKeys.openaiApiKey}
                  onChange={(e) => setAiKeys({ ...aiKeys, openaiApiKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full border rounded-lg px-3 py-2 text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400">Get key from OpenAI Platform (platform.openai.com)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  OpenRouter API Key
                </label>
                <input
                  type="password"
                  value={aiKeys.openrouterApiKey}
                  onChange={(e) => setAiKeys({ ...aiKeys, openrouterApiKey: e.target.value })}
                  placeholder="sk-or-..."
                  className="w-full border rounded-lg px-3 py-2 text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400">Get key from OpenRouter Dashboard (openrouter.ai)</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Title / Brand Name</label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website Logo</label>
              <div className="flex items-center gap-4">
                {preview && (
                  <div className="relative w-32 h-16 rounded overflow-hidden border bg-slate-50 p-2 flex items-center justify-center">
                    <Image
                      src={getImageUrl(preview)}
                      alt="Logo preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border rounded-lg px-3 py-1.5 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Working Hours</label>
              <input
                type="text"
                value={form.workingHours}
                onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="e.g. Mon - Fri: 9:00 AM - 6:00 PM"
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Primary Phone Number</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Support Email Address</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Office Address</label>
              <textarea
                rows={3}
                value={form.officeAddress}
                onChange={(e) => setForm({ ...form, officeAddress: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <input
                type="url"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Facebook URL</label>
              <input
                type="url"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Twitter / X URL</label>
              <input
                type="url"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp Contact Number / Link</label>
              <input
                type="text"
                value={socialLinks.whatsapp}
                onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

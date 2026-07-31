"use client";

import { useState, useEffect } from "react";
import { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } from "@/services/siteSettings";
import { Sparkles, Key, Save, Bot, RefreshCw, Wand2, FileText, Search, CheckCircle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import AiModal, { AiToolType } from "@/components/ai/AiModal";

export default function AiSettingsAdminPage() {
  const { data: settings, isLoading } = useGetSiteSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSiteSettingsMutation();

  const [aiKeys, setAiKeys] = useState({
    geminiApiKey: "",
    openaiApiKey: "",
    openrouterApiKey: "",
    defaultAiProvider: "gemini",
  });

  const [testModal, setTestModal] = useState<{
    isOpen: boolean;
    tool: AiToolType;
    input: string;
  }>({ isOpen: false, tool: "blog", input: "" });

  useEffect(() => {
    if (settings) {
      setAiKeys({
        geminiApiKey: settings.geminiApiKey || "",
        openaiApiKey: settings.openaiApiKey || "",
        openrouterApiKey: settings.openrouterApiKey || "",
        defaultAiProvider: settings.defaultAiProvider || "gemini",
      });
    }
  }, [settings]);

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("geminiApiKey", aiKeys.geminiApiKey);
    formData.append("openaiApiKey", aiKeys.openaiApiKey);
    formData.append("openrouterApiKey", aiKeys.openrouterApiKey);
    formData.append("defaultAiProvider", aiKeys.defaultAiProvider);

    try {
      await updateSettings(formData).unwrap();
      toast.success("AI API Keys & Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save AI API Keys.");
    }
  };

  if (isLoading) return <div className="p-6 text-center text-slate-500">Loading AI Settings...</div>;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight flex items-center gap-2">
            <Sparkles className="text-purple-600 animate-pulse" size={24} /> AI Configuration & Keys
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
            Manage API keys for Google Gemini, OpenAI, and OpenRouter for AI content & SEO generation across the website.
          </p>
        </div>
        <button
          onClick={handleSaveKeys}
          disabled={isSaving}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition disabled:opacity-50"
        >
          <Save size={18} /> {isSaving ? "Saving..." : "Save AI Keys"}
        </button>
      </div>

      {/* Main Keys Form */}
      <form onSubmit={handleSaveKeys} className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 text-xs text-purple-900 space-y-2">
          <p className="font-bold text-sm flex items-center gap-2">
            <ShieldCheck size={18} className="text-purple-600" /> Multi-Provider AI Setup Instructions
          </p>
          <p className="leading-relaxed">
            Enter your API keys below. The system automatically connects to your selected <strong>Default AI Provider</strong> and seamlessly falls back to available keys if one provider limit is reached.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Default Provider Selector */}
          <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border">
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Key size={16} className="text-purple-600" /> Primary / Default AI Provider
            </label>
            <select
              value={aiKeys.defaultAiProvider}
              onChange={(e) => setAiKeys({ ...aiKeys, defaultAiProvider: e.target.value })}
              className="w-full border rounded-xl px-3.5 py-2.5 text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="gemini">Google Gemini (Recommended / Fast & Free Tier)</option>
              <option value="openai">OpenAI (GPT-4o-mini)</option>
              <option value="openrouter">OpenRouter (Universal Router)</option>
            </select>
          </div>

          {/* Google Gemini */}
          <div className="space-y-2 border rounded-xl p-4 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Google Gemini API Key
              </label>
              {aiKeys.geminiApiKey ? (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Configured</span>
              ) : (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">Not Set</span>
              )}
            </div>
            <input
              type="password"
              value={aiKeys.geminiApiKey}
              onChange={(e) => setAiKeys({ ...aiKeys, geminiApiKey: e.target.value })}
              placeholder="Paste Google Gemini Key (AIzaSy...)"
              className="w-full border rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <p className="text-[11px] text-slate-500 flex justify-between">
              <span>Free tier available</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 hover:underline font-bold"
              >
                Get Gemini Key →
              </a>
            </p>
          </div>

          {/* OpenAI */}
          <div className="space-y-2 border rounded-xl p-4 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> OpenAI API Key
              </label>
              {aiKeys.openaiApiKey ? (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Configured</span>
              ) : (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">Not Set</span>
              )}
            </div>
            <input
              type="password"
              value={aiKeys.openaiApiKey}
              onChange={(e) => setAiKeys({ ...aiKeys, openaiApiKey: e.target.value })}
              placeholder="Paste OpenAI Key (sk-...)"
              className="w-full border rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <p className="text-[11px] text-slate-500 flex justify-between">
              <span>GPT-4o / ChatGPT API</span>
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 hover:underline font-bold"
              >
                Get OpenAI Key →
              </a>
            </p>
          </div>

          {/* OpenRouter */}
          <div className="space-y-2 border rounded-xl p-4 bg-white shadow-xs md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> OpenRouter API Key
              </label>
              {aiKeys.openrouterApiKey ? (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Configured</span>
              ) : (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">Not Set</span>
              )}
            </div>
            <input
              type="password"
              value={aiKeys.openrouterApiKey}
              onChange={(e) => setAiKeys({ ...aiKeys, openrouterApiKey: e.target.value })}
              placeholder="Paste OpenRouter Key (sk-or-...)"
              className="w-full border rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <p className="text-[11px] text-slate-500 flex justify-between">
              <span>Supports 100+ models</span>
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 hover:underline font-bold"
              >
                Get OpenRouter Key →
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow transition"
          >
            <Save size={16} /> Save AI API Keys
          </button>
        </div>
      </form>

      {/* AI Tools Testing Hub */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Wand2 size={20} className="text-purple-600" /> Test AI Generation Tools
        </h2>
        <p className="text-xs text-slate-500">
          Click any AI tool below to test your API key integration live:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: "blog", title: "AI Blog Generator", desc: "Generate full blog titles, excerpts, & HTML content" },
            { id: "metaDescription", title: "AI Meta Description", desc: "Write 150-char SEO meta descriptions" },
            { id: "seoTitle", title: "AI SEO Title", desc: "Generate click-worthy SEO title tags" },
            { id: "faq", title: "AI FAQ Generator", desc: "Generate Q&A pairs for pages & services" },
            { id: "altText", title: "AI Image Alt Text", desc: "Write accessible SEO alt text for images" },
            { id: "rewrite", title: "AI Content Rewrite", desc: "Rewrite text in professional or engaging tone" },
            { id: "grammar", title: "AI Grammar Fix", desc: "Proofread and fix spelling & grammar" },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setTestModal({ isOpen: true, tool: tool.id as AiToolType, input: "HR & Recruitment Consulting" })}
              className="p-4 rounded-xl border bg-slate-50 hover:bg-purple-50/50 hover:border-purple-300 text-left transition group space-y-1"
            >
              <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700 flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-600" /> {tool.title}
              </span>
              <p className="text-[11px] text-slate-500">{tool.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AiModal
        isOpen={testModal.isOpen}
        onClose={() => setTestModal((prev) => ({ ...prev, isOpen: false }))}
        initialTool={testModal.tool}
        initialInput={testModal.input}
      />
    </div>
  );
}

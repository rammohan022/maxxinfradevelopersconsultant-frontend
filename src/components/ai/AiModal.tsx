"use client";

import { useState } from "react";
import { Sparkles, X, Check, Copy, RefreshCw, Wand2, FileText, Search, Image as ImageIcon, CheckCheck } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGenerateBlogMutation,
  useGenerateMetaDescriptionMutation,
  useGenerateSeoTitleMutation,
  useGenerateFaqsMutation,
  useGenerateAltTextMutation,
  useRewriteContentMutation,
  useFixGrammarMutation,
} from "@/services/ai";

export type AiToolType =
  | "blog"
  | "metaDescription"
  | "seoTitle"
  | "faq"
  | "altText"
  | "rewrite"
  | "grammar";

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTool?: AiToolType;
  initialInput?: string;
  onApply?: (result: any) => void;
}

export default function AiModal({
  isOpen,
  onClose,
  initialTool = "blog",
  initialInput = "",
  onApply,
}: AiModalProps) {
  const [activeTool, setActiveTool] = useState<AiToolType>(initialTool);
  const [inputTopic, setInputTopic] = useState(initialInput);
  const [inputKeywords, setInputKeywords] = useState("");
  const [inputTone, setInputTone] = useState("professional");
  const [output, setOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const [generateBlog, { isLoading: isGeneratingBlog }] = useGenerateBlogMutation();
  const [generateMetaDesc, { isLoading: isGeneratingMeta }] = useGenerateMetaDescriptionMutation();
  const [generateSeoTitle, { isLoading: isGeneratingSeoTitle }] = useGenerateSeoTitleMutation();
  const [generateFaqs, { isLoading: isGeneratingFaqs }] = useGenerateFaqsMutation();
  const [generateAltText, { isLoading: isGeneratingAlt }] = useGenerateAltTextMutation();
  const [rewriteContent, { isLoading: isRewriting }] = useRewriteContentMutation();
  const [fixGrammar, { isLoading: isFixingGrammar }] = useFixGrammarMutation();

  const isLoading =
    isGeneratingBlog ||
    isGeneratingMeta ||
    isGeneratingSeoTitle ||
    isGeneratingFaqs ||
    isGeneratingAlt ||
    isRewriting ||
    isFixingGrammar;

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!inputTopic.trim()) {
      toast.error("Please enter a topic or text content.");
      return;
    }
    setOutput(null);

    try {
      if (activeTool === "blog") {
        const res = await generateBlog({ topic: inputTopic, keywords: inputKeywords }).unwrap();
        setOutput(res);
      } else if (activeTool === "metaDescription") {
        const res = await generateMetaDesc({ title: inputTopic }).unwrap();
        setOutput(res.metaDescription);
      } else if (activeTool === "seoTitle") {
        const res = await generateSeoTitle({ topic: inputTopic }).unwrap();
        setOutput(res.seoTitle);
      } else if (activeTool === "faq") {
        const res = await generateFaqs({ topic: inputTopic }).unwrap();
        setOutput(res.faqs);
      } else if (activeTool === "altText") {
        const res = await generateAltText({ imageContext: inputTopic }).unwrap();
        setOutput(res.altText);
      } else if (activeTool === "rewrite") {
        const res = await rewriteContent({ text: inputTopic, tone: inputTone }).unwrap();
        setOutput(res.rewrittenText);
      } else if (activeTool === "grammar") {
        const res = await fixGrammar({ text: inputTopic }).unwrap();
        setOutput(res.correctedText);
      }
      toast.success("AI Generation Complete!");
    } catch (err: any) {
      console.error(err);
      // baseQuery handles toast error
    }
  };

  const handleCopy = () => {
    const textToCopy = typeof output === "string" ? output : JSON.stringify(output, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (onApply && output) {
      onApply(output);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 border max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-lg">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Sparkles size={20} className="text-purple-600 animate-spin-slow" />
            </div>
            <span>AI Content & SEO Assistant 🤖</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tools Switcher Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-3">
          {[
            { id: "blog", label: "Blog Generator", icon: FileText },
            { id: "metaDescription", label: "Meta Description", icon: Search },
            { id: "seoTitle", label: "SEO Title", icon: Wand2 },
            { id: "faq", label: "FAQ Generator", icon: RefreshCw },
            { id: "altText", label: "Image Alt Text", icon: ImageIcon },
            { id: "rewrite", label: "Rewrite Content", icon: RefreshCw },
            { id: "grammar", label: "Grammar Fix", icon: CheckCheck },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTool(t.id as AiToolType);
                  setOutput(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  active
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {activeTool === "blog" && "Blog Topic / Main Keyword"}
              {activeTool === "metaDescription" && "Page Title / Topic"}
              {activeTool === "seoTitle" && "Topic / Target Keyword"}
              {activeTool === "faq" && "Service / Topic Name"}
              {activeTool === "altText" && "Image Description / Subject"}
              {activeTool === "rewrite" && "Text to Rewrite"}
              {activeTool === "grammar" && "Text to Proofread & Fix"}
            </label>
            {activeTool === "rewrite" || activeTool === "grammar" ? (
              <textarea
                rows={4}
                value={inputTopic}
                onChange={(e) => setInputTopic(e.target.value)}
                placeholder="Paste your text here..."
                className="w-full border rounded-xl p-3 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
              />
            ) : (
              <input
                type="text"
                value={inputTopic}
                onChange={(e) => setInputTopic(e.target.value)}
                placeholder="e.g. HR Compliance Services in India"
                className="w-full border rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-purple-500 outline-none"
              />
            )}
          </div>

          {activeTool === "blog" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Optional Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={inputKeywords}
                onChange={(e) => setInputKeywords(e.target.value)}
                placeholder="e.g. HR Consulting, Talent Acquisition, Labor Law"
                className="w-full border rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          )}

          {activeTool === "rewrite" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Tone</label>
              <select
                value={inputTone}
                onChange={(e) => setInputTone(e.target.value)}
                className="w-full border rounded-xl px-3 py-2 text-xs font-medium bg-white"
              >
                <option value="professional">Professional & Corporate</option>
                <option value="engaging">Engaging & Persuasive</option>
                <option value="concise">Concise & Direct</option>
                <option value="friendly">Friendly & Warm</option>
              </select>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Generating with AI...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Generate Output
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        {output && (
          <div className="space-y-3 bg-purple-50/60 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-600" /> AI Result
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 px-3 py-1 rounded-lg text-xs font-bold shadow-sm"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                {onApply && (
                  <button
                    onClick={handleApply}
                    className="flex items-center gap-1 bg-secondary text-white hover:bg-secondary-dark px-3 py-1 rounded-lg text-xs font-bold shadow"
                  >
                    <Check size={14} /> Apply to Form
                  </button>
                )}
              </div>
            </div>

            {typeof output === "string" ? (
              <div className="bg-white p-3 rounded-lg border text-xs text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            ) : activeTool === "blog" ? (
              <div className="bg-white p-4 rounded-lg border text-xs space-y-3 max-h-60 overflow-y-auto">
                <div>
                  <span className="font-bold text-slate-900">Title:</span> {output.title}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Excerpt:</span> {output.excerpt}
                </div>
                <div className="border-t pt-2">
                  <span className="font-bold text-slate-900 block mb-1">Content Preview:</span>
                  <div className="prose prose-xs text-slate-700" dangerouslySetInnerHTML={{ __html: output.content }} />
                </div>
              </div>
            ) : activeTool === "faq" && Array.isArray(output) ? (
              <div className="bg-white p-3 rounded-lg border text-xs space-y-2 max-h-60 overflow-y-auto">
                {output.map((faq: any, idx: number) => (
                  <div key={idx} className="border-b pb-2 last:border-b-0">
                    <p className="font-bold text-slate-900">Q: {faq.question}</p>
                    <p className="text-slate-600 mt-0.5">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="bg-white p-3 rounded-lg border text-xs text-slate-800 font-mono max-h-60 overflow-y-auto">
                {JSON.stringify(output, null, 2)}
              </pre>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

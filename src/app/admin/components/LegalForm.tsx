"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import RichTextEditor from "./RichTextEditor";

import { showSuccess, showError } from "@/lib/utils/toast";

interface LegalFormProps {
    initialData?: any;
    isEdit?: boolean;
    type: "privacy" | "terms";
    onSave: (data: any) => Promise<any>;
    isLoading: boolean;
}

export default function LegalForm({
    initialData,
    isEdit = false,
    type,
    onSave,
    isLoading,
}: LegalFormProps) {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        content: "",
        status: "Draft" as "Draft" | "Published",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                content: initialData.content || "",
                status: initialData.status || "Draft",
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSave(form);
            showSuccess(`${type === "privacy" ? "Privacy Policy" : "Terms & Conditions"} saved successfully!`);
            router.push(`/admin/${type === "privacy" ? "privacy-policy" : "terms-conditions"}`);
        } catch (err) {
            console.error("Save failed:", err);
            showError(err, "Failed to save document.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-3 rounded-xl border shadow space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Document Title</label>
                    <input
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter document title (e.g. Terms & Conditions)"
                        className="w-full border rounded-lg px-3 py-2 h-10 focus:ring-1 focus:ring-secondary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 h-10 focus:ring-1 focus:ring-secondary outline-none bg-white"
                    >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <div className="mb-6">
                    <RichTextEditor
                        value={form.content}
                        onChange={(val) => setForm(p => ({ ...p, content: val }))}
                        placeholder="Write legal policy content here..."
                        minHeight="350px"
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-3 py-2 border rounded-xl hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-2 bg-secondary text-white rounded-xl hover:bg-secondary-dark disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : (isEdit ? "Update Document" : "Save Document")}
                </button>
            </div>
        </form>
    );
}

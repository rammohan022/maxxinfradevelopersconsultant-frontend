"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useCreatePracticeAreaMutation, useUpdatePracticeAreaMutation } from "@/services/practice-area";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface PracticeAreaFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function PracticeAreaForm({
    initialData,
    isEdit = false,
}: PracticeAreaFormProps) {
    const router = useRouter();
    const [createPracticeArea, { isLoading: isCreating }] = useCreatePracticeAreaMutation();
    const [updatePracticeArea, { isLoading: isUpdating }] = useUpdatePracticeAreaMutation();

    const [form, setForm] = useState({
        title: "",
        slug: "",
        innerImage: "",
        overview: "",
        approach: "",
        quoteText: "",
        quoteAuthor: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const [services, setServices] = useState<string[]>([""]);
    const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                slug: initialData.slug || "",
                innerImage: initialData.innerImage || "",
                overview: initialData.overview || "",
                approach: initialData.approach || "",
                quoteText: initialData.quoteText || "",
                quoteAuthor: initialData.quoteAuthor || "",
            });
            setServices(initialData.services || [""]);

            // Defensive FAQ handling for potential backend inconsistency
            const initialFaqs = Array.isArray(initialData.faqs)
                ? initialData.faqs.map((f: any) => ({
                    question: typeof f === 'object' ? (f.question || "") : "",
                    answer: typeof f === 'object' ? (f.answer || "") : ""
                })).filter((f: any) => f.question || f.answer)
                : [];

            setFaqs(initialFaqs.length > 0 ? initialFaqs : [{ question: "", answer: "" }]);
            if (initialData.innerImage) {
                setPreview(initialData.innerImage);
            }
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addService = () => setServices([...services, ""]);
    const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));

    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("slug", form.slug);
        formData.append("overview", form.overview);
        formData.append("approach", form.approach);
        formData.append("quoteText", form.quoteText);
        formData.append("quoteAuthor", form.quoteAuthor);
        formData.append("services", JSON.stringify(services.filter((s) => s.trim() !== "")));
        formData.append("faqs", JSON.stringify(faqs.filter((f) => f.question.trim() && f.answer.trim())));

        if (imageFile) {
            formData.append("innerImage", imageFile);
        }

        try {
            if (isEdit && initialData?.id) {
                await updatePracticeArea({ id: initialData.id, data: formData }).unwrap();
                toast.success("Practice area updated successfully!");
            } else {
                await createPracticeArea(formData).unwrap();
                toast.success("Practice area created successfully!");
            }
            router.push("/admin/practice-area");
        } catch (err) {
            console.error("Failed to save practice area:", err);
            toast.error("Failed to save practice area.");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow space-y-8">
            {/* Hero */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Hero Section</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input name="title" required value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input name="slug" required value={form.slug} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Inner Image</label>
                    <div className="flex items-center gap-4">
                        {preview && (
                            <div className="relative w-16 h-16 rounded overflow-hidden border flex-shrink-0">
                                <Image
                                    src={getImageUrl(preview)}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary outline-none text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Overview</h2>
                <div className="mb-12">
                    <ReactQuill theme="snow" value={form.overview} onChange={(val) => setForm(p => ({ ...p, overview: val }))} className="bg-white h-[200px]" />
                </div>
            </section>

            {/* Services */}
            <section className="space-y-4 pt-8">
                <h2 className="text-lg font-semibold border-b pb-2">Key Areas of Service</h2>
                {services.map((item, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            value={item}
                            onChange={(e) => {
                                const copy = [...services];
                                copy[i] = e.target.value;
                                setServices(copy);
                            }}
                            placeholder={`Service ${i + 1}`}
                            className="flex-1 border rounded-lg px-3 py-2"
                        />
                        <button type="button" onClick={() => removeService(i)} className="text-red-500 text-sm">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addService} className="text-sm text-primary font-medium hover:underline">+ Add Service</button>
            </section>

            {/* Approach */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Our Approach</h2>
                <textarea name="approach" rows={3} value={form.approach} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
            </section>

            {/* Quote */}
            <section className="space-y-4 text-sm">
                <h2 className="text-lg font-semibold border-b pb-2 text-base">Client Quote</h2>
                <textarea name="quoteText" rows={2} value={form.quoteText} onChange={handleChange} placeholder="Quote text..." className="w-full border rounded-lg px-3 py-2" />
                <input name="quoteAuthor" value={form.quoteAuthor} onChange={handleChange} placeholder="Author name & designation" className="w-full border rounded-lg px-3 py-2 mt-2" />
            </section>

            {/* FAQs */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">FAQs</h2>
                {faqs.map((faq, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-slate-50 space-y-2 relative">
                        <button type="button" onClick={() => removeFaq(i)} className="absolute top-2 right-2 text-red-500 text-xs">Remove</button>
                        <input
                            value={faq.question}
                            onChange={(e) => {
                                const copy = [...faqs];
                                copy[i].question = e.target.value;
                                setFaqs(copy);
                            }}
                            placeholder="Question"
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                        />
                        <textarea
                            value={faq.answer}
                            onChange={(e) => {
                                const copy = [...faqs];
                                copy[i].answer = e.target.value;
                                setFaqs(copy);
                            }}
                            rows={2}
                            placeholder="Answer"
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                        />
                    </div>
                ))}
                <button type="button" onClick={addFaq} className="text-sm text-primary font-medium hover:underline">+ Add FAQ</button>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 justify-end">
                <button type="button" onClick={() => router.push("/admin/practice-area")} className="px-6 py-2 border rounded-xl hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-10 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50">
                    {isLoading ? "Saving..." : (isEdit ? "Update" : "Save")}
                </button>
            </div>
        </form>
    );
}

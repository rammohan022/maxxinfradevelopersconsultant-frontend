"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useCreateServiceMutation, useUpdateServiceMutation } from "@/services/services";
import { useGetServiceCategoriesQuery } from "@/services/serviceCategory";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ServiceFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ServiceForm({
    initialData,
    isEdit = false,
}: ServiceFormProps) {
    const router = useRouter();
    const { data: categories = [] } = useGetServiceCategoriesQuery();
    const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
    const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

    const [form, setForm] = useState({
        title: "",
        slug: "",
        category: "",
        status: "Published",
        position: "",
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
                category: initialData.category || "",
                status: initialData.status || "Published",
                position: initialData.position !== undefined ? initialData.position.toString() : "0",
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

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            if (name === "title" && !isEdit) {
                next.slug = slugify(value);
            }
            return next;
        });
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
        formData.append("category", form.category);
        formData.append("status", form.status);
        formData.append("position", form.position || "0");
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
                await updateService({ id: initialData.id, data: formData }).unwrap();
                toast.success("Service updated successfully!");
            } else {
                await createService(formData).unwrap();
                toast.success("Service created successfully!");
            }
            router.push("/admin/services");
        } catch (err) {
            console.error("Failed to save service:", err);
            toast.error("Failed to save service.");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow space-y-5">
            {/* Hero */}
            <section className="space-y-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">Hero Section</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input name="title" required value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input name="slug" required value={form.slug} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                        >
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Position (Order)</label>
                        <input type="number" name="position" value={form.position} onChange={handleChange} placeholder="e.g. 1" className="w-full border rounded-lg px-3 py-2 text-sm" />
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
                            className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-secondary outline-none text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                        />
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="space-y-4 pb-10 border-b">
                <h2 className="text-lg font-bold text-slate-800">Overview</h2>
                <div className="h-[200px]">
                    <ReactQuill theme="snow" value={form.overview} onChange={(val) => setForm(p => ({ ...p, overview: val }))} className="bg-white h-[150px]" />
                </div>
            </section>

            {/* Services */}
            <section className="space-y-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">Key Areas of Service</h2>
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
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                        />
                        <button type="button" onClick={() => removeService(i)} className="text-red-500 text-sm hover:underline">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addService} className="text-sm text-secondary font-medium hover:underline">+ Add Service</button>
            </section>

            {/* Approach */}
            <section className="space-y-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">Our Approach</h2>
                <textarea name="approach" rows={3} value={form.approach} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </section>

            {/* Quote */}
            <section className="space-y-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">Client Quote</h2>
                <textarea name="quoteText" rows={2} value={form.quoteText} onChange={handleChange} placeholder="Quote text..." className="w-full border rounded-lg px-3 py-2 text-sm" />
                <input name="quoteAuthor" value={form.quoteAuthor} onChange={handleChange} placeholder="Author name & designation" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </section>

            {/* FAQs */}
            <section className="space-y-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">FAQs</h2>
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
                            className="w-full border rounded-lg px-3 py-2 bg-white text-sm"
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
                            className="w-full border rounded-lg px-3 py-2 bg-white text-sm"
                        />
                    </div>
                ))}
                <button type="button" onClick={addFaq} className="text-sm text-secondary font-medium hover:underline">+ Add FAQ</button>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 justify-end">
                <button type="button" onClick={() => router.push("/admin/services")} className="px-4 py-2 border rounded-xl hover:bg-slate-50 text-sm">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-10 py-2 bg-secondary text-white rounded-xl hover:bg-secondary-dark disabled:opacity-50 text-sm font-semibold">
                    {isLoading ? "Saving..." : (isEdit ? "Update" : "Save")}
                </button>
            </div>
        </form>
    );
}

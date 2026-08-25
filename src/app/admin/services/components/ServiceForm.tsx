"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useCreateServiceMutation, useUpdateServiceMutation } from "@/services/services";
import { useGetServiceCategoriesQuery } from "@/services/serviceCategory";
import toast from "react-hot-toast";
import Image from "next/image";
import { getErrorMessage } from "@/lib/utils/apiUtils";
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
        whyTitle: "",
        benefitsTitle: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const [contentImageFile, setContentImageFile] = useState<File | null>(null);
    const [contentImagePreview, setContentImagePreview] = useState<string>("");

    const [serviceCards, setServiceCards] = useState<Array<{ title: string; description?: string; items: string[] }>>([
        { title: "", description: "", items: [""] }
    ]);
    const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

    const [whyFeatures, setWhyFeatures] = useState<Array<{ title: string; description: string }>>([
        { title: "", description: "" }
    ]);
    const [benefitsCards, setBenefitsCards] = useState<Array<{ title: string; subtitle?: string; items: string[]; image?: string }>>([
        { title: "", subtitle: "", items: [""] },
        { title: "", subtitle: "", items: [""] }
    ]);

    const [benefitsImage0File, setBenefitsImage0File] = useState<File | null>(null);
    const [benefitsImage0Preview, setBenefitsImage0Preview] = useState<string>("");
    const [benefitsImage1File, setBenefitsImage1File] = useState<File | null>(null);
    const [benefitsImage1Preview, setBenefitsImage1Preview] = useState<string>("");

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
                whyTitle: initialData.whyTitle || "",
                benefitsTitle: initialData.benefitsTitle || "",
            });
            if (initialData.services) {
                const parsed = Array.isArray(initialData.services)
                    ? initialData.services.map((s: any) => {
                        if (s && typeof s === 'object' && s.title !== undefined) {
                            return {
                                title: s.title || "",
                                description: s.description || "",
                                items: Array.isArray(s.items) ? s.items.map(String) : [],
                            };
                        }
                        return {
                            title: "",
                            description: "",
                            items: [String(s)],
                        };
                    })
                    : [{ title: "", description: "", items: [""] }];
                setServiceCards(parsed.length > 0 ? parsed : [{ title: "", description: "", items: [""] }]);
            }

            if (initialData.whyFeatures) {
                const parsedWhy = Array.isArray(initialData.whyFeatures)
                    ? initialData.whyFeatures.map((wf: any) => ({
                        title: wf.title || "",
                        description: wf.description || "",
                    }))
                    : [{ title: "", description: "" }];
                setWhyFeatures(parsedWhy.length > 0 ? parsedWhy : [{ title: "", description: "" }]);
            } else {
                setWhyFeatures([{ title: "", description: "" }]);
            }

            if (initialData.benefitsCards) {
                const parsedBenefits = Array.isArray(initialData.benefitsCards)
                    ? initialData.benefitsCards.map((bc: any) => ({
                        title: bc.title || "",
                        subtitle: bc.subtitle || "",
                        items: Array.isArray(bc.items) ? bc.items.map(String) : [],
                        image: bc.image || "",
                    }))
                    : [
                        { title: "", subtitle: "", items: [""] },
                        { title: "", subtitle: "", items: [""] }
                      ];
                while (parsedBenefits.length < 2) {
                    parsedBenefits.push({ title: "", subtitle: "", items: [""] });
                }
                setBenefitsCards(parsedBenefits);
                if (parsedBenefits[0]?.image) setBenefitsImage0Preview(parsedBenefits[0].image);
                if (parsedBenefits[1]?.image) setBenefitsImage1Preview(parsedBenefits[1].image);
            } else {
                setBenefitsCards([
                    { title: "", subtitle: "", items: [""] },
                    { title: "", subtitle: "", items: [""] }
                ]);
            }

            // Defensive FAQ handling for potential backend inconsistency
            const initialFaqs = Array.isArray(initialData.faqs)
                ? initialData.faqs.map((f: any) => ({
                    question: typeof f === 'object' ? (f.question || "") : "",
                    answer: typeof f === 'object' ? (f.answer || "") :
                    ""
                })).filter((f: any) => f.question || f.answer)
                : [];

            setFaqs(initialFaqs.length > 0 ? initialFaqs : [{ question: "", answer: "" }]);
            if (initialData.innerImage) {
                setPreview(initialData.innerImage);
            }
            if (initialData.contentImage) {
                setContentImagePreview(initialData.contentImage);
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

    const addServiceCard = () => setServiceCards([...serviceCards, { title: "", description: "", items: [""] }]);
    const removeServiceCard = (index: number) => setServiceCards(serviceCards.filter((_, i) => i !== index));

    const addWhyFeature = () => setWhyFeatures([...whyFeatures, { title: "", description: "" }]);
    const removeWhyFeature = (index: number) => setWhyFeatures(whyFeatures.filter((_, i) => i !== index));

    const handleBenefitsCardChange = (cardIndex: number, field: string, value: any) => {
        const copy = [...benefitsCards];
        copy[cardIndex] = { ...copy[cardIndex], [field]: value };
        setBenefitsCards(copy);
    };

    const handleBenefitsCardItemChange = (cardIndex: number, itemIndex: number, value: string) => {
        const copy = [...benefitsCards];
        const newItems = [...copy[cardIndex].items];
        newItems[itemIndex] = value;
        copy[cardIndex].items = newItems;
        setBenefitsCards(copy);
    };

    const addBenefitsCardItem = (cardIndex: number) => {
        const copy = [...benefitsCards];
        copy[cardIndex].items = [...copy[cardIndex].items, ""];
        setBenefitsCards(copy);
    };

    const removeBenefitsCardItem = (cardIndex: number, itemIndex: number) => {
        const copy = [...benefitsCards];
        copy[cardIndex].items = copy[cardIndex].items.filter((_, i) => i !== itemIndex);
        setBenefitsCards(copy);
    };

    const handleBenefitsImage0Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image size must be less than 10MB");
                return;
            }
            setBenefitsImage0File(file);
            setBenefitsImage0Preview(URL.createObjectURL(file));
        }
    };

    const handleBenefitsImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image size must be less than 10MB");
                return;
            }
            setBenefitsImage1File(file);
            setBenefitsImage1Preview(URL.createObjectURL(file));
        }
    };

    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image size must be less than 10MB");
                return;
            }
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Content Image size must be less than 10MB");
                return;
            }
            setContentImageFile(file);
            setContentImagePreview(URL.createObjectURL(file));
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
        formData.append("whyTitle", form.whyTitle);
        formData.append("benefitsTitle", form.benefitsTitle);

        const filteredServices = serviceCards
            .map(card => ({
                title: card.title.trim(),
                description: card.description?.trim() || "",
                items: card.items.map(item => item.trim()).filter(item => item !== "")
            }))
            .filter(card => card.title !== "" || card.description !== "" || card.items.length > 0);
        formData.append("services", JSON.stringify(filteredServices));
        
        const filteredWhyFeatures = whyFeatures
            .map(f => ({
                title: f.title.trim(),
                description: f.description.trim()
            }))
            .filter(f => f.title !== "" || f.description !== "");
        formData.append("whyFeatures", JSON.stringify(filteredWhyFeatures));

        const filteredBenefitsCards = benefitsCards
            .map((card, idx) => ({
                title: card.title.trim(),
                subtitle: card.subtitle?.trim() || "",
                items: card.items.map(item => item.trim()).filter(item => item !== ""),
                image: card.image || ""
            }))
            .filter(card => card.title !== "" || card.subtitle !== "" || card.items.length > 0);
        formData.append("benefitsCards", JSON.stringify(filteredBenefitsCards));

        formData.append("faqs", JSON.stringify(faqs.filter((f) => f.question.trim() && f.answer.trim())));

        if (imageFile) {
            formData.append("innerImage", imageFile);
        }
        if (contentImageFile) {
            formData.append("contentImage", contentImageFile);
        }
        if (benefitsImage0File) {
            formData.append("benefitsImage0", benefitsImage0File);
        }
        if (benefitsImage1File) {
            formData.append("benefitsImage1", benefitsImage1File);
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
            toast.error(getErrorMessage(err));
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
                    <label className="block text-sm font-medium mb-1">Hero Background Image (Inner Image)</label>
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
                    <div className="flex flex-col gap-0.5 mt-1 ml-[5rem]">
                        <p className="text-[10px] text-slate-500 font-medium">Supported formats: JPG, PNG, WebP</p>
                        <p className="text-[10px] text-slate-500 font-medium">Maximum file size: 10MB</p>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="space-y-4 pb-10 border-b">
                <h2 className="text-lg font-bold text-slate-800">Overview & Content Image</h2>
                <div className="h-[200px] mb-6">
                    <ReactQuill theme="snow" value={form.overview} onChange={(val) => setForm(p => ({ ...p, overview: val }))} className="bg-white h-[150px]" />
                </div>
                <div className="pt-8">
                    <label className="block text-sm font-medium mb-1 text-slate-700">Overview Bottom Image (Content Image)</label>
                    <p className="text-xs text-slate-500 mb-2">Displays right below the Overview section on the Service detail page.</p>
                    <div className="flex items-center gap-4">
                        {contentImagePreview && (
                            <div className="relative w-20 h-16 rounded overflow-hidden border flex-shrink-0">
                                <Image
                                    src={getImageUrl(contentImagePreview)}
                                    alt="Content Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleContentFileChange}
                            className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-secondary outline-none text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 mt-1 ml-[6rem]">
                        <p className="text-[10px] text-slate-500 font-medium">Supported formats: JPG, PNG, WebP</p>
                        <p className="text-[10px] text-slate-500 font-medium">Maximum file size: 10MB</p>
                    </div>
                </div>
            </section>

            {/* Key Areas of Service (Cards Layout) */}
            <section className="space-y-6 pb-6 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">Key Areas of Service (Cards Layout)</h2>
                    <button type="button" onClick={addServiceCard} className="text-sm text-secondary font-semibold hover:underline">+ Add Card</button>
                </div>
                
                <div className="space-y-4">
                    {serviceCards.map((card, cardIndex) => (
                        <div key={cardIndex} className="p-4 border rounded-xl bg-slate-50 space-y-3 relative group">
                            <button 
                                type="button" 
                                onClick={() => removeServiceCard(cardIndex)} 
                                className="absolute top-3 right-3 text-red-500 text-xs hover:underline"
                            >
                                Remove Card
                            </button>
                            
                            <div className="max-w-md">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Title</label>
                                <input
                                    value={card.title}
                                    onChange={(e) => {
                                        const copy = [...serviceCards];
                                        copy[cardIndex].title = e.target.value;
                                        setServiceCards(copy);
                                    }}
                                    placeholder="e.g. Talent Acquisition"
                                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white font-semibold"
                                />
                            </div>
                            
                            <div className="max-w-md">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Description (Simple Paragraph - Optional)</label>
                                <textarea
                                    value={card.description || ""}
                                    onChange={(e) => {
                                        const copy = [...serviceCards];
                                        copy[cardIndex].description = e.target.value;
                                        setServiceCards(copy);
                                    }}
                                    placeholder="Enter a brief paragraph describing this service..."
                                    rows={2}
                                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white resize-none"
                                    maxLength={1000}
                                />
                                <p className="text-[10px] text-slate-500 mt-1 flex justify-between">
                                    <span>Max 1000 characters.</span>
                                    <span>{(card.description || "").length}/1000</span>
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase">Items / Bullet Points</label>
                                {card.items.map((bullet, bulletIndex) => (
                                    <div key={bulletIndex} className="flex gap-2 items-center">
                                        <input
                                            value={bullet}
                                            onChange={(e) => {
                                                const copy = [...serviceCards];
                                                copy[cardIndex].items[bulletIndex] = e.target.value;
                                                setServiceCards(copy);
                                            }}
                                            placeholder={`Bullet point ${bulletIndex + 1}`}
                                            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                const copy = [...serviceCards];
                                                copy[cardIndex].items = copy[cardIndex].items.filter((_, bi) => bi !== bulletIndex);
                                                setServiceCards(copy);
                                            }} 
                                            className="text-red-500 text-xs hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        const copy = [...serviceCards];
                                        copy[cardIndex].items.push("");
                                        setServiceCards(copy);
                                    }} 
                                    className="text-xs text-secondary font-semibold hover:underline"
                                >
                                    + Add Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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

            {/* Why Choose Section (6 Grid Features) */}
            <section className="space-y-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">Why Choose Section (Grid Features)</h2>
                <div>
                    <label className="block text-sm font-medium mb-1">Section Title</label>
                    <input
                        name="whyTitle"
                        value={form.whyTitle}
                        onChange={handleChange}
                        placeholder="e.g. Why AddettoHR HRMS?"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Features</label>
                        <button type="button" onClick={addWhyFeature} className="text-xs text-secondary font-semibold hover:underline">+ Add Feature</button>
                    </div>
                    {whyFeatures.map((feat, idx) => (
                        <div key={idx} className="p-3 border rounded-lg bg-slate-50 relative space-y-2">
                            <button type="button" onClick={() => removeWhyFeature(idx)} className="absolute top-2 right-2 text-red-500 text-xs">Remove</button>
                            <input
                                value={feat.title}
                                onChange={(e) => {
                                    const copy = [...whyFeatures];
                                    copy[idx].title = e.target.value;
                                    setWhyFeatures(copy);
                                }}
                                placeholder={`Feature Title ${idx + 1} (e.g. All-in-One Platform)`}
                                className="w-full border rounded-lg px-3 py-1.5 bg-white text-sm font-semibold"
                            />
                            <textarea
                                value={feat.description}
                                onChange={(e) => {
                                    const copy = [...whyFeatures];
                                    copy[idx].description = e.target.value;
                                    setWhyFeatures(copy);
                                }}
                                placeholder="Feature Description (e.g. Manage all HR functions from a single, unified platform.)"
                                rows={2}
                                className="w-full border rounded-lg px-3 py-1.5 bg-white text-sm resize-none"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section (Mockups Cards) */}
            <section className="space-y-6 pb-6 border-b">
                <h2 className="text-lg font-bold text-slate-800">Benefits Section (Mockups Cards)</h2>
                <div>
                    <label className="block text-sm font-medium mb-1">Section Main Title (Optional)</label>
                    <input
                        name="benefitsTitle"
                        value={form.benefitsTitle}
                        onChange={handleChange}
                        placeholder="e.g. AddettoHR Solutions"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
                        <h3 className="text-sm font-bold text-slate-700 border-b pb-1">Benefits Card 1</h3>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                            <input
                                value={benefitsCards[0]?.title || ""}
                                onChange={(e) => handleBenefitsCardChange(0, "title", e.target.value)}
                                placeholder="e.g. AddettoHR Analytics"
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtitle</label>
                            <input
                                value={benefitsCards[0]?.subtitle || ""}
                                onChange={(e) => handleBenefitsCardChange(0, "subtitle", e.target.value)}
                                placeholder="e.g. Turn HR Data into Actionable Insights"
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase">Bullet Points</label>
                            {(benefitsCards[0]?.items || []).map((item, itemIdx) => (
                                <div key={itemIdx} className="flex gap-2 items-center">
                                    <input
                                        value={item}
                                        onChange={(e) => handleBenefitsCardItemChange(0, itemIdx, e.target.value)}
                                        placeholder={`Bullet point ${itemIdx + 1}`}
                                        className="w-full border rounded-lg px-3 py-1.5 text-sm bg-white"
                                    />
                                    <button type="button" onClick={() => removeBenefitsCardItem(0, itemIdx)} className="text-red-500 text-xs hover:underline">Delete</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addBenefitsCardItem(0)} className="text-xs text-secondary font-semibold hover:underline">+ Add Bullet Point</button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Mockup Image</label>
                            <div className="flex items-center gap-3">
                                {benefitsImage0Preview && (
                                    <div className="relative w-16 h-12 rounded overflow-hidden border flex-shrink-0 bg-white">
                                        <Image
                                            src={getImageUrl(benefitsImage0Preview)}
                                            alt="Card 1 Preview"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBenefitsImage0Change}
                                    className="w-full border rounded-lg px-2 py-1 text-xs bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
                        <h3 className="text-sm font-bold text-slate-700 border-b pb-1">Benefits Card 2</h3>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                            <input
                                value={benefitsCards[1]?.title || ""}
                                onChange={(e) => handleBenefitsCardChange(1, "title", e.target.value)}
                                placeholder="e.g. AddettoHR Mobile App"
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtitle</label>
                            <input
                                value={benefitsCards[1]?.subtitle || ""}
                                onChange={(e) => handleBenefitsCardChange(1, "subtitle", e.target.value)}
                                placeholder="e.g. HR at Your Fingertips"
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase">Bullet Points</label>
                            {(benefitsCards[1]?.items || []).map((item, itemIdx) => (
                                <div key={itemIdx} className="flex gap-2 items-center">
                                    <input
                                        value={item}
                                        onChange={(e) => handleBenefitsCardItemChange(1, itemIdx, e.target.value)}
                                        placeholder={`Bullet point ${itemIdx + 1}`}
                                        className="w-full border rounded-lg px-3 py-1.5 text-sm bg-white"
                                    />
                                    <button type="button" onClick={() => removeBenefitsCardItem(1, itemIdx)} className="text-red-500 text-xs hover:underline">Delete</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addBenefitsCardItem(1)} className="text-xs text-secondary font-semibold hover:underline">+ Add Bullet Point</button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Mockup Image</label>
                            <div className="flex items-center gap-3">
                                {benefitsImage1Preview && (
                                    <div className="relative w-16 h-12 rounded overflow-hidden border flex-shrink-0 bg-white">
                                        <Image
                                            src={getImageUrl(benefitsImage1Preview)}
                                            alt="Card 2 Preview"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBenefitsImage1Change}
                                    className="w-full border rounded-lg px-2 py-1 text-xs bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
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

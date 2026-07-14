"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCreateTestimonialMutation, useUpdateTestimonialMutation } from "@/services/testimonial";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface TestimonialFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function TestimonialForm({
    initialData,
    isEdit = false,
}: TestimonialFormProps) {
    const router = useRouter();
    const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
    const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();

    const [form, setForm] = useState({
        clientName: "",
        caseType: "",
        testimonialText: "",
        rating: 5,
        displayOrder: 1,
        isActive: true,
        clientImage: null as File | null,
    });
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (initialData) {
            setForm({
                clientName: initialData.clientName || "",
                caseType: initialData.caseType || "",
                testimonialText: initialData.testimonialText || "",
                rating: initialData.rating || 5,
                displayOrder: initialData.displayOrder || 1,
                isActive: initialData.isActive ?? true,
                clientImage: null,
            });
            if (initialData.clientImage) {
                setPreview(initialData.clientImage);
            }
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({ ...prev, clientImage: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("clientName", form.clientName);
            formData.append("caseType", form.caseType);
            formData.append("testimonialText", form.testimonialText);
            formData.append("rating", form.rating.toString());
            formData.append("displayOrder", form.displayOrder.toString());
            formData.append("isActive", form.isActive.toString());

            if (form.clientImage) {
                formData.append("clientImage", form.clientImage);
            }

            if (isEdit && initialData?.id) {
                await updateTestimonial({ id: initialData.id, data: formData }).unwrap();
                toast.success("Testimonial updated successfully!");
            } else {
                await createTestimonial(formData).unwrap();
                toast.success("Testimonial created successfully!");
            }
            router.push("/admin/testimonials");
        } catch (err) {
            console.error("Failed to save testimonial:", err);
            toast.error("Failed to save testimonial.");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow border space-y-6"
        >
            {/* Client Image */}
            <div>
                <label className="block text-sm font-medium mb-2">Client Image</label>
                <div className="flex items-center gap-6">
                    {preview ? (
                        <div className="relative w-32 h-32">
                            <Image
                                src={getImageUrl(preview)}
                                alt="Client"
                                fill
                                className="object-cover rounded-lg border"
                            />
                        </div>
                    ) : (
                        <div className="w-32 h-32 flex items-center justify-center border rounded-lg text-gray-400 text-sm flex-shrink-0">No Image</div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="flex-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Client Name</label>
                    <input
                        name="clientName"
                        required
                        value={form.clientName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
            </div>

            {/* Case Type */}
            <div>
                <label className="block text-sm font-medium mb-1">Case Type</label>
                <input
                    name="caseType"
                    value={form.caseType}
                    onChange={handleChange}
                    placeholder="e.g. Corporate Law Case"
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium mb-1">Testimonial Content</label>
                <textarea
                    name="testimonialText"
                    required
                    rows={4}
                    value={form.testimonialText}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <select
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </select>
                </div>

                {/* Display Order */}
                <div>
                    <label className="block text-sm font-medium mb-1">Display Order</label>
                    <input
                        type="number"
                        name="displayOrder"
                        value={form.displayOrder}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
            </div>

            {/* Status */}
            <div className="w-48">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    name="isActive"
                    value={form.isActive.toString()}
                    onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.value === "true" }))}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.push("/admin/testimonials")}
                    className="border px-6 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-secondary text-white px-8 py-2 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : (isEdit ? "Update Testimonial" : "Save Testimonial")}
                </button>
            </div>
        </form>
    );
}

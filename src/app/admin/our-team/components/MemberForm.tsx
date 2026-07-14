"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCreateMemberMutation, useUpdateMemberMutation } from "@/services/member";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface MemberFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function MemberForm({
    initialData,
    isEdit = false,
}: MemberFormProps) {
    const router = useRouter();
    const [createMember, { isLoading: isCreating }] = useCreateMemberMutation();
    const [updateMember, { isLoading: isUpdating }] = useUpdateMemberMutation();

    const [form, setForm] = useState({
        fullName: "",
        designation: "",
        category: "",
        practiceArea: "",
        location: "",
        shortBio: "",
        displayOrder: 1,
        status: "Active" as "Active" | "Inactive",
        imageFile: null as File | null,
    });
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (initialData) {
            setForm({
                fullName: initialData.fullName || initialData.name || "",
                designation: initialData.designation || "",
                category: initialData.category || "",
                practiceArea: initialData.practiceArea || "",
                location: initialData.location || "",
                shortBio: initialData.shortBio || initialData.bio || "",
                displayOrder: initialData.displayOrder || initialData.order || 1,
                status: initialData.status || "Active",
                imageFile: null,
            });
            if (initialData.profileImage || initialData.image) {
                setPreview(initialData.profileImage || initialData.image);
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
            setForm((prev) => ({ ...prev, imageFile: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fullName", form.fullName);
            formData.append("designation", form.designation);
            formData.append("category", form.category);
            formData.append("practiceArea", form.practiceArea);
            formData.append("location", form.location);
            formData.append("shortBio", form.shortBio);
            formData.append("displayOrder", form.displayOrder.toString());
            formData.append("status", form.status);

            if (form.imageFile) {
                formData.append("profileImage", form.imageFile);
            }

            if (isEdit && initialData?.id) {
                await updateMember({ id: initialData.id, data: formData }).unwrap();
                toast.success("Member updated successfully!");
            } else {
                await createMember(formData).unwrap();
                toast.success("Member created successfully!");
            }
            router.push("/admin/our-team");
        } catch (err) {
            console.error("Failed to save member:", err);
            toast.error("Failed to save member.");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl border shadow space-y-6"
        >
            {/* Profile Image */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Profile Image
                </label>
                <div className="flex items-center gap-6">
                    {preview ? (
                        <div className="relative w-32 h-32">
                            <Image
                                src={getImageUrl(preview)}
                                alt="Profile"
                                fill
                                className="object-cover rounded-lg border"
                            />
                        </div>
                    ) : (
                        <div className="w-32 h-32 flex items-center justify-center border rounded-lg text-gray-400 text-sm flex-shrink-0">
                            No Image
                        </div>
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
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        name="fullName"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Designation */}
                <div>
                    <label className="block text-sm font-medium mb-1">Designation</label>
                    <input
                        name="designation"
                        required
                        value={form.designation}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">Select Category</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Senior Partners">Senior Partners</option>
                        <option value="Partners">Partners</option>
                        <option value="Senior Practitioners">Senior Practitioners</option>
                        <option value="Principal Associates">Principal Associates</option>
                        <option value="Senior Associates">Senior Associates</option>
                    </select>
                </div>

                {/* Practice Area */}
                <div>
                    <label className="block text-sm font-medium mb-1">Practice Area</label>
                    <input
                        name="practiceArea"
                        value={form.practiceArea}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Order */}
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

            {/* Bio */}
            <div>
                <label className="block text-sm font-medium mb-1">Short Bio</label>
                <textarea
                    name="shortBio"
                    rows={4}
                    value={form.shortBio}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            {/* Status */}
            <div className="w-48">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.push("/admin/our-team")}
                    className="border px-6 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-secondary text-white px-8 py-2 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : (isEdit ? "Update Member" : "Save Member")}
                </button>
            </div>
        </form>
    );
}

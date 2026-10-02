"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateCareerMutation, useUpdateCareerMutation } from "@/services/career";
import toast from "react-hot-toast";

interface CareerFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function CareerForm({
    initialData,
    isEdit = false,
}: CareerFormProps) {
    const router = useRouter();
    const [createCareer, { isLoading: isCreating }] = useCreateCareerMutation();
    const [updateCareer, { isLoading: isUpdating }] = useUpdateCareerMutation();

    const [form, setForm] = useState({
        title: "",
        department: "",
        location: "",
        jobType: "" as "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote" | "Hybrid" | "On-site" | "Work From Home",
        experience: "",
        education: "",
        description: "",
        isActive: true,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                department: initialData.department || "",
                location: initialData.location || "",
                jobType: initialData.jobType || "",
                experience: initialData.experience || "",
                education: initialData.education || "",
                description: initialData.description || "",
                isActive: initialData.isActive ?? true,
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === "status") {
            setForm((prev) => ({ ...prev, isActive: value === "Open" }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEdit && initialData?.id) {
                await updateCareer({ id: initialData.id, data: form }).unwrap();
                toast.success("Career updated successfully!");
            } else {
                await createCareer(form).unwrap();
                toast.success("Career created successfully!");
            }
            router.push("/admin/career");
        } catch (err) {
            console.error("Failed to save career:", err);
            toast.error("Failed to save career.");
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-3 rounded-xl shadow border space-y-5"
        >
            <div className="grid md:grid-cols-2 gap-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. HR Executive"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <input
                        type="text"
                        name="department"
                        required
                        value={form.department}
                        onChange={handleChange}
                        placeholder="e.g. Human Resources"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g. Pune, India"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                    />
                </div>

                {/* Job Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Job Type</label>
                    <select
                        name="jobType"
                        required
                        value={form.jobType}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                    >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                        <option value="Work From Home">Work From Home</option>
                    </select>
                </div>
            </div>

            {/* Experience & Education */}
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Experience Required
                    </label>
                    <input
                        type="text"
                        name="experience"
                        required
                        placeholder="e.g. 2–5 years"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Education Required
                    </label>
                    <input
                        type="text"
                        name="education"
                        placeholder="e.g. B.Tech / BCA / Graduate"
                        value={form.education}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Job Description
                </label>
                <textarea
                    name="description"
                    required
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter detailed job description, responsibilities, and requirements..."
                    className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                />
            </div>

            {/* Status */}
            <div className="w-48">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    name="status"
                    value={form.isActive ? "Open" : "Closed"}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-secondary outline-none"
                >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.push("/admin/career")}
                    className="border px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-secondary text-white px-8 py-2 rounded-lg hover:bg-secondary-dark transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : (isEdit ? "Update Career" : "Save Career")}
                </button>
            </div>
        </form>
    );
}

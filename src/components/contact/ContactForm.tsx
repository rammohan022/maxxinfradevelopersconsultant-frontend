"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import Image from "next/image";
import { useCreateLeadMutation } from "@/services/lead";
import { useGetServicesQuery } from "@/services/services";
import toast from "react-hot-toast";

const ContactSection = () => {
    const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation();
    const { data: services } = useGetServicesQuery();

    const toTitleCase = (str: string) =>
        str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        company: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createLead({ ...formData, source: typeof window !== "undefined" ? window.location.pathname : "" }).unwrap();
            toast.success("Enquiry submitted successfully! We'll get back to you soon.");
            setFormData({ fullName: "", email: "", phoneNumber: "", company: "", subject: "", message: "" });
        } catch (err) {
            console.error("Submission error:", err);
            toast.error("Failed to submit enquiry. Please try again later.");
        }
    };

    const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition";

    return (
        <section className="py-16 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    {/* Left side: Image */}
                    <div className="relative min-h-[400px] lg:h-auto w-full">
                        <Image
                            src="/img/home-contact.png"
                            alt="Contact People Consulting"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white p-8 sm:p-14 h-full flex flex-col justify-center">
                            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-1">
                                Get In Touch
                            </h2>
                            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mb-4">
                                Fill out the form below and we&apos;ll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Row 1: Full Name + Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="yourmail@gmail.com"
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Phone + Company */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your Company Name"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Service Dropdown (full row) */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Service *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    >
                                        <option value="">-- Select a Service --</option>
                                        {services && services
                                            .filter((s) => s.status === "Published")
                                            .map((service) => (
                                                <option key={service.id} value={service.title}>
                                                    {toTitleCase(service.title)}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Row 4: Message (full row) */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Please describe your requirements in detail..."
                                        required
                                        className={inputClass}
                                    />
                                </div>



                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-secondary text-white py-2 text-sm rounded-md font-semibold hover:bg-secondary-dark transition-all disabled:bg-gray-400"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default ContactSection;

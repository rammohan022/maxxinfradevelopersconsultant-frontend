"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import Image from "next/image";
import { useCreateLeadMutation } from "@/services/lead";
import toast from "react-hot-toast";

const ContactSection = () => {
    const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createLead({ ...formData, source: typeof window !== "undefined" ? window.location.pathname : "" }).unwrap();
            toast.success("Enquiry submitted successfully! We'll get back to you soon.");
            setFormData({ fullName: "", email: "", phoneNumber: "", subject: "", message: "" });
        } catch (err) {
            console.error("Submission error:", err);
            toast.error("Failed to submit enquiry. Please try again later.");
        }
    };

    return (
        <section className="py-16 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    {/* Left side: Image */}
                    <div className="relative min-h-[400px] lg:h-auto w-full">
                        <Image
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
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
                                {/* Full Name */}
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
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Email */}
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
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Phone */}
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
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="HR Consulting / Recruitment Enquiry"
                                        required
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Message */}
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
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-2.5 pt-1 pb-1">
                                    <input
                                        id="cf-consent"
                                        type="checkbox"
                                        required
                                        className="mt-0.5 h-4 w-4 text-secondary rounded border-gray-300 focus:ring-secondary accent-secondary cursor-pointer flex-shrink-0"
                                    />
                                    <label htmlFor="cf-consent" className="text-xs text-gray-600 leading-snug cursor-pointer select-none">
                                        I agree to the Terms of Service and Privacy Policy.
                                    </label>
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
        </section >
    );
};

export default ContactSection;

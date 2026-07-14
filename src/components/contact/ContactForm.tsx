"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Twitter,
    Facebook,
    Instagram,
} from "lucide-react";
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
            await createLead(formData).unwrap();
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
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div>
                        <div className="bg-navy p-10 text-white h-full">
                            <h3 className="text-3xl font-serif font-bold mb-8">
                                Contact Information
                            </h3>

                            <div className="space-y-8">
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <Phone className="w-5 h-5 text-red-700 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-semibold">Call Us</h4>
                                        <p className="text-gray-300 text-sm">
                                            Speak directly with our legal support team
                                        </p>
                                        <a
                                            href="tel:+918800177307"
                                            className="text-red-700 hover:text-red-400 transition font-medium"
                                        >
                                            +91 8800177307
                                        </a>
                                    </div>
                                </div>
                                <div className="border-b border-gray-600/60"></div>
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <Mail className="w-5 h-5 text-red-700 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-semibold">Email Address</h4>
                                        <p className="text-gray-300 text-sm">
                                            For consultations and general enquiries
                                        </p>
                                        <a
                                            href="mailto:hello@peopleconsultings.com"
                                            className="text-red-700 hover:text-red-400 transition font-medium"
                                        >
                                            hello@peopleconsultings.com
                                        </a>
                                    </div>
                                </div>
                                <div className="border-b border-gray-600/60"></div>
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-red-700 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-semibold">Office Address</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            243, 2nd Floor, Vipul Trade Centre, <br />
                                            Sector 48, Sohna Road, Gurgaon, Haryana
                                        </p>
                                    </div>
                                </div>
                                <div className="border-b border-gray-600/60"></div>
                                {/* Social Media */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                                    <div className="flex gap-4">
                                        <a href="https://www.linkedin.com/company/people-consulting-services/" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="hover:text-red-700 transition">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="hover:text-red-700 transition">
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                        <a href="https://www.instagram.com/peopleconsultco?igsh=bGNkZzVoeDNoMGl2" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white shadow border border-gray-100 p-14">
                            <h2 className="text-2xl font-serif font-bold text-navy mb-1">
                                Get In Touch
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
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
                                        placeholder="Legal Consultation Request"
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
                                        placeholder="Please describe your legal matter in detail..."
                                        required
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-1 h-3.5 w-3.5 text-red-700 border-gray-300 rounded focus:ring-red-700"
                                    />
                                    <label className="text-xs text-gray-600 leading-snug">
                                        I agree to the{" "}
                                        <a href="#" className="text-red-700 hover:underline">
                                            Terms
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-red-700 hover:underline">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-red-700 text-white py-2 text-sm rounded-md font-semibold hover:bg-red-900 transition-all disabled:bg-gray-400"
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

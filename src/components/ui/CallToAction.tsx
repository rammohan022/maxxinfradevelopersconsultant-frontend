import React from "react";
import { CalendarDays, Phone } from "lucide-react";
import Image from 'next/image'
import { Container } from "@/components/ui";

const CTASection: React.FC = () => {
    return (
        <section
            id="cta-section"
            className="relative overflow-hidden border-y border-gray-100 py-20"
            style={{
                backgroundImage: "url('/img/paper_texture_bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-5">
                <Image
                    src="/img/hr_hero_bg_1783707638359.png"
                    alt="abstract corporate office background, professional network and growth"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            {/* Content */}
            <Container className="relative z-10 max-w-4xl text-center">
                <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">
                    Empowering Your Business Through Top Talent.
                </h2>

                <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed mb-8">
                    We help organizations streamline their recruitment, training, and labor compliance processes. Partner with us to build high-performance workplaces and connect with industry-leading professionals.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-dark hover:shadow-xl"
                    >
                        Contact Us
                        <CalendarDays className="h-5 w-5" />
                    </button>

                    <a
                        href="tel:+918800177307"
                        className="flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-xl hover:text-navy"
                    >
                        Connect With Us
                        <Phone className="h-5 w-5" />
                    </a>
                </div>
            </Container>
        </section>
    );
};

export default CTASection;

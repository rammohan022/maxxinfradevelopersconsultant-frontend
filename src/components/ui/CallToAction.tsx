import React from "react";
import { CalendarDays, Phone } from "lucide-react";
import Image from 'next/image'
import { Container } from "@/components/ui";

const CTASection: React.FC = () => {
    return (
        <section
            id="cta-section"
            className="relative overflow-hidden bg-navy py-20"
        >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-10">
                <Image
                    src="/img/cta-bg.png"
                    alt="elegant legal pattern, scales of justice, subtle background texture"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            {/* Content */}
            <Container className="relative z-10 max-w-4xl text-center">
                <h2 className="mb-6 font-serif text-4xl font-bold text-white">
                    Your Voice In Court, Your Partner In Law.
                </h2>

                <p className="mb-8 text-xl leading-relaxed text-gray-300">
                    Legal matters can involve multiple considerations and procedural requirements. You may connect with us to discuss the nature of your matter and understand the applicable legal process.
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
                        className="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-navy transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl"
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

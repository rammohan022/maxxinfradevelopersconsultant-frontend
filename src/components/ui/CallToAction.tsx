import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui";

const CTASection: React.FC = () => {
    return (
        <section
            id="cta-section"
            className="relative overflow-hidden border-b border-slate-200/80 py-16 md:py-20 bg-[#f1f6fc]"
        >
            {/* Subtle Pattern Grid */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(#2b4376 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Content Container */}
            <Container className="relative z-10 max-w-4xl text-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-4">
                    Connect with us
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
                    Whether you&apos;re looking to hire, transform HR, build capabilities or strengthen compliance, we bring practical HR expertise and technology together to create measurable impact.
                </p>

                {/* 3 Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 max-w-3xl mx-auto">
                    <Link
                        href="/career"
                        className="w-full sm:w-auto flex-1 flex items-center justify-center rounded-xl bg-white border border-slate-200 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-[#0284c7] shadow-sm hover:shadow-md hover:border-secondary hover:text-secondary transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Looking for Job
                    </Link>

                    <Link
                        href="/contact-us"
                        className="w-full sm:w-auto flex-1 flex items-center justify-center rounded-xl bg-secondary px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-md hover:shadow-lg hover:bg-secondary-dark transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Get In Touch
                    </Link>

                    <Link
                        href="/services"
                        className="w-full sm:w-auto flex-1 flex items-center justify-center rounded-xl bg-white border border-slate-200 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-[#0284c7] shadow-sm hover:shadow-md hover:border-secondary hover:text-secondary transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        HR Solutions
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default CTASection;


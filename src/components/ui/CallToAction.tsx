import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui";

export interface CTAButton {
    label: string;
    href: string;
    primary?: boolean;
}

export interface CallToActionProps {
    badge?: string;
    title?: string;
    description?: string;
    buttons?: CTAButton[];
}

const defaultButtons: CTAButton[] = [
    { label: "Looking for Job", href: "/career" },
    { label: "Get In Touch", href: "/contact-us", primary: true },
    { label: "HR Solutions", href: "/services" },
];

const CTASection: React.FC<CallToActionProps> = ({
    badge,
    title = "Connect with us",
    description = "Whether you're looking to hire, transform HR, build capabilities or strengthen compliance, we bring practical HR expertise and technology together to create measurable impact.",
    buttons = defaultButtons,
}) => {
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
                {badge && (
                    <div className="mb-3">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
                            {badge}
                        </span>
                    </div>
                )}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-4">
                    {title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
                    {description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
                    {buttons.map((btn, idx) => {
                        if (btn.primary) {
                            return (
                                <Link
                                    key={idx}
                                    href={btn.href}
                                    className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:shadow-md hover:bg-secondary-dark transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    {btn.label}
                                </Link>
                            );
                        }
                        return (
                            <Link
                                key={idx}
                                href={btn.href}
                                className="inline-flex items-center justify-center rounded-lg bg-white border border-slate-200 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#0284c7] shadow-sm hover:shadow-md hover:border-secondary hover:text-secondary transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                {btn.label}
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default CTASection;


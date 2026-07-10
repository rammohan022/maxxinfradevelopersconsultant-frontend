import Image from "next/image";
import { Container } from "@/components/ui";

const CareerHero = () => {
    return (
        <section className="relative min-h-[520px] flex items-center bg-navy overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80)",
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

            <Container className="relative z-10 w-full py-16 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wide mb-4">
                            Careers
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif-heading leading-tight mb-5">
                            Build Your Career With Us
                        </h1>

                        <p className="text-lg text-white/90 mb-8 max-w-xl">
                            Grow, learn, and create real impact in a firm that values
                            integrity, excellence, and your professional development.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#open-positions"
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded font-medium transition"
                            >
                                View Open Positions
                            </a>

                            <a
                                href="#why-join-us"
                                className="border-2 border-white text-white hover:bg-white hover:text-navy px-6 py-3 rounded font-medium transition"
                            >
                                Why Work With Us
                            </a>
                        </div>
                    </div>
                    {/* RIGHT IMAGE */}
                    <div className="relative hidden lg:block">
                        <div className="relative h-[420px] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80"
                                alt="Legal team working"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CareerHero;

import Image from "next/image";
import { Container } from "@/components/ui";

const CareerHero = () => {
  return (
    <section className="relative min-h-[520px] flex items-center bg-slate-50 border-b border-slate-100 overflow-hidden">
      {/* Background decoration blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] -z-0" />

      <Container className="relative z-10 w-full py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Careers
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight mb-5">
              Build Your Career With Us
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Grow, learn, and create real impact in a consulting agency that values
              integrity, excellence, and your professional development.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#open-positions"
                className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3.5 rounded-lg font-semibold shadow-md transition hover:scale-[1.02] active:scale-[0.98]"
              >
                View Open Positions
              </a>

              <a
                href="#why-join-us"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-3.5 rounded-lg font-semibold transition"
              >
                Why Work With Us
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block">
            <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80"
                alt="Consulting team working"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareerHero;

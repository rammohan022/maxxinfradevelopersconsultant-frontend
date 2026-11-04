import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { ArrowRight, Building, Home, LandPlot, MapPin } from "lucide-react";

const categories = [
  {
    title: "Gated Residential Plots",
    count: "Him City, Him Estate & Aravali",
    image: "/img/projects/him-city-part2-corner-plot-3000.jpg",
    link: "/properties?category=Plots",
    description: "Clear-title freehold residential plots on Deva Road & Ayodhya Highway corridor with spot registry."
  },
  {
    title: "Verified Resell Plots",
    count: "Him City, Him Estate, Vasundhara",
    image: "/img/projects/vasundhara-enclave-plot-2600.jpg",
    link: "/properties?category=Resell+Plots",
    description: "Ready-to-build corner & road-facing resale plots in fully developed colonies with immediate possession."
  },
  {
    title: "Modern Row Houses",
    count: "Om Sai Vishnu Vihar & Him City",
    image: "/img/projects/om-sai-vishnu-vihar-house-front.jpg",
    link: "/properties?category=Row+House",
    description: "Ready-to-move 2 BHK independent modern houses with covered car porches and designer elevations."
  },
  {
    title: "Integrated Townships",
    count: "Aravali Green City & Goyala City",
    image: "/img/projects/aravali-towers-real.jpg",
    link: "/properties?category=Township",
    description: "Mega gated townships featuring multi-story residential towers, wide concrete boulevards, parks & complete infrastructure."
  },
];

export default function PropertyCategories() {
  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Explore By Segment
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-2">
            Tailored Housing Options for Every Family
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            Whether you desire a ready-to-move row house or a long-term appreciating residential plot, explore our handpicked categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-100"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/50 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block mb-1">
                  {cat.count}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-secondary transition mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-secondary transition uppercase tracking-wider">
                  Browse Properties <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}


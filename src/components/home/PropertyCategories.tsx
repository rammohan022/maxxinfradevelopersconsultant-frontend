import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { ArrowRight, Building, Home, LandPlot, MapPin } from "lucide-react";

const categories = [
  {
    title: "2 & 3 BHK Luxury Flats",
    count: "Sai Yash & Eiffel Palm",
    image: "/img/properties/prop_5.jpeg",
    link: "/properties?category=Flats",
    description: "Ready & ongoing 2 & 3 BHK flats at Anora Kala (Ayodhya Rd) & Deva Rd from ₹65 Lakh."
  },
  {
    title: "Gated Residential Plots",
    count: "Aravali Green & Highway Sites",
    image: "/img/properties/plots_land.jpg",
    link: "/properties?category=Plots",
    description: "Clear-title freehold plots on Ayodhya Road (Badel, Barabanki) & Kisan Path from ₹14.5 Lakh."
  },
  {
    title: "Modern Row Houses",
    count: "15+ Ready Units",
    image: "/img/properties/row_house.jpg",
    link: "/properties?category=Row+House",
    description: "2 & 3 BHK contemporary row houses with private car porches and independent terraces."
  },
  {
    title: "Luxury Duplex Villas",
    count: "8+ Premium Villas",
    image: "/img/properties/villa_luxury.jpg",
    link: "/properties?category=Villas",
    description: "Grand 4 BHK duplex villas with double-height ceilings, modular kitchens & en-suite baths."
  },
  {
    title: "Independent Builder Floors",
    count: "12+ Verified Floors",
    image: "/img/properties/builder_floor.jpg",
    link: "/properties?category=Builder+Floor",
    description: "Stilt + 4 elevations with automatic elevator, reserved stilt parking & luxury woodwork."
  },
];

export default function PropertyCategories() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Explore By Segment
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-2">
            Tailored Housing Options for Every Family
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            Whether you desire a ready-to-move row house or a long-term appreciating residential plot, explore our handpicked categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
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


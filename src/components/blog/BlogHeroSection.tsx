import { Container } from "@/components/ui"
import Image from "next/image";

const BlogHeroSection = () => {
  return (
    <section className="relative h-[400px] overflow-hidden bg-navy"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/blog-hero-bg.png"
          alt="Elegant chess pieces on wooden board in dramatic lighting, corporate law concept"
          fill
          className="object-cover opacity-30"
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/70" />
      {/* Content */}
      <Container className="relative flex h-full flex-col justify-center">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-300">
            <a
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </a>
            <svg
              className="h-3 w-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 320 512"
              aria-hidden="true"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
            <span className="font-medium text-gold">
              Blogs &amp; Articles
            </span>
          </nav>
          {/* Heading */}
          <h1 className="mb-6 font-serif text-6xl font-bold leading-tight text-white">
            Legal Insights &amp; <br />
            Expert Analysis
          </h1>
          {/* Description */}
          <p className="max-w-2xl text-xl leading-relaxed text-gray-300">
            Stay informed with the latest legal developments, expert commentary,
            and in-depth analysis from our experienced attorneys across multiple
            practice areas.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default BlogHeroSection;

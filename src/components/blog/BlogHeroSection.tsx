import { Container } from "@/components/ui"
import Image from "next/image";

const BlogHeroSection = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[rgb(13_33_55)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/blog-hero-bg-v2.png"
          alt="People & HR Insights"
          fill
          priority
          className="object-cover opacity-50"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(13_33_55)]/90 via-[rgb(13_33_55)]/80 to-[rgb(13_33_55)]/60" />

      {/* Content */}
      <Container className="relative z-10 w-full flex h-full flex-col justify-center items-start text-left">
        <div className="max-w-3xl w-full text-left">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-300 font-medium">
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
            <span className="font-bold text-secondary">
              Blogs
            </span>
          </nav>

          {/* Heading */}
          <h1 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-tight text-white drop-shadow-md">
            People &amp; HR Insights
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-200 drop-shadow-sm">
            Stay informed with the latest human resource developments, recruitment trends,
            and expert talent strategies from our experienced advisors.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default BlogHeroSection;

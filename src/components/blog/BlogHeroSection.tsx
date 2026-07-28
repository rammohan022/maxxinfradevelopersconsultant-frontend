import { Container } from "@/components/ui"
import Image from "next/image";

const BlogHeroSection = () => {
  return (
    <section className="relative py-14 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200">
      {/* Background decoration blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] -z-0" />

      {/* Content */}
      <Container className="relative z-10 flex h-full flex-col justify-center">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center space-x-2 text-sm text-slate-500 font-semibold">
            <a
              href="/"
              className="transition-colors hover:text-primary"
            >
              Home
            </a>
            <svg
              className="h-3 w-3 text-slate-400"
              fill="currentColor"
              viewBox="0 0 320 512"
              aria-hidden="true"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
            <span className="font-bold text-primary">
              Blogs &amp; Articles
            </span>
          </nav>

          {/* Heading */}
          <h1 className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-primary">
            People &amp; HR Insights
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Stay informed with the latest human resource developments, recruitment trends,
            and expert talent strategies from our experienced advisors.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default BlogHeroSection;

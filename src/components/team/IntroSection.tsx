import { Container } from "@/components/ui"

const IntroSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <Container className="max-w-5xl text-center">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Sterling &amp; Associates brings together over{" "}
          <span className="font-semibold text-navy-900">
            150 distinguished legal professionals
          </span>{" "}
          across our offices in Mumbai, Delhi, Bangalore, and London. Our team
          comprises{" "}
          <span className="font-semibold text-navy-900">42 Partners</span> and{" "}
          <span className="font-semibold text-navy-900">
            18 Senior Counsel
          </span>{" "}
          with an average experience of 25+ years in their respective practice
          areas.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          Our people are recognized globally for their expertise in complex
          litigation, corporate advisory, and regulatory matters. We pride
          ourselves on building long-term relationships with clients through
          exceptional legal acumen and unwavering commitment to excellence.
        </p>
      </Container>
    </section>
  );
};

export default IntroSection;

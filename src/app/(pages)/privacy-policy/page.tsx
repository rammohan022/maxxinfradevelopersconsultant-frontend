"use client";

import { Container } from "@/components/ui";
import PrivacyHeroSection from "@/components/privacy-policy/PrivacyHero";
import { useGetPrivacyPoliciesQuery } from "@/services/legal";

const PrivacyPolicy = () => {
  const { data: policies = [], isLoading, isError } = useGetPrivacyPoliciesQuery();

  // Find the latest published policy
  const policy = policies.find(p => p.status === "Published") || policies[0];

  if (isLoading) return <div className="py-20 text-center text-slate-500 font-serif">Loading Privacy Policy...</div>;
  if (isError || !policy) return (
    <div className="py-20 text-center text-red-700 font-serif">
      <Container>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4">Privacy Policy</h2>
        <p>Our privacy policy is currently being updated. Please check back soon.</p>
      </Container>
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <PrivacyHeroSection />

      {/* Content Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-8 border-b pb-4">
              {policy.title}
            </h1>

            <div
              className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />

            <div className="mt-12 pt-8 border-t text-sm text-gray-500 italic">
              Last Updated: {new Date(policy.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicy;

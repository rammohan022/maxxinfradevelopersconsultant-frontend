"use client";

import { Container } from "@/components/ui";
import TermsHero from "@/components/privacy-policy/TermsHero";
import { useGetTermsConditionsQuery } from "@/services/legal";

const TermsConditions = () => {
  const { data: terms = [], isLoading, isError } = useGetTermsConditionsQuery();

  // Find the latest published document
  const doc = terms.find(t => t.status === "Published") || terms[0];

  if (isLoading) return <div className="py-20 text-center text-slate-500 font-serif">Loading Terms & Conditions...</div>;
  if (isError || !doc) return (
    <div className="py-20 text-center text-red-700 font-serif">
      <Container>
        <h2 className="text-3xl font-bold mb-4">Terms & Conditions</h2>
        <p>Our terms and conditions are currently being updated. Please check back soon.</p>
      </Container>
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <TermsHero />

      {/* Content Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-navy mb-8 border-b pb-4">
              {doc.title}
            </h1>

            <div
              className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: doc.content }}
            />

            <div className="mt-12 pt-8 border-t text-sm text-gray-500 italic">
              Last Updated: {new Date(doc.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default TermsConditions;

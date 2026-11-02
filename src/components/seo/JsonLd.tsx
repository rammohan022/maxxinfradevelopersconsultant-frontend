import React from "react";

const siteUrl = "https://maxxinfradevelopersconsultant.com";

// 🏢 Organization & RealEstateAgent Schema
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Maxx Infra Developers & Consultant",
    "url": siteUrl,
    "logo": `${siteUrl}/img/logo.png`,
    "image": `${siteUrl}/img/hero/real_estate_hero.jpg`,
    "description": "Leading real estate developers and consultants in Lucknow S.C.R. Buy, sell, and resell luxury villas, modern row houses, and residential plots.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "G-1 Shivani Arcade, Deva Road, Opp. Axis Bank",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226028",
      "addressCountry": "IN"
    },
    "telephone": "+91-7905145968",
    "priceRange": "₹₹",
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 🍞 Breadcrumb Schema
export function BreadcrumbJsonLd({ items }: { items: { name: string; item: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.item.startsWith("http") ? it.item : `${siteUrl}${it.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ❓ FAQPage Schema
export function FAQPageJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer.replace(/<[^>]*>?/gm, ""),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 💼 JobPosting Schema
export function JobPostingJsonLd({ job }: { job: any }) {
  if (!job) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description ? job.description.replace(/<[^>]*>?/gm, "") : job.title,
    "datePosted": job.createdAt || new Date().toISOString(),
    "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": job.jobType?.toUpperCase().replace("-", "_") || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "People Consulting",
      "sameAs": siteUrl,
      "logo": `${siteUrl}/img/logo.png`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location || "Gurgaon",
        "addressRegion": "Haryana",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 📰 Article Schema
export function ArticleJsonLd({ article }: { article: any }) {
  if (!article) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.title,
    "image": article.image ? article.image : `${siteUrl}/img/logo.png`,
    "datePublished": article.createdAt || new Date().toISOString(),
    "dateModified": article.updatedAt || article.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "People Consulting HR Experts"
    },
    "publisher": {
      "@type": "Organization",
      "name": "People Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/img/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${article.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

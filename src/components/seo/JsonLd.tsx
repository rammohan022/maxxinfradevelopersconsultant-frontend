import React from "react";

const siteUrl = "https://peopleconsultings.com";

// 🏢 Organization & ProfessionalService Schema
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "People Consulting",
    "url": siteUrl,
    "logo": `${siteUrl}/img/logo.png`,
    "image": `${siteUrl}/img/logo.png`,
    "description": "Leading Corporate HR Consulting, Executive Search, Talent Acquisition, Labor Compliance, and Corporate Training Firm.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "243, 2nd Floor, Vipul Trade Centre, Sector 48, Sohna Road",
      "addressLocality": "Gurgaon",
      "addressRegion": "Haryana",
      "postalCode": "122018",
      "addressCountry": "IN"
    },
    "telephone": "+91-8800177307",
    "email": "hello@peopleconsultings.com",
    "priceRange": "$$",
    "sameAs": [
      "https://www.linkedin.com/company/people-consulting-services/",
      "https://www.instagram.com/peopleconsultco",
      "https://facebook.com"
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

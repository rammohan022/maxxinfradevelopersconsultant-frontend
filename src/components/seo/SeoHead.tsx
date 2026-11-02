import React from "react";

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const siteUrl = "https://maxxinfradevelopersconsultant.com";
const defaultTitle = "Maxx Infra Developers & Consultant | Buy, Sell & Resell Property in Lucknow S.C.R";
const defaultDescription =
  "Maxx Infra Developers & Consultant: Buy, sell, and resell verified plots, villas, modern row houses, and builder floors in Lucknow S.C.R with zero brokerage.";
const defaultImage = `${siteUrl}/img/hero/real_estate_hero.jpg`;

export default function SeoHead({
  title = defaultTitle,
  description = defaultDescription,
  keywords,
  canonicalPath = "/",
  image = defaultImage,
  type = "website",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}: SeoHeadProps) {
  const fullUrl = `${siteUrl}${canonicalPath.startsWith("/") ? canonicalPath : "/" + canonicalPath}`;
  const metaTitle = title.includes("Maxx Infra") ? title : `${title} | Maxx Infra Developers & Consultant`;
  const effectiveOgTitle = ogTitle || metaTitle;
  const effectiveOgDescription = ogDescription || description;
  const effectiveTwitterTitle = twitterTitle || effectiveOgTitle;
  const effectiveTwitterDescription = twitterDescription || effectiveOgDescription;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="People Consulting" />
      <meta property="og:title" content={effectiveOgTitle} />
      <meta property="og:description" content={effectiveOgDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={effectiveTwitterTitle} />
      <meta name="twitter:description" content={effectiveTwitterDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}

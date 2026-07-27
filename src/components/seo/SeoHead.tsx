import React from "react";

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
}

const siteUrl = "https://peopleconsultings.com";
const defaultTitle = "People Consulting | Top Corporate HR & Staffing Solutions";
const defaultDescription =
  "People Consulting provides trusted HR consulting, talent recruitment, executive search, labor compliance, and payroll management solutions.";
const defaultImage = `${siteUrl}/img/logo.png`;

export default function SeoHead({
  title = defaultTitle,
  description = defaultDescription,
  keywords,
  canonicalPath = "/",
  image = defaultImage,
  type = "website",
}: SeoHeadProps) {
  const fullUrl = `${siteUrl}${canonicalPath.startsWith("/") ? canonicalPath : "/" + canonicalPath}`;
  const metaTitle = title.includes("People Consulting") ? title : `${title} | People Consulting`;
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
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}

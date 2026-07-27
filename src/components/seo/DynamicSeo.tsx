"use client";

import { usePathname, useRouter } from "next/navigation";
import { useGetSeoByPathQuery, useGetGlobalSeoQuery, useGetActiveSeoRedirectsQuery } from "@/services/seo";
import { useEffect } from "react";

export default function DynamicSeo() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: pageSeo } = useGetSeoByPathQuery(pathname || "/");
  const { data: globalSeo } = useGetGlobalSeoQuery();
  const { data: activeRedirects = [] } = useGetActiveSeoRedirectsQuery();

  // 0. HANDLE 301 / 302 DYNAMIC URL REDIRECTS
  useEffect(() => {
    if (!pathname || !activeRedirects || activeRedirects.length === 0) return;

    let cleanPath = pathname;
    if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }

    const matchedRedirect = activeRedirects.find((r) => {
      if (!r.isActive) return false;
      let src = r.sourcePath ? r.sourcePath.trim() : "";
      if (src.length > 1 && src.endsWith("/")) src = src.slice(0, -1);
      return src.toLowerCase() === cleanPath.toLowerCase();
    });

    if (matchedRedirect && matchedRedirect.targetPath) {
      const target = matchedRedirect.targetPath.trim();
      let targetClean = target;
      if (targetClean.length > 1 && targetClean.endsWith("/")) {
        targetClean = targetClean.slice(0, -1);
      }

      if (targetClean.toLowerCase() !== cleanPath.toLowerCase()) {
        if (target.startsWith("http://") || target.startsWith("https://")) {
          window.location.href = target;
        } else {
          router.replace(target);
        }
      }
    }
  }, [pathname, activeRedirects, router]);

  useEffect(() => {
    // Helper to create or update meta tag
    const setMetaTag = (selector: string, attr: string, value: string) => {
      if (!value) return;
      let el = document.querySelector(selector) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        if (selector.startsWith('meta[name=')) {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) el.setAttribute("name", nameMatch[1]);
        } else if (selector.startsWith('meta[property=')) {
          const propMatch = selector.match(/property="([^"]+)"/);
          if (propMatch) el.setAttribute("property", propMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Helper to create or update link rel="canonical"
    const setCanonical = (href: string) => {
      if (!href) return;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Helper to create or update JSON-LD script
    const setStructuredData = (jsonStr: string) => {
      if (!jsonStr) return;
      let script = document.getElementById("dynamic-seo-schema") as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = "dynamic-seo-schema";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      try {
        JSON.parse(jsonStr);
        script.textContent = jsonStr;
      } catch (err) {
        console.warn("Invalid structured data JSON in SEO settings:", err);
      }
    };

    // 1. PAGE METADATA
    if (pageSeo) {
      if (pageSeo.metaTitle) {
        document.title = pageSeo.metaTitle;
      }

      if (pageSeo.metaDescription) {
        setMetaTag('meta[name="description"]', "content", pageSeo.metaDescription);
      }
      if (pageSeo.keywords) {
        setMetaTag('meta[name="keywords"]', "content", pageSeo.keywords);
      }
      if (pageSeo.robots) {
        setMetaTag('meta[name="robots"]', "content", pageSeo.robots);
      }
      if (pageSeo.canonicalUrl) {
        setCanonical(pageSeo.canonicalUrl);
      }

      // Open Graph (OG) Tags
      const ogTitle = pageSeo.ogTitle || pageSeo.metaTitle;
      const ogDesc = pageSeo.ogDescription || pageSeo.metaDescription;
      if (ogTitle) setMetaTag('meta[property="og:title"]', "content", ogTitle);
      if (ogDesc) setMetaTag('meta[property="og:description"]', "content", ogDesc);
      if (pageSeo.ogImage) setMetaTag('meta[property="og:image"]', "content", pageSeo.ogImage);
      setMetaTag('meta[property="og:type"]', "content", "website");

      // Twitter Cards
      if (pageSeo.twitterCard) setMetaTag('meta[name="twitter:card"]', "content", pageSeo.twitterCard);
      if (ogTitle) setMetaTag('meta[name="twitter:title"]', "content", ogTitle);
      if (ogDesc) setMetaTag('meta[name="twitter:description"]', "content", ogDesc);
      if (pageSeo.ogImage) setMetaTag('meta[name="twitter:image"]', "content", pageSeo.ogImage);

      // JSON-LD Structured Data
      if (pageSeo.structuredData) {
        setStructuredData(pageSeo.structuredData);
      }
    }

    // 2. GLOBAL WEBMASTER & ANALYTICS SETTINGS
    if (globalSeo) {
      // Google Site Verification
      if (globalSeo.googleSiteVerification) {
        setMetaTag('meta[name="google-site-verification"]', "content", globalSeo.googleSiteVerification);
      }

      // Bing Site Verification
      if (globalSeo.bingSiteVerification) {
        setMetaTag('meta[name="msvalidate.01"]', "content", globalSeo.bingSiteVerification);
      }

      // GA4 Script
      if (globalSeo.gaMeasurementId) {
        const gaId = globalSeo.gaMeasurementId.trim();
        let gaScript = document.getElementById("seo-ga4-script") as HTMLScriptElement;
        if (!gaScript) {
          gaScript = document.createElement("script");
          gaScript.id = "seo-ga4-script";
          gaScript.async = true;
          gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
          document.head.appendChild(gaScript);

          const gaInit = document.createElement("script");
          gaInit.id = "seo-ga4-init";
          gaInit.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `;
          document.head.appendChild(gaInit);
        }
      }

      // GTM Script
      if (globalSeo.gtmId) {
        const gtmId = globalSeo.gtmId.trim();
        let gtmScript = document.getElementById("seo-gtm-script") as HTMLScriptElement;
        if (!gtmScript) {
          gtmScript = document.createElement("script");
          gtmScript.id = "seo-gtm-script";
          gtmScript.textContent = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `;
          document.head.appendChild(gtmScript);
        }
      }

      // FB Pixel
      if (globalSeo.facebookPixelId) {
        const fbId = globalSeo.facebookPixelId.trim();
        let fbScript = document.getElementById("seo-fb-pixel") as HTMLScriptElement;
        if (!fbScript) {
          fbScript = document.createElement("script");
          fbScript.id = "seo-fb-pixel";
          fbScript.textContent = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbId}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(fbScript);
        }
      }
    }

  }, [pageSeo, globalSeo, pathname]);

  return null;
}

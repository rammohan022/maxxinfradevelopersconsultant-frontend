import type { Metadata } from "next";
// Force Next.js rebuild
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "react-quill-new/dist/quill.snow.css";
import { ReduxProvider } from "@/store/provider";
import ToastProvider from "@/components/ui/ToastProvider";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "People Consulting | Top Corporate HR & Staffing Solutions",
  description: "People Consulting provides trusted HR consulting, talent recruitment, executive search, labor compliance, and payroll management solutions.",
  verification: {
    google: "kDrfjBxMbe8b1BGHnyanot_utxDors7rPGLK8mgJkjA",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WZHLCJ2X');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} antialiased w-full overflow-x-hidden`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZHLCJ2X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <OrganizationJsonLd />
        <ReduxProvider>
          <ToastProvider />
          <main className="w-full">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

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
  title: "Maxx Infra Developers & Consultant | Property in Lucknow & NCR | Buy, Sell & Invest",
  description: "Buy, sell or invest in verified property in Lucknow & NCR — builder floors, luxury duplex villas, modern row houses, and residential plots. Zero brokerage, transparent pricing from Maxx Infra Developers & Consultant.",
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
        {/* Self-healing ChunkLoadError handler for zero-downtime post-deployment */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              function handleChunkFail(err) {
                var targetSrc = (err && err.target && (err.target.src || err.target.href)) || '';
                var msg = (err && (err.message || (err.reason && (err.reason.message || err.reason.name)) || String(err))) || '';
                if (/Loading chunk|ChunkLoadError|CSS_CHUNK_LOAD_FAILED/i.test(msg) || /_next\\/static\\/chunks/i.test(targetSrc)) {
                  var k = 'maxx_chunk_reload_lock';
                  var last = sessionStorage.getItem(k);
                  var now = Date.now();
                  if (!last || now - parseInt(last, 10) > 4000) {
                    sessionStorage.setItem(k, String(now));
                    window.location.reload();
                  }
                }
              }
              window.addEventListener('error', handleChunkFail, true);
              window.addEventListener('unhandledrejection', handleChunkFail);
            })();`,
          }}
        />
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

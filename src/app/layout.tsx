import type { Metadata } from "next";
// Force Next.js rebuild
import { Inter } from "next/font/google";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import { ReduxProvider } from "@/store/provider";
import ToastProvider from "@/components/ui/ToastProvider";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "People Consulting | Top Corporate HR & Staffing Solutions",
  description: "People Consulting provides trusted HR consulting, talent recruitment, executive search, labor compliance, and payroll management solutions.",
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
      <body className={`${inter.className} antialiased w-full overflow-x-hidden`}>
        <OrganizationJsonLd />
        <ReduxProvider>
          <ToastProvider />
          <main className="w-full">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

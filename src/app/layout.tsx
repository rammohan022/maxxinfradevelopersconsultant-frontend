import type { Metadata } from "next";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import { ReduxProvider } from "@/store/provider";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "People Consulting",
  description: "People Consulting Services",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased w-full overflow-x-hidden">
        <ReduxProvider>
          <ToastProvider />
          <main className="w-full">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

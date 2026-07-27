
import type { Metadata } from "next";
import { TopBar, Header, Footer } from "@/components/layout";
import DynamicSeo from "@/components/seo/DynamicSeo";

export const metadata: Metadata = {
  title: "People Consulting",
  description:
    "Leading consulting firm. Corporate, Financial, Legal, and Strategic consulting services. Call +91 8800177307.",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <DynamicSeo />
        <TopBar />
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </>
  );
}

import type { Metadata } from "next";
import { TopBar, Header, Footer } from "@/components/layout";
import { FloatingButtons } from "@/components/home";

export const metadata: Metadata = {
  title: "Maxx Infra Developers & Consultant",
  description:
    "Leading real estate and infrastructure developers in Lucknow & NCR. Luxury villas, row houses, and residential plots. Call +91 83031 45434.",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="w-full">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

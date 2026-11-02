import type { Metadata } from "next";
import { TopBar, Header, Footer } from "@/components/layout";
import { FloatingButtons } from "@/components/home";

export const metadata: Metadata = {
  title: "Maxx Infra Developers & Consultant",
  description:
    "Leading real estate developers & consultants in Lucknow S.C.R. Buy, sell & resell luxury villas, row houses, and residential plots. Office: G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow. Call +91 79051 45968 / +91 63861 00070.",
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

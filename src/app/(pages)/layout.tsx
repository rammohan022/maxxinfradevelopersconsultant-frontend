
import type { Metadata } from "next";
import { TopBar, Header, Footer, DisclaimerModal } from "@/components/layout";

export const metadata: Metadata = {
  title: "Equity & Legal Solutions | Best Criminal Lawyers in Delhi",
  description:
    "Leading law firm in Delhi. Criminal, ED, PMLA, Cyber Crime, Family & Divorce lawyers. Call +91-1142502484.",
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
        <DisclaimerModal />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </>
  );
}

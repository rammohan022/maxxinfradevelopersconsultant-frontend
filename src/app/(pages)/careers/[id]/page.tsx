import { JobDetailsClient } from "@/components/career";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Details | Careers at People Consulting",
  description: "View full job details, responsibilities, requirements, and apply online at People Consulting.",
};

export default function CareerDetailsPage() {
  return <JobDetailsClient />;
}

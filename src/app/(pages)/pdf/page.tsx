"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetPdfsQuery } from "@/services/pdf";
import { slugifyCategory } from "@/lib/utils/slugUtils";
import { getImageUrl } from "@/lib/utils/imageUtils";

function PdfRedirect() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("doc");
  const router = useRouter();
  const { data: pdfs = [], isLoading, isError } = useGetPdfsQuery();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !pdfs.length || !slug) {
      router.replace("/404");
      return;
    }

    const matchedPdf = pdfs.find(p => slugifyCategory(p.title) === slug);
    if (matchedPdf && matchedPdf.fileUrl) {
      window.location.replace(getImageUrl(matchedPdf.fileUrl));
    } else {
      router.replace("/404");
    }
  }, [slug, pdfs, isLoading, isError, router]);

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-600 font-semibold animate-pulse text-lg">Opening Document...</p>
      <p className="text-slate-400 text-sm">You will be redirected shortly.</p>
    </div>
  );
}

export default function PdfRedirectPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold animate-pulse text-lg">Opening Document...</p>
        </div>
      }>
        <PdfRedirect />
      </Suspense>
    </div>
  );
}

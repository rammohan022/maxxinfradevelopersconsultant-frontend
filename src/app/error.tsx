"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to console
    console.error("Unhandled UI Error Caught by Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border shadow-lg max-w-md w-full p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">Something went wrong</h2>
          <p className="text-sm text-slate-500 mt-1">
            An unexpected error occurred while loading this page.
          </p>
        </div>

        {error.message && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg text-left font-mono break-all">
            <strong>Error Details:</strong> {error.message}
          </div>
        )}

        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary-dark transition"
          >
            <RefreshCw size={16} /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Portal UI Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white border rounded-xl shadow-md max-w-lg w-full p-6 text-center space-y-4">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={28} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">Admin Section Error</h2>
          <p className="text-sm text-slate-500 mt-1">
            Failed to render this admin component due to an internal error.
          </p>
        </div>

        {error.message && (
          <div className="bg-slate-50 border border-slate-200 text-slate-700 text-xs p-3 rounded-lg text-left font-mono break-all max-h-36 overflow-y-auto">
            <span className="font-bold text-red-600">Trace:</span> {error.message}
          </div>
        )}

        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary-dark transition"
          >
            <RefreshCw size={16} /> Reload Component
          </button>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 border text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
          >
            <LayoutDashboard size={16} /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

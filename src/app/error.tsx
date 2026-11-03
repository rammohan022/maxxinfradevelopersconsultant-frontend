"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled UI Error Caught by Error Boundary:", error);

    // Auto-heal chunk load errors: happens after deployment when old chunk hashes are replaced on disk
    if (
      error?.message?.includes("Loading chunk") ||
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("ChunkLoadError")
    ) {
      const reloadKey = "chunk_reload_lock";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
      }
    }
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border shadow-lg max-w-md w-full p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">Fresh Updates Deployed</h2>
          <p className="text-sm text-slate-500 mt-1">
            New updates were deployed to the website. Please reload to view the latest version.
          </p>
        </div>

        {error.message && (
          <div className="bg-slate-50 border border-slate-200 text-slate-600 text-xs p-3 rounded-lg text-left font-mono break-all">
            <strong>Details:</strong> {error.message}
          </div>
        )}

        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-secondary text-primary-dark font-extrabold px-4 py-2 rounded-lg text-sm hover:bg-secondary-light transition shadow"
          >
            <RefreshCw size={16} /> Reload Page
          </button>
          <button
            onClick={handleHome}
            className="flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
          >
            <Home size={16} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

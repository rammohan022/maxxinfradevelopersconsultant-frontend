"use client";

import { useState } from "react";
import {
  useGetMediaFilesQuery,
  useUploadMediaFileMutation,
  useDeleteMediaFileMutation,
  MediaItem,
} from "@/services/media";
import { Search, Upload, Copy, Trash2, Check, FileText, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function MediaLibraryPage() {
  const [search, setSearch] = useState("");
  const { data: mediaFiles = [], isLoading } = useGetMediaFilesQuery({ search });
  const [uploadMediaFile, { isLoading: isUploading }] = useUploadMediaFileMutation();
  const [deleteMediaFile] = useDeleteMediaFileMutation();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadMediaFile(formData).unwrap();
      toast.success("File uploaded to Media Library!");
    } catch (err) {
      toast.error("Failed to upload file.");
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (folder: string, filename: string) => {
    if (!confirm("Are you sure you want to delete this media file?")) return;
    try {
      await deleteMediaFile({ folder, filename }).unwrap();
      toast.success("Media file deleted!");
      if (selectedItem?.filename === filename) setSelectedItem(null);
    } catch (err) {
      toast.error("Failed to delete media file.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (isLoading) return <div className="p-4 text-center text-slate-500">Loading Media Library...</div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Central Media Library</h1>
          <p className="text-sm text-slate-500">View, upload, reuse, and manage website images & files</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-secondary w-64"
            />
          </div>

          <label className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-bold shadow cursor-pointer">
            <Upload size={18} />
            {isUploading ? "Uploading..." : "Upload Media"}
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Media Grid */}
      {mediaFiles.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border text-center text-slate-400">
          No media files found in library. Upload images to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaFiles.map((file) => {
            const isImage = file.mimeType.startsWith("image/");
            return (
              <div
                key={file.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow transition group flex flex-col justify-between"
              >
                <div
                  onClick={() => setSelectedItem(file)}
                  className="relative aspect-square bg-slate-50 cursor-pointer flex items-center justify-center p-2 border-b"
                >
                  {isImage ? (
                    <Image
                      src={getImageUrl(file.url)}
                      alt={file.filename}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <FileText size={36} className="text-slate-400" />
                  )}
                  <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    {file.folder}
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  <p className="text-xs font-semibold text-slate-800 truncate" title={file.filename}>
                    {file.filename}
                  </p>
                  <p className="text-[11px] text-slate-400">{formatFileSize(file.size)}</p>

                  <div className="flex justify-between items-center pt-1 border-t">
                    <button
                      onClick={() => handleCopyUrl(file.url, file.id)}
                      className="text-slate-500 hover:text-secondary p-1 rounded hover:bg-slate-100 flex items-center gap-1 text-[11px]"
                      title="Copy Image URL"
                    >
                      {copiedId === file.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      {copiedId === file.id ? "Copied" : "Copy"}
                    </button>
                    <button
                      onClick={() => handleDelete(file.folder, file.filename)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-800 truncate max-w-md">{selectedItem.filename}</h3>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border">
              {selectedItem.mimeType.startsWith("image/") ? (
                <Image
                  src={getImageUrl(selectedItem.url)}
                  alt={selectedItem.filename}
                  fill
                  className="object-contain"
                />
              ) : (
                <FileText size={64} className="text-slate-400" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border">
              <div><strong className="text-slate-800">Folder:</strong> {selectedItem.folder}</div>
              <div><strong className="text-slate-800">Size:</strong> {formatFileSize(selectedItem.size)}</div>
              <div><strong className="text-slate-800">MIME Type:</strong> {selectedItem.mimeType}</div>
              <div><strong className="text-slate-800">Uploaded:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handleCopyUrl(selectedItem.url, selectedItem.id)}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark text-xs font-bold"
              >
                <Copy size={14} /> Copy Public URL
              </button>
              <button
                onClick={() => handleDelete(selectedItem.folder, selectedItem.filename)}
                className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 text-xs font-bold"
              >
                <Trash2 size={14} /> Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

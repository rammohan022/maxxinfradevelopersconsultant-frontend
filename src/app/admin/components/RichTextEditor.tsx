"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import { useUploadMediaFileMutation } from "@/services/media";
import { getImageUrl } from "@/lib/utils/imageUtils";
import toast from "react-hot-toast";
import {
  Table as TableIcon,
  Trash2,
  Loader2,
  Columns,
  Rows,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  className = "",
  minHeight = "350px",
}: RichTextEditorProps) {
  const quillRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadMediaFile, { isLoading: isUploadingImage }] = useUploadMediaFileMutation();

  // Dynamic import on client mount to bypass SSR and maintain class ref
  const [ReactQuill, setReactQuill] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    import("react-quill-new").then((mod) => {
      if (isMounted) {
        setReactQuill(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Table popover & custom table modal states
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Helper to ensure editor is focused with valid selection range
  const getFocusRange = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return null;
    quill.focus();
    let range = quill.getSelection();
    if (!range) {
      const length = quill.getLength();
      range = { index: length > 0 ? length - 1 : 0, length: 0 };
      quill.setSelection(range.index, 0);
    }
    return { quill, range };
  };

  // Image Upload Handler: Uploads image file to /media/upload and inserts at cursor
  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be selected again
    e.target.value = "";

    const focus = getFocusRange();
    if (!focus) return;
    const { quill, range } = focus;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Uploading image...");
    try {
      const res = await uploadMediaFile(formData).unwrap();
      const fullUrl = getImageUrl(res.url);

      quill.insertEmbed(range.index, "image", fullUrl);
      quill.setSelection(range.index + 1);
      toast.success("Image uploaded & inserted!", { id: toastId });
    } catch (err: any) {
      // Fallback: Read local file as base64 so user is never blocked
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          quill.insertEmbed(range.index, "image", reader.result);
          quill.setSelection(range.index + 1);
          toast.success("Image inserted locally!", { id: toastId });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Table Insert Handler
  const handleInsertTable = (rows = 3, cols = 3) => {
    const focus = getFocusRange();
    if (!focus) return;
    const { quill } = focus;

    const tableModule = quill.getModule("table");
    if (tableModule) {
      tableModule.insertTable(Math.max(1, rows), Math.max(1, cols));
      toast.success(`Inserted ${rows}×${cols} Table!`);
    } else {
      toast.error("Table module is initializing...");
    }
    setShowTableModal(false);
    setShowTableMenu(false);
  };

  // Table Actions (Row/Column add/delete)
  const runTableAction = (action: string) => {
    const focus = getFocusRange();
    if (!focus) return;
    const { quill } = focus;
    const tableModule = quill.getModule("table");

    if (!tableModule) {
      toast.error("Table module not available");
      return;
    }

    try {
      switch (action) {
        case "row-below":
          tableModule.insertRowBelow();
          break;
        case "row-above":
          tableModule.insertRowAbove();
          break;
        case "col-right":
          tableModule.insertColumnRight();
          break;
        case "col-left":
          tableModule.insertColumnLeft();
          break;
        case "del-row":
          tableModule.deleteRow();
          break;
        case "del-col":
          tableModule.deleteColumn();
          break;
        case "del-table":
          tableModule.deleteTable();
          setShowTableMenu(false);
          break;
      }
    } catch (e: any) {
      toast.error("Click inside a table cell first!");
    }
  };

  // Single unified Quill toolbar configuration
  const modules = useMemo(
    () => ({
      table: true,
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "table"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            fileInputRef.current?.click();
          },
          table: () => {
            setShowTableMenu((prev) => !prev);
          },
        },
      },
    }),
    []
  );

  return (
    <div className={`rich-editor-wrapper bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs relative ${className}`}>
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileSelect}
      />

      {/* Table Management Popover (Only appears when Table button is clicked in toolbar) */}
      {showTableMenu && (
        <div className="bg-amber-50/90 border-b border-amber-200/90 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-amber-950 flex items-center gap-1 text-[11px] mr-1">
              <TableIcon size={13} className="text-primary" /> Table Options:
            </span>
            <button
              type="button"
              onClick={() => handleInsertTable(3, 3)}
              className="px-2.5 py-1 rounded bg-primary hover:bg-primary-dark text-white font-semibold transition-colors cursor-pointer text-xs shadow-2xs"
            >
              + 3×3 Table
            </button>
            <button
              type="button"
              onClick={() => setShowTableModal((v) => !v)}
              className="px-2.5 py-1 rounded bg-white border border-amber-200 hover:bg-amber-100/70 text-amber-900 font-semibold transition-colors cursor-pointer text-xs"
            >
              Custom Size...
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] text-amber-800 font-medium mr-1 hidden sm:inline">Modify Table:</span>
            <button
              type="button"
              onClick={() => runTableAction("row-below")}
              className="px-2 py-1 rounded bg-white border border-amber-200 hover:bg-amber-100 text-[11px] font-semibold text-slate-700 cursor-pointer"
              title="Add a new row below current cell"
            >
              + Row
            </button>
            <button
              type="button"
              onClick={() => runTableAction("col-right")}
              className="px-2 py-1 rounded bg-white border border-amber-200 hover:bg-amber-100 text-[11px] font-semibold text-slate-700 cursor-pointer"
              title="Add a new column to right of current cell"
            >
              + Col
            </button>
            <button
              type="button"
              onClick={() => runTableAction("del-row")}
              className="px-2 py-1 rounded bg-white border border-red-200 hover:bg-red-50 text-[11px] font-semibold text-red-600 cursor-pointer"
              title="Delete current row"
            >
              - Row
            </button>
            <button
              type="button"
              onClick={() => runTableAction("del-col")}
              className="px-2 py-1 rounded bg-white border border-red-200 hover:bg-red-50 text-[11px] font-semibold text-red-600 cursor-pointer"
              title="Delete current column"
            >
              - Col
            </button>
            <button
              type="button"
              onClick={() => runTableAction("del-table")}
              className="px-2 py-1 rounded bg-white border border-red-200 hover:bg-red-50 text-red-600 text-[11px] font-semibold cursor-pointer"
              title="Delete entire table"
            >
              <Trash2 size={11} className="inline mr-0.5" /> Table
            </button>
            <button
              type="button"
              onClick={() => setShowTableMenu(false)}
              className="ml-2 px-1.5 py-0.5 text-slate-400 hover:text-slate-700 font-bold text-xs cursor-pointer"
              title="Close table menu"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Popover for Custom Table Size */}
      {showTableModal && (
        <div className="bg-amber-50 border-b border-amber-200 p-2.5 px-3 flex flex-wrap items-center gap-3 text-xs animate-in fade-in duration-200">
          <span className="font-bold text-amber-900">Custom Table Size:</span>
          <div className="flex items-center gap-1.5">
            <Rows size={14} className="text-amber-700" />
            <label className="text-slate-600 font-semibold">Rows:</label>
            <input
              type="number"
              min={1}
              max={25}
              value={tableRows}
              onChange={(e) => setTableRows(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-14 px-2 py-1 border border-slate-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Columns size={14} className="text-amber-700" />
            <label className="text-slate-600 font-semibold">Columns:</label>
            <input
              type="number"
              min={1}
              max={15}
              value={tableCols}
              onChange={(e) => setTableCols(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-14 px-2 py-1 border border-slate-300 rounded bg-white text-center font-bold"
            />
          </div>
          <button
            type="button"
            onClick={() => handleInsertTable(tableRows, tableCols)}
            className="px-3.5 py-1 bg-primary hover:bg-primary-dark text-white rounded font-bold transition-colors cursor-pointer"
          >
            Insert Table
          </button>
          <button
            type="button"
            onClick={() => setShowTableModal(false)}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ReactQuill Editor with Spaced Out Height */}
      <div
        className="rich-editor-inner"
        style={{ ["--editor-min-height" as any]: minHeight }}
      >
        {ReactQuill ? (
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            modules={modules}
            className="bg-white"
          />
        ) : (
          <div
            style={{ minHeight }}
            className="w-full flex items-center justify-center bg-slate-50 border-t border-slate-200 text-xs text-slate-400"
          >
            <Loader2 className="w-5 h-5 animate-spin mr-2 text-primary" /> Loading Editor...
          </div>
        )}
      </div>
    </div>
  );
}

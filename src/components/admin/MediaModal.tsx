"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Loader2, Image as ImageIcon, Trash2, Copy, Search } from "lucide-react";
import { toast } from "sonner";

export interface MediaItem {
  public_id: string;
  url: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt?: string;
}

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: { url: string; alt?: string; caption?: string }) => void;
  title?: string;
}

export default function MediaModal({
  isOpen,
  onClose,
  onSelectImage,
  title = "Select from Media Library",
}: MediaModalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media?max_results=60");
      const data = await res.json();
      if (data.resources) {
        setMediaList(data.resources);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
      toast.error("Failed to load media assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: FileList | null = null;
    if ("dataTransfer" in e) {
      e.preventDefault();
      files = e.dataTransfer.files;
    } else if (e.target.files) {
      files = e.target.files;
    }

    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      toast.success("Image uploaded successfully!");
      await fetchMedia();
      setSelectedItem({
        public_id: data.public_id,
        url: data.url,
      });
      setActiveTab("library");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload error";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (publicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this media asset?")) return;

    try {
      const res = await fetch(`/api/media?public_id=${encodeURIComponent(publicId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Asset deleted");
        setMediaList((prev) => prev.filter((item) => item.public_id !== publicId));
        if (selectedItem?.public_id === publicId) {
          setSelectedItem(null);
        }
      }
    } catch {
      toast.error("Failed to delete media");
    }
  };

  const handleConfirmSelection = () => {
    if (!selectedItem) return;
    onSelectImage({
      url: selectedItem.url,
      alt: altText || "Gosvizzera Healthcare Article Image",
      caption: caption || "",
    });
    onClose();
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((item) =>
    item.public_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">{title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Cloudinary Storage (Folder: <code className="text-brand dark:text-teal-400">gosvizzera/blogs</code>)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("library")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all ${
                activeTab === "library"
                  ? "bg-brand dark:bg-teal-500 text-white dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Media Library ({mediaList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all ${
                activeTab === "upload"
                  ? "bg-brand dark:bg-teal-500 text-white dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Upload New
            </button>
          </div>

          {activeTab === "library" && (
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Main Grid or Upload Area */}
          <div className={`${selectedItem ? "md:col-span-8" : "md:col-span-12"} p-6 overflow-y-auto h-full`}>
            {activeTab === "upload" ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileUpload}
                onClick={() => fileInputRef.current?.click()}
                className="h-full min-h-[300px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-brand dark:hover:border-teal-400 bg-slate-50/50 dark:bg-slate-800/30 transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                {uploading ? (
                  <div className="space-y-3">
                    <Loader2 className="w-10 h-10 animate-spin text-brand dark:text-teal-400 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-sans">
                      Uploading to Cloudinary...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-w-sm">
                    <div className="w-14 h-14 rounded-2xl bg-brand/10 dark:bg-teal-400/10 text-brand dark:text-teal-300 flex items-center justify-center mx-auto">
                      <Upload className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-sans">
                      Click to upload or drag & drop image
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      PNG, JPG, WEBP or SVG up to 10MB. Files are stored under <code className="text-brand dark:text-teal-400">gosvizzera/blogs</code>.
                    </p>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-brand dark:text-teal-400" />
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-3">
                <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">No images found.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className="text-xs font-bold text-brand dark:text-teal-300 underline"
                >
                  Upload your first image &rarr;
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredMedia.map((item) => {
                  const isSelected = selectedItem?.public_id === item.public_id;
                  return (
                    <div
                      key={item.public_id}
                      onClick={() => setSelectedItem(item)}
                      className={`group relative aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isSelected
                          ? "border-brand dark:border-teal-400 ring-2 ring-brand/30 dark:ring-teal-400/30 scale-[0.98]"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
                      }`}
                    >
                      <Image
                        src={item.url}
                        alt={item.public_id}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />

                      {/* Selected check badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand dark:bg-teal-400 text-white dark:text-slate-950 flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(item.url);
                            toast.success("Image URL copied!");
                          }}
                          className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-brand transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteMedia(item.public_id, e)}
                          className="p-1.5 rounded-lg bg-rose-600/90 text-white hover:bg-rose-700 transition-colors"
                          title="Delete from Cloudinary"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Preview & Metadata Panel */}
          {selectedItem && (
            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/70 overflow-y-auto space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                  Selected Image
                </h4>

                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <Image
                    src={selectedItem.url}
                    alt="Selected preview"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Alt Text (for SEO & Accessibility)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Healthcare RCM denial management chart"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Caption (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Figure 1: 2026 MGMA Benchmark"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 break-all text-[10px] text-slate-500 font-mono">
                    {selectedItem.url}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Deselect
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSelection}
                  className="flex-1 py-2 px-3 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  Insert Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Search, Trash2, Copy, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MediaResource {
  public_id: string;
  url: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt?: string;
}

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media?max_results=100");
      const data = await res.json();
      if (data.resources) {
        setMediaList(data.resources);
      }
    } catch {
      toast.error("Failed to load media assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
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
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || `Failed to upload ${file.name}`);
        }
      }

      toast.success("Images uploaded to Cloudinary (gosvizzera/blogs)!");
      await fetchMedia();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload error";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to permanently delete this image?")) return;

    try {
      const res = await fetch(`/api/media?public_id=${encodeURIComponent(publicId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Image deleted");
        setMediaList((prev) => prev.filter((item) => item.public_id !== publicId));
      }
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const filtered = mediaList.filter((item) =>
    item.public_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
            Cloudinary Media Library
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Images stored in folder <code className="text-brand dark:text-teal-400">gosvizzera/blogs</code> ({mediaList.length} assets)
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 font-bold text-xs shadow-md hover:opacity-90 transition-all disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>Upload Image</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleUpload}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center cursor-pointer hover:border-brand dark:hover:border-teal-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all"
      >
        <div className="max-w-sm mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
            Drag & drop images here, or click to browse
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            Supports PNG, JPG, WebP, SVG. Automatically optimized via Cloudinary CDN.
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search media files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
        <span className="text-xs text-slate-400 font-sans">{filtered.length} items shown</span>
      </div>

      {/* Media Grid */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand dark:text-teal-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-sm text-slate-500 font-sans">No media assets found in library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <div
                key={item.public_id}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950"
              >
                <Image
                  src={item.url}
                  alt={item.public_id}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.public_id)}
                      className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-white font-mono truncate">{item.public_id}</p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        toast.success("CDN URL copied!");
                      }}
                      className="w-full py-1.5 rounded-lg bg-white/90 text-slate-900 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

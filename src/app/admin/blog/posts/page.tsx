"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  FileText,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface PostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: "Draft" | "Published";
  isFeatured: boolean;
  author?: { name?: string; avatar?: string };
  category?: Array<{ _id: string; name: string; slug: string }>;
  createdAt: string;
  updatedAt: string;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
}

export default function AdminPostsListPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.append("status", statusFilter);
      if (categoryFilter !== "All") params.append("category", categoryFilter);
      if (search.trim()) params.append("search", search.trim());
      params.append("limit", "100");

      const res = await fetch(`/api/blog/posts?${params.toString()}`);
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load posts:", err);
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter, categoryFilter]);

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/blog/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Article deleted successfully");
        setPosts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("Failed to delete article");
      }
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
            All Articles
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Manage your published articles, drafts, and SEO configuration ({posts.length} Total)
          </p>
        </div>

        <Link
          href="/admin/blog/posts/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 font-bold text-xs shadow-md hover:opacity-90 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or excerpt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40 font-sans"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {["All", "Published", "Draft"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all ${
                statusFilter === st
                  ? "bg-white dark:bg-slate-900 text-brand dark:text-teal-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand dark:text-teal-400" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-sans">
              No articles match your filter.
            </p>
            <p className="text-xs text-slate-400 font-sans">
              Try adjusting your search query or create a new article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-slate-900/50">
                  <th className="py-3.5 px-4 font-semibold">Title & Slug</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Author</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-4 max-w-[320px]">
                      <div className="flex items-start gap-2">
                        {post.isFeatured && (
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <Link
                            href={`/admin/blog/posts/${post._id}`}
                            className="font-bold text-slate-900 dark:text-white hover:text-brand dark:hover:text-teal-300 line-clamp-1 text-sm"
                          >
                            {post.title}
                          </Link>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {post.category && post.category.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {post.category.slice(0, 2).map((cat) => (
                            <span
                              key={cat._id}
                              className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                      {post.author?.name || "Svizzera Editorial"}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          post.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4 text-right space-x-1.5">
                      {post.status === "Published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 rounded-xl text-slate-500 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}

                      <Link
                        href={`/admin/blog/posts/${post._id}`}
                        className="p-2 rounded-xl text-slate-500 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeletePost(post._id, post.title)}
                        disabled={deletingId === post._id}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 inline-flex items-center disabled:opacity-50"
                        title="Delete Article"
                      >
                        {deletingId === post._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

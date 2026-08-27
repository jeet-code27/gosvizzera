"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  FolderTree,
  Image as ImageIcon,
  PlusCircle,
  ArrowRight,
  Loader2,
  ExternalLink,
  Edit,
  Star,
  Inbox,
} from "lucide-react";

interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  status: "Draft" | "Published";
  isFeatured: boolean;
  author?: { name?: string };
  category?: Array<{ name?: string }>;
  createdAt: string;
}

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [tagsCount, setTagsCount] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [postsRes, catRes, tagRes, leadsRes] = await Promise.all([
          fetch("/api/blog/posts?limit=5"),
          fetch("/api/blog/categories"),
          fetch("/api/blog/tags"),
          fetch("/api/leads"),
        ]);

        const [postsData, catData, tagData, leadsData] = await Promise.all([
          postsRes.json(),
          catRes.json(),
          tagRes.json(),
          leadsRes.json(),
        ]);

        if (postsData.posts) setPosts(postsData.posts);
        if (catData.categories) setCategoriesCount(catData.categories.length);
        if (tagData.tags) setTagsCount(tagData.tags.length);
        if (leadsData.stats) {
          setLeadsCount(leadsData.stats.total || 0);
          setNewLeadsCount(leadsData.stats.new || 0);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === "Published").length;
  const draftPosts = posts.filter((p) => p.status === "Draft").length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900/40 via-slate-900 to-slate-900 border border-teal-500/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-sans">
            Gosvizzera RCM Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
            Blog & Content Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light max-w-xl">
            Create, publish, and manage SEO-optimized healthcare articles, FAQs, and Cloudinary media assets.
          </p>
        </div>

        <Link
          href="/admin/blog/posts/create"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Link
          href="/admin/blog/leads"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-400 group-hover:scale-105 transition-transform">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">Strategy Leads</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "-" : leadsCount}
              {newLeadsCount > 0 && (
                <span className="ml-1.5 text-xs font-bold text-teal-500">({newLeadsCount} new)</span>
              )}
            </h3>
          </div>
        </Link>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Articles</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "-" : totalPosts}
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Published</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "-" : publishedPosts}
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Drafts</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "-" : draftPosts}
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Categories / Tags</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "-" : `${categoriesCount} / ${tagsCount}`}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        <Link
          href="/admin/blog/leads"
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Inbox className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Strategy Call Leads
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
              View incoming consultation inquiries, change status, or export to CSV.
            </p>
          </div>
        </Link>
        <Link
          href="/admin/blog/posts"
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand dark:hover:border-teal-400 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Manage Articles
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
              Search, filter, update drafts, or publish new healthcare articles.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/blog/categories"
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand dark:hover:border-teal-400 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FolderTree className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Categories & Tags
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
              Organize medical specialties, coding topics, and compliance tags.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/blog/media"
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand dark:hover:border-teal-400 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Cloudinary Media Library
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
              Browse, upload, and manage images stored in <code className="text-brand">gosvizzera/blogs</code>.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Activity / Posts Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Recent Articles
          </h2>
          <Link
            href="/admin/blog/posts"
            className="text-xs font-semibold text-brand dark:text-teal-400 hover:underline"
          >
            View All &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-brand dark:text-teal-400" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-xs text-slate-500 font-sans">No posts created yet.</p>
            <Link
              href="/admin/blog/posts/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 text-xs font-bold"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Author</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Created</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {posts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white max-w-[280px] truncate">
                      <div className="flex items-center gap-2">
                        {p.isFeatured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />}
                        <span className="truncate">{p.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {p.category && p.category.length > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                          {p.category[0].name}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3.5 text-slate-500">{p.author?.name || "Svizzera Team"}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <Link
                        href={`/admin/blog/posts/${p._id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      {p.status === "Published" && (
                        <Link
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center"
                          title="View on Public Blog"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
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

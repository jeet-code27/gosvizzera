"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, FileText, Calendar, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface PostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: { url?: string; alt?: string };
  author?: { name?: string; avatar?: string; role?: string };
  category?: Array<{ _id: string; name: string; slug: string }>;
  tags?: Array<{ _id: string; name: string; slug: string }>;
  createdAt: string;
}

interface BlogClientViewProps {
  posts: PostItem[];
  categories: Category[];
}

export default function BlogClientView({ posts, categories }: BlogClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" ||
      post.category?.some((cat) => cat.slug === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pt-4">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all ${
              selectedCategory === "all"
                ? "bg-brand dark:bg-teal-500 text-white dark:text-slate-950 shadow-md shadow-brand/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
            }`}
          >
            All Articles ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category?.some((c) => c.slug === cat.slug)).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all ${
                  isSelected
                    ? "bg-brand dark:bg-teal-500 text-white dark:text-slate-950 shadow-md shadow-brand/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search RCM articles & guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40 font-sans shadow-xs"
          />
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 font-sans">
            No articles match your criteria
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm mx-auto">
            Try adjusting your search keywords or select a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Card Image with Hover Zoom */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden"
                  >
                    {post.featuredImage?.url ? (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-950/20 to-slate-900 text-teal-400 font-serif text-xl">
                        gosvizzera
                      </div>
                    )}

                    {/* Category Pill on Image */}
                    {post.category && post.category.length > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-teal-300 shadow-xs border border-white/10 uppercase tracking-wider">
                          {post.category[0].name}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed line-clamp-3">
                      {post.excerpt || post.content?.replace(/<[^>]+>/g, "").slice(0, 120) + "..."}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Author + Date + Read Link */}
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-teal-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {post.author?.name ? post.author.name.charAt(0) : "S"}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      <p className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {post.author?.name || "Editorial Team"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-brand group-hover:text-white dark:group-hover:bg-teal-400 dark:group-hover:text-slate-950 transition-colors shadow-xs"
                    aria-label={`Read article: ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Category from "@/lib/models/Category";
import { Calendar, Clock, ArrowRight, Star, Search, Sparkles } from "lucide-react";
import BlogClientView from "@/components/blog/BlogClientView";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Healthcare RCM & Medical Billing Insights | gosvizzera Blog",
  description:
    "Expert articles, industry benchmarks, and actionable guides on Revenue Cycle Management, Prior Authorization, Medical Coding, and Claims Denial Prevention.",
  openGraph: {
    title: "Healthcare RCM & Medical Billing Insights | gosvizzera Blog",
    description:
      "Expert articles, industry benchmarks, and actionable guides on Revenue Cycle Management, Prior Authorization, Medical Coding, and Claims Denial Prevention.",
    url: "https://gosvizzera.com/blog",
    siteName: "gosvizzera",
    images: [
      {
        url: "/images/gosvizzera-og.png",
        width: 1200,
        height: 630,
        alt: "gosvizzera Healthcare Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const revalidate = 60; // ISR 60 seconds

export default async function BlogPage() {
  await connectToDatabase();

  // Fetch all published posts
  const postsRaw = await Post.find({ status: "Published" })
    .populate("author", "name avatar role")
    .populate("category", "name slug")
    .populate("tags", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  const categoriesRaw = await Category.find().sort({ name: 1 }).lean();

  // Serialize objects for client hydration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = JSON.parse(JSON.stringify(postsRaw)) as any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = JSON.parse(JSON.stringify(categoriesRaw)) as any[];

  // Find featured post or latest post
  const featuredPost = posts.find((p) => p.isFeatured) || posts[0] || null;
  const regularPosts = featuredPost ? posts.filter((p) => p._id !== featuredPost._id) : posts;

  return (
    <>
      <main className="min-h-screen bg-transparent pt-12 pb-24">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-teal-500/5 dark:bg-teal-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KNOWLEDGE & INDUSTRY INSIGHTS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Healthcare Revenue Cycle.{" "}
            <span className="italic text-brand dark:text-teal-400">Expert Perspectives.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Practical strategies, regulatory updates, and benchmark analyses to help healthcare leaders optimize clinical cash flow and eliminate preventable denials.
          </p>
        </div>

        {/* Featured Hero Article Spotlight */}
        {featuredPost && (
          <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Featured Image */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] bg-slate-100 dark:bg-slate-950 overflow-hidden">
                {featuredPost.featuredImage?.url ? (
                  <Image
                    src={featuredPost.featuredImage.url}
                    alt={featuredPost.featuredImage.alt || featuredPost.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-900/20 to-slate-900 text-teal-400/50 font-serif text-3xl">
                    gosvizzera
                  </div>
                )}

                {/* Featured Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Featured Insight</span>
                </div>
              </div>

              {/* Featured Content Details */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Category Pill */}
                  {featuredPost.category && featuredPost.category.length > 0 && (
                    <span className="inline-block px-3 py-1 rounded-full bg-brand/10 dark:bg-teal-400/10 text-brand dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                      {featuredPost.category[0].name}
                    </span>
                  )}

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300 transition-colors leading-snug">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed line-clamp-3">
                    {featuredPost.excerpt ||
                      featuredPost.content?.replace(/<[^>]+>/g, "").slice(0, 160) + "..."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featuredPost.author?.avatar && (
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name || "Author"}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {featuredPost.author?.name || "Svizzera Editorial Team"}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-sans mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />5 min read
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand dark:text-teal-300 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client-Side Category Filtering & Live Search Grid */}
        <BlogClientView posts={regularPosts} categories={categories} />
      </div>
    </main>

    <Footer />
  </>
  );
}

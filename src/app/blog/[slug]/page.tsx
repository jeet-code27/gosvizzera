import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Category from "@/lib/models/Category";
import Tag from "@/lib/models/Tag";
import Author from "@/lib/models/Author";
import {
  Calendar,
  Clock,
  ChevronRight,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import ArticleContentWithTOC from "@/components/blog/ArticleContentWithTOC";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR 60 seconds

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  void Category;
  void Tag;
  void Author;

  const post = await Post.findOne({ slug, status: "Published" })
    .populate("author", "name avatar role")
    .populate("category", "name slug")
    .lean();

  if (!post) {
    return {
      title: "Article Not Found | gosvizzera",
      description: "The requested healthcare article could not be found.",
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription || post.excerpt || `${post.title} - Healthcare Insights by gosvizzera`;
  const canonicalUrl = post.seo?.canonicalUrl || `https://gosvizzera.com/blog/${post.slug}`;
  const ogImage = post.seo?.ogImage || post.featuredImage?.url || "/images/gosvizzera-og.png";

  return {
    title: `${title} | gosvizzera`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noIndex,
    },
    openGraph: {
      title: post.seo?.ogTitle || title,
      description: post.seo?.ogDescription || description,
      url: `https://gosvizzera.com/blog/${post.slug}`,
      siteName: "gosvizzera Healthcare Solutions",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || title,
        },
      ],
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authors: [(post.author as any)?.name || "Svizzera Editorial Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.twitterCard?.title || title,
      description: post.seo?.twitterCard?.description || description,
      images: [post.seo?.twitterCard?.image || ogImage],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  await connectToDatabase();
  void Category;
  void Tag;
  void Author;

  const postRaw = await Post.findOne({ slug, status: "Published" })
    .populate("author", "name avatar role bio")
    .populate("category", "name slug")
    .populate("tags", "name slug")
    .populate("relatedPosts", "title slug excerpt featuredImage createdAt")
    .lean();

  if (!postRaw) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = JSON.parse(JSON.stringify(postRaw)) as any;

  // Fetch 3 related posts if not manually selected
  let relatedArticles = post.relatedPosts || [];
  if (relatedArticles.length === 0 && post.category && post.category.length > 0) {
    const fallbackRelated = await Post.find({
      _id: { $ne: post._id },
      category: post.category[0]._id,
      status: "Published",
    })
      .limit(3)
      .select("title slug excerpt featuredImage createdAt")
      .lean();
    relatedArticles = JSON.parse(JSON.stringify(fallbackRelated));
  }

  // JSON-LD: Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.seo?.metaDescription,
    image: post.featuredImage?.url || "https://gosvizzera.com/images/gosvizzera-og.png",
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "Svizzera Editorial Team",
      jobTitle: post.author?.role || "Healthcare Billing Consultant",
    },
    publisher: {
      "@type": "Organization",
      name: "gosvizzera Healthcare Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://gosvizzera.com/images/gosvizzera-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gosvizzera.com/blog/${post.slug}`,
    },
  };

  // JSON-LD: FAQPage Schema (if dynamic FAQs exist)
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq: { question: string; answer: string }) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Inject Structured Data Schemas */}
      <script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-transparent pt-6 sm:pt-10 pb-24">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-teal-500/5 dark:bg-teal-400/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Breadcrumb Navigation Bar */}
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-sans shadow-xs">
            <Link href="/" className="hover:text-brand dark:hover:text-teal-300 flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
            <Link href="/blog" className="hover:text-brand dark:hover:text-teal-300 transition-colors">
              Blog
            </Link>
            {post.category && post.category.length > 0 && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                <span className="text-brand dark:text-teal-400 font-semibold truncate max-w-[180px] sm:max-w-none">
                  {post.category[0].name}
                </span>
              </>
            )}
          </nav>

          {/* Article Header Section */}
          <header className="max-w-4xl space-y-6 sm:space-y-7">
            {/* Category Signal Pill */}
            {post.category && post.category.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-bold uppercase tracking-wider font-sans">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>{post.category[0].name}</span>
              </div>
            )}

            {/* Article Headline in Bodoni Moda */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-900 dark:text-white leading-[1.14] tracking-tight">
              {post.title}
            </h1>

            {/* Article Excerpt in Lato */}
            {post.excerpt && (
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author Info Bar & Reading Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-teal-500 text-white flex items-center justify-center font-bold text-base shadow-md shadow-brand/20 flex-shrink-0">
                  {post.author?.name ? post.author.name.charAt(0) : "S"}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans">
                      {post.author?.name || "Svizzera Editorial Team"}
                    </p>
                    <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    {post.author?.role || "Healthcare Billing & RCM Specialist"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />5 min read
                </span>
              </div>
            </div>
          </header>

          {/* Featured Cover Image with Ambient Backdrop Glow */}
          {post.featuredImage?.url && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-brand/20 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-video max-h-[540px] w-full rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-slate-950">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  priority
                  className="object-cover"
                />
                {post.featuredImage.caption && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-white/90 font-sans">
                    {post.featuredImage.caption}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main 2-Column Layout: Article Content + Sticky Sidebar TOC & Share */}
          <ArticleContentWithTOC post={post} />

          {/* Author Bio Box */}
          {post.author && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-brand/20 flex-shrink-0">
                {post.author.name ? post.author.name.charAt(0) : "S"}
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                  Published by Expert Contributor
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                  <span>{post.author.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  {post.author.bio ||
                    "Senior revenue cycle advisor and healthcare operations consultant at Svizzera Healthcare Solutions. Specializes in claims denial prevention, payer contract compliance, and end-to-end medical billing workflows."}
                </p>
              </div>
            </div>
          )}

          {/* Related Articles Section */}
          {relatedArticles && relatedArticles.length > 0 && (
            <section className="pt-12 border-t border-slate-200/80 dark:border-slate-800 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                    Recommended Reading
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                    Related Healthcare Insights
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-brand dark:text-teal-300 hover:underline flex items-center gap-1"
                >
                  <span>View all articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel: { _id: string; title: string; slug: string; excerpt?: string; featuredImage?: { url?: string } }) => (
                  <Link
                    key={rel._id}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      {rel.featuredImage?.url && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <Image
                            src={rel.featuredImage.url}
                            alt={rel.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      {rel.excerpt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-sans font-light leading-relaxed">
                          {rel.excerpt}
                        </p>
                      )}
                    </div>

                    <span className="text-xs font-bold text-brand dark:text-teal-300 flex items-center gap-1 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span>Read Insight</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Consultation CTA Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 border border-teal-500/20 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-xl text-center md:text-left z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider font-sans">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Streamline Your Healthcare RCM</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal leading-tight">
                Stop Losing Revenue to Authorization Delays & Denials
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed">
                Partner with Svizzera’s dedicated team of certified coders and billing specialists. Works securely inside your existing EHR with zero disruption.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm font-sans shadow-xl shadow-teal-500/20 transition-all flex-shrink-0 z-10"
            >
              Schedule Free Strategy Call &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

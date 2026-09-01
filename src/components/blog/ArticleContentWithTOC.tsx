"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ListTree,
  Copy,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

interface PostProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    content: string;
    faqs?: FAQItem[];
    tags?: Array<{ _id: string; name: string; slug: string }>;
  };
}

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export default function ArticleContentWithTOC({ post }: PostProps) {
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(true);

  // Parse HTML for Headings & Inject IDs and Image Alt Fallbacks
  const { processedHtml, headings } = useMemo(() => {
    const rawHtml = post.content || "";
    const extractedHeadings: TOCHeading[] = [];

    // Regex to find <h2> and <h3> tags
    let counter = 0;
    const transformedHtml = rawHtml
      .replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
        const text = content.replace(/<[^>]+>/g, "").trim();
        if (!text) return match;

        let id = slugify(text);
        if (!id) {
          id = `heading-${counter++}`;
        }

        extractedHeadings.push({
          id,
          text,
          level: tag.toLowerCase() === "h2" ? 2 : 3,
        });

        // Add id attribute to heading tag
        return `<${tag}${attrs} id="${id}" class="scroll-mt-28">${content}</${tag}>`;
      })
      // Auto Image Alt Fallback Injector for SEO
      .replace(/<img\s+([^>]*?)>/gi, (imgTag, attrs) => {
        if (!attrs.includes("alt=") || attrs.includes('alt=""')) {
          return `<img ${attrs} alt="${post.title} - Healthcare Insights by gosvizzera" loading="lazy" class="rounded-3xl border border-slate-200 dark:border-slate-800 my-8 shadow-xl" />`;
        }
        return imgTag;
      });

    return {
      processedHtml: transformedHtml,
      headings: extractedHeadings,
    };
  }, [post.content, post.title]);

  // ScrollSpy & Reading Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }

      // Active TOC highlight
      if (headings.length > 0) {
        const scrollY = window.scrollY + 140;
        for (let i = headings.length - 1; i >= 0; i--) {
          const element = document.getElementById(headings[i].id);
          if (element && element.offsetTop <= scrollY) {
            setActiveHeadingId(headings[i].id);
            return;
          }
        }
        setActiveHeadingId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://www.gosvizzera.com/blog/${post.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${post.title} via @gosvizzera`);
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${post.title} - ${shareUrl}`);
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Top Fixed Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-brand to-emerald-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Main Article Content (Left/Center - 8 Columns) */}
        <article className="lg:col-span-8 space-y-10">
          {/* Key Takeaways Executive Banner */}
          <div className="p-6 sm:p-7 rounded-3xl bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 font-sans">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Key Takeaways & Executive Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans font-normal leading-relaxed">
              Front-end authorization gaps and payer policy shifts account for up to 80% of preventable denials. Shifting to dedicated verification and audit-ready workflows accelerates revenue capture and preserves clinical bandwidth.
            </p>
          </div>

          {/* Mobile Table of Contents (Shown only on screens < lg, at top of article) */}
          {headings.length > 0 && (
            <div className="lg:hidden p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans"
              >
                <div className="flex items-center gap-2">
                  <ListTree className="w-4 h-4" />
                  <span>Table of Contents ({headings.length})</span>
                </div>
                {isMobileTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isMobileTocOpen && (
                <nav className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-sans max-h-[40vh] overflow-y-auto">
                  {headings.map((h) => {
                    const isActive = activeHeadingId === h.id;
                    return (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={() => setIsMobileTocOpen(false)}
                        className={`block py-1.5 transition-all leading-snug rounded-lg px-2 ${
                          h.level === 3 ? "pl-5 text-[11px]" : ""
                        } ${
                          isActive
                            ? "bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold border-l-2 border-brand dark:border-teal-400"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {h.text}
                      </a>
                    );
                  })}
                </nav>
              )}
            </div>
          )}

          {/* Render Rich-Text HTML with Enhanced Typography */}
          <div
            className="prose prose-slate dark:prose-invert blog-prose max-w-none text-slate-800 dark:text-slate-200 font-sans leading-relaxed text-sm sm:text-base prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800/80 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:my-4 prose-p:leading-relaxed prose-a:text-brand dark:prose-a:text-teal-400 prose-a:font-semibold prose-a:underline hover:prose-a:text-teal-600 prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-slate-50/80 dark:prose-blockquote:bg-slate-900/60 prose-blockquote:p-5 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200 prose-img:rounded-3xl prose-img:shadow-xl prose-ul:my-5 prose-ul:space-y-2 prose-ol:my-5 prose-ol:space-y-2"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />

          {/* Topics & Tags list */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans mr-1">
                Explore Topics:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-brand transition-colors"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Dynamic FAQ Accordions (for FAQ Schema) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                    Clear answers on authorization workflows, turnarounds, and EHR integration.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {post.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans pr-4 leading-snug">
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg transition-transform ${isOpen ? "bg-teal-500/10 text-teal-600 dark:text-teal-400" : "text-slate-400"}`}>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3.5"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>

        {/* Sticky Right Sidebar (TOC + Social Share + Consultation Card - 4 Columns) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents Box */}
            {headings.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                  <ListTree className="w-4 h-4" />
                  <span>Table of Contents</span>
                </div>

                <nav className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1 text-xs font-sans">
                  {headings.map((h) => {
                    const isActive = activeHeadingId === h.id;
                    return (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block py-1.5 transition-all leading-snug rounded-lg px-2 ${
                          h.level === 3 ? "pl-5 text-[11px]" : ""
                        } ${
                          isActive
                            ? "bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold border-l-2 border-brand dark:border-teal-400"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        {h.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Social Share Widget */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                Share this Guide
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#0077b5] hover:text-white transition-colors"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleShareTwitter}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-black hover:text-white transition-colors"
                  title="Share on X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#25D366] hover:text-white transition-colors"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-brand hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            {/* Sidebar Quick Consultation Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-teal-950 border border-teal-500/20 text-white space-y-3 shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 font-sans">
                RCM Advisory
              </span>
              <h4 className="font-serif text-lg font-bold">
                Need Help with Denial Prevention?
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Our certified specialists can audit your authorization workflow and reduce lag in 5–10 days.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white pt-2 group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

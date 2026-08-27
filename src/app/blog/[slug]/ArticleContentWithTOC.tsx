"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ListTree,
  Share2,
  Copy,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
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
        return `<${tag}${attrs} id="${id}" class="scroll-mt-24">${content}</${tag}>`;
      })
      // Auto Image Alt Fallback Injector for SEO
      .replace(/<img\s+([^>]*?)>/gi, (imgTag, attrs) => {
        if (!attrs.includes("alt=") || attrs.includes('alt=""')) {
          return `<img ${attrs} alt="${post.title} - Healthcare Insights by gosvizzera" loading="lazy" class="rounded-2xl border border-slate-200 dark:border-slate-800 my-6 shadow-md" />`;
        }
        return imgTag;
      });

    return {
      processedHtml: transformedHtml,
      headings: extractedHeadings,
    };
  }, [post.content, post.title]);

  // ScrollSpy for Active Heading
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element && element.offsetTop <= scrollY) {
          setActiveHeadingId(headings[i].id);
          return;
        }
      }
      if (headings.length > 0) {
        setActiveHeadingId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://gosvizzera.com/blog/${post.slug}`;

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Sticky Left Sidebar: Table of Contents & Social Share */}
      <aside className="hidden lg:block lg:col-span-4 space-y-8">
        <div className="sticky top-28 space-y-6">
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                <ListTree className="w-4 h-4" />
                <span>Table of Contents</span>
              </div>

              <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1 text-xs font-sans">
                {headings.map((h) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-1 transition-colors leading-snug ${
                        h.level === 3 ? "pl-3 text-[11px]" : ""
                      } ${
                        isActive
                          ? "text-brand dark:text-teal-400 font-bold border-l-2 border-brand dark:border-teal-400 pl-2"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {h.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Social Share Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
              Share Article
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#0077b5] hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleShareTwitter}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-black hover:text-white transition-colors"
                title="Share on X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#25D366] hover:text-white transition-colors"
                title="Share on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-brand hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Article Prose Content */}
      <article className="lg:col-span-8 space-y-8">
        {/* Render Rich-Text HTML */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-sans leading-relaxed text-sm sm:text-base prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:my-4 prose-p:leading-relaxed prose-a:text-brand dark:prose-a:text-teal-400 prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/60 prose-blockquote:p-4 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-img:rounded-3xl prose-img:shadow-xl prose-ul:my-4 prose-ol:my-4"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />

        {/* Tags list */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 font-sans">Topics:</span>
            {post.tags.map((tag) => (
              <span
                key={tag._id}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Dynamic FAQ Accordions (for FAQ Schema) */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {post.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-sans pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3"
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
    </div>
  );
}

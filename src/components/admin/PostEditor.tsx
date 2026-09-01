"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Code2,
  Eye,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Search,
  Globe,
  Star,
  CheckCircle2,
  X,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import MediaModal from "./MediaModal";

interface TaxonomyItem {
  _id: string;
  name: string;
  slug: string;
}

interface AuthorItem {
  _id: string;
  name: string;
  role?: string;
  avatar?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PostData {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  author: string;
  category: string[];
  tags: string[];
  faqs: FAQItem[];
  status: "Draft" | "Published";
  isFeatured: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: {
      title?: string;
      description?: string;
      image?: string;
    };
    noIndex?: boolean;
  };
}

interface PostEditorProps {
  initialData?: PostData;
  isEdit?: boolean;
}

export default function PostEditor({ initialData, isEdit = false }: PostEditorProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || { url: "", alt: "", caption: "" }
  );
  const [author, setAuthor] = useState<string>(
    typeof initialData?.author === "object"
      ? (initialData.author as { _id?: string })._id || ""
      : initialData?.author || ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.category?.map((c) => (typeof c === "object" ? (c as { _id?: string })._id || "" : c)) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags?.map((t) => (typeof t === "object" ? (t as { _id?: string })._id || "" : t)) || []
  );
  const [faqs, setFaqs] = useState<FAQItem[]>(initialData?.faqs || []);
  const [status, setStatus] = useState<"Draft" | "Published">(initialData?.status || "Draft");
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured || false);

  // SEO state
  const [seo, setSeo] = useState({
    metaTitle: initialData?.seo?.metaTitle || "",
    metaDescription: initialData?.seo?.metaDescription || "",
    focusKeyword: initialData?.seo?.focusKeyword || "",
    canonicalUrl: initialData?.seo?.canonicalUrl || "",
    ogTitle: initialData?.seo?.ogTitle || "",
    ogDescription: initialData?.seo?.ogDescription || "",
    ogImage: initialData?.seo?.ogImage || "",
    noIndex: initialData?.seo?.noIndex || false,
  });

  // Editor mode: "visual" or "code"
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");
  const [rawHtml, setRawHtml] = useState(initialData?.content || "");

  // Media Modal state
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<"content" | "featured">("content");

  // Accordion states
  const [isSeoOpen, setIsSeoOpen] = useState(true);
  const [isFaqOpen, setIsFaqOpen] = useState(true);

  // Taxonomies from API
  const [categories, setCategories] = useState<TaxonomyItem[]>([]);
  const [tags, setTags] = useState<TaxonomyItem[]>([]);
  const [authors, setAuthors] = useState<AuthorItem[]>([]);
  const [saving, setSaving] = useState(false);

  // Inline taxonomy creation states
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isAddingAuthor, setIsAddingAuthor] = useState(false);

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      TiptapImage.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand dark:text-teal-400 underline font-medium",
        },
      }),
    ],
    content: initialData?.content || "<p>Write your article here...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setRawHtml(editor.getHTML());
    },
  });

  // Sync raw HTML when switching from Code mode to Visual mode
  const handleModeSwitch = (mode: "visual" | "code") => {
    if (mode === "visual" && editor) {
      editor.commands.setContent(rawHtml);
    }
    setEditorMode(mode);
  };

  // Fetch taxonomies
  const fetchTaxonomies = async () => {
    try {
      const [catRes, tagRes, authRes] = await Promise.all([
        fetch("/api/blog/categories"),
        fetch("/api/blog/tags"),
        fetch("/api/blog/authors"),
      ]);

      const [catData, tagData, authData] = await Promise.all([
        catRes.json(),
        tagRes.json(),
        authRes.json(),
      ]);

      if (catData.categories) setCategories(catData.categories);
      if (tagData.tags) setTags(tagData.tags);
      if (authData.authors) {
        setAuthors(authData.authors);
        if (!author && authData.authors.length > 0) {
          setAuthor(authData.authors[0]._id);
        }
      }
    } catch (err) {
      console.error("Taxonomies fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTaxonomies();
  }, []);

  // Auto-generate slug from title if new post and slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit && (!slug || slug === "")) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/--+/g, "-")
      );
    }
  };

  // Image insertion handler from Media Modal
  const handleSelectImage = (img: { url: string; alt?: string; caption?: string }) => {
    if (mediaTarget === "featured") {
      setFeaturedImage({
        url: img.url,
        alt: img.alt || title || "Featured image",
        caption: img.caption || "",
      });
      toast.success("Featured image set!");
    } else if (mediaTarget === "content" && editor) {
      editor.chain().focus().setImage({ src: img.url, alt: img.alt || "Article Image" }).run();
      toast.success("Image inserted into content!");
    }
  };

  // FAQ Handlers
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleUpdateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Inline Category Creator
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch("/api/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      const data = await res.json();
      if (res.ok && data.category) {
        setCategories([...categories, data.category]);
        setSelectedCategories([...selectedCategories, data.category._id]);
        setNewCategoryName("");
        setIsAddingCategory(false);
        toast.success(`Category "${data.category.name}" created!`);
      } else {
        toast.error(data.error || "Failed to create category");
      }
    } catch {
      toast.error("Failed to create category");
    }
  };

  // Inline Tag Creator
  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const res = await fetch("/api/blog/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTagName }),
      });
      const data = await res.json();
      if (res.ok && data.tag) {
        setTags([...tags, data.tag]);
        setSelectedTags([...selectedTags, data.tag._id]);
        setNewTagName("");
        setIsAddingTag(false);
        toast.success(`Tag "${data.tag.name}" added!`);
      } else {
        toast.error(data.error || "Failed to create tag");
      }
    } catch {
      toast.error("Failed to create tag");
    }
  };

  // Inline Author Creator
  const handleCreateAuthor = async () => {
    if (!newAuthorName.trim()) return;
    try {
      const res = await fetch("/api/blog/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newAuthorName }),
      });
      const data = await res.json();
      if (res.ok && data.author) {
        setAuthors([...authors, data.author]);
        setAuthor(data.author._id);
        setNewAuthorName("");
        setIsAddingAuthor(false);
        toast.success(`Author "${data.author.name}" added!`);
      } else {
        toast.error(data.error || "Failed to create author");
      }
    } catch {
      toast.error("Failed to create author");
    }
  };

  // Save Post Handler
  const handleSavePost = async (publishStatus?: "Draft" | "Published") => {
    if (!title.trim()) {
      toast.error("Post title is required");
      return;
    }

    const currentContent = editorMode === "visual" ? editor?.getHTML() || "" : rawHtml;

    const payload = {
      title,
      slug,
      content: currentContent,
      excerpt,
      featuredImage,
      author,
      category: selectedCategories,
      tags: selectedTags,
      faqs: faqs.filter((f) => f.question.trim() !== ""),
      status: publishStatus || status,
      isFeatured,
      seo,
    };

    try {
      setSaving(true);
      const url = isEdit && initialData?._id ? `/api/blog/posts/${initialData._id}` : "/api/blog/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to save post");
      }

      toast.success(isEdit ? "Post updated successfully!" : "Post created successfully!");
      router.push("/admin/blog/posts");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blog/posts")}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              {isEdit ? "Edit Article" : "Create New Article"}
              {isFeatured && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Status: <span className={status === "Published" ? "text-teal-600 font-bold" : "text-amber-600 font-bold"}>{status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleSavePost("Draft")}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSavePost("Published")}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 text-xs font-bold shadow-md hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{status === "Published" ? "Update Post" : "Publish Now"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Main Title, Editor, FAQs, SEO */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Title & Slug */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                placeholder="e.g. 10 Proven Strategies to Reduce Healthcare Claim Denials in 2026"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-sans text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="min-w-0">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 font-sans mb-1">
                  URL Slug (Auto-generated)
                </label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs min-w-0">
                  <span className="text-slate-400 mr-1 font-mono flex-shrink-0">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent text-slate-900 dark:text-white font-mono focus:outline-none truncate"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 font-sans">
                    Author
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsAddingAuthor(!isAddingAuthor)}
                    className="text-xs text-brand dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Author</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full min-w-0 flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40 truncate"
                  >
                    {authors.map((a) => (
                      <option key={a._id} value={a._id} className="truncate">
                        {a.name} {a.role ? `(${a.role})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Inline Author Creator */}
            {isAddingAuthor && (
              <div className="p-3 rounded-xl bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="New Author Name"
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  className="flex-1 min-w-[180px] px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={handleCreateAuthor}
                  className="px-3 py-1.5 text-xs font-bold bg-brand dark:bg-teal-500 text-white dark:text-slate-950 rounded-lg flex-shrink-0"
                >
                  Save Author
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAuthor(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
              Excerpt / Summary (for Cards & Search Snippets)
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of the article..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>

          {/* Main Tiptap Rich-Text Editor with Visual / Code Switcher */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            {/* Editor Toolbar */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1">
                {editorMode === "visual" && editor && (
                  <>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("bold")
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("italic")
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("heading", { level: 2 })
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Heading 2 (H2)"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("heading", { level: 3 })
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Heading 3 (H3)"
                    >
                      <Heading3 className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("bulletList")
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("orderedList")
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBlockquote().run()}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("blockquote")
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Blockquote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

                    <button
                      type="button"
                      onClick={() => {
                        const url = window.prompt("Enter URL:");
                        if (url) {
                          editor.chain().focus().setLink({ href: url }).run();
                        }
                      }}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        editor.isActive("link")
                          ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title="Insert Hyperlink"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMediaTarget("content");
                        setIsMediaModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-colors"
                      title="Insert Image from Cloudinary"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Add Media</span>
                    </button>
                  </>
                )}
              </div>

              {/* Dual Mode Switcher Button */}
              <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleModeSwitch("visual")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    editorMode === "visual"
                      ? "bg-white dark:bg-slate-900 text-brand dark:text-teal-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch("code")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    editorMode === "code"
                      ? "bg-white dark:bg-slate-900 text-brand dark:text-teal-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>HTML Code</span>
                </button>
              </div>
            </div>

            {/* Editor Canvas Area */}
            <div className="p-6 min-h-[420px] max-h-[700px] overflow-y-auto">
              {editorMode === "visual" ? (
                <EditorContent
                  editor={editor}
                  className="prose dark:prose-invert blog-prose max-w-none focus:outline-none min-h-[360px] text-slate-800 dark:text-slate-200"
                />
              ) : (
                <textarea
                  rows={20}
                  value={rawHtml}
                  onChange={(e) => setRawHtml(e.target.value)}
                  className="w-full h-full font-mono text-xs text-slate-900 dark:text-slate-100 bg-slate-950/5 dark:bg-slate-950 p-4 rounded-xl focus:outline-none resize-y"
                  placeholder="<h2>Enter raw HTML code here...</h2>"
                />
              )}
            </div>
          </div>

          {/* Dynamic FAQ Builder (for FAQPage Schema) */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                  Dynamic FAQ Schema Builder ({faqs.length})
                </span>
              </div>
              {isFaqOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isFaqOpen && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  FAQs added here will render as interactive accordions in the article and automatically generate Google FAQPage Schema JSON-LD.
                </p>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          FAQ Item #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Remove FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Question (e.g. How does pre-service verification reduce claim denials?)"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(index, "question", e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40"
                      />

                      <textarea
                        rows={2}
                        placeholder="Detailed Answer..."
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(index, "answer", e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand hover:bg-brand/10 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ Item</span>
                </button>
              </div>
            )}
          </div>

          {/* Advanced SEO & OpenGraph Controls */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setIsSeoOpen(!isSeoOpen)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                  Advanced SEO & Social Media Meta
                </span>
              </div>
              {isSeoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isSeoOpen && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-5">
                {/* Google Snippet Live Preview */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Google Search Result Preview
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    https://gosvizzera.com/blog/{slug || "article-slug"}
                  </p>
                  <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                    {seo.metaTitle || title || "Article Title | gosvizzera"}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {seo.metaDescription || excerpt || "Article meta description snippet for Google search..."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Meta Title ({seo.metaTitle.length}/60 chars)
                    </label>
                    <input
                      type="text"
                      placeholder="Title tag for search engines"
                      value={seo.metaTitle}
                      onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. medical billing outsourcing"
                      value={seo.focusKeyword}
                      onChange={(e) => setSeo({ ...seo, focusKeyword: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-xs">
                    Meta Description ({seo.metaDescription.length}/160 chars)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Compelling meta description for search snippets..."
                    value={seo.metaDescription}
                    onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://gosvizzera.com/blog/..."
                      value={seo.canonicalUrl}
                      onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seo.noIndex}
                        onChange={(e) => setSeo({ ...seo, noIndex: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-rose-500"></div>
                    </label>
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      NoIndex (Hide from Search Engines)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Featured Image, Categories, Tags, Publishing Meta */}
        <div className="lg:col-span-4 space-y-6">
          {/* Featured Image Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
              Featured Cover Image
            </h3>

            {featuredImage.url ? (
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.alt || "Cover image"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMediaTarget("featured");
                        setIsMediaModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-bold hover:bg-white"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeaturedImage({ url: "", alt: "", caption: "" })}
                      className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Image Alt Text (SEO)"
                  value={featuredImage.alt}
                  onChange={(e) => setFeaturedImage({ ...featuredImage, alt: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMediaTarget("featured");
                  setIsMediaModalOpen(true);
                }}
                className="w-full aspect-video border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-brand dark:hover:border-teal-400 hover:text-brand transition-all"
              >
                <ImageIcon className="w-8 h-8" />
                <span className="text-xs font-semibold font-sans">Set Featured Image</span>
              </button>
            )}
          </div>

          {/* Categories Selector */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                Categories
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-xs text-brand dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>

            {isAddingCategory && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="px-3 py-1.5 text-xs font-bold bg-brand text-white rounded-xl"
                >
                  Add
                </button>
              </div>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => {
                const isChecked = selectedCategories.includes(cat._id);
                return (
                  <label
                    key={cat._id}
                    className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, cat._id]);
                        } else {
                          setSelectedCategories(selectedCategories.filter((id) => id !== cat._id));
                        }
                      }}
                      className="rounded border-slate-300 dark:border-slate-700 text-brand focus:ring-brand"
                    />
                    <span>{cat.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Tags Multi-Selector */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                Tags
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingTag(!isAddingTag)}
                className="text-xs text-brand dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>

            {isAddingTag && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tag Name"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={handleCreateTag}
                  className="px-3 py-1.5 text-xs font-bold bg-brand text-white rounded-xl"
                >
                  Add
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag._id);
                return (
                  <button
                    key={tag._id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTags(selectedTags.filter((id) => id !== tag._id));
                      } else {
                        setSelectedTags([...selectedTags, tag._id]);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                      isSelected
                        ? "bg-brand text-white dark:bg-teal-400 dark:text-slate-950 font-semibold shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    #{tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visibility & Attributes */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
              Post Settings
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                Featured Article (Hero Spotlight)
              </span>
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`p-2 rounded-xl transition-colors ${
                  isFeatured
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <Star className={`w-5 h-5 ${isFeatured ? "fill-amber-500" : ""}`} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                Publishing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cloudinary Media Selection Modal */}
      <MediaModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={handleSelectImage}
        title={mediaTarget === "featured" ? "Set Featured Cover Image" : "Insert Image into Article"}
      />
    </div>
  );
}

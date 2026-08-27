"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, FolderTree, Tag as TagIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Item {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export default function AdminCategoriesTagsPage() {
  const [categories, setCategories] = useState<Item[]>([]);
  const [tags, setTags] = useState<Item[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);

  // New Category state
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  // New Tag state
  const [newTagName, setNewTagName] = useState("");
  const [newTagSlug, setNewTagSlug] = useState("");
  const [addingTag, setAddingTag] = useState(false);

  const fetchCategories = async () => {
    try {
      setCatLoading(true);
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setCatLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      setTagLoading(true);
      const res = await fetch("/api/blog/tags");
      const data = await res.json();
      if (data.tags) setTags(data.tags);
    } catch {
      toast.error("Failed to load tags");
    } finally {
      setTagLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      setAddingCat(true);
      const res = await fetch("/api/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatName,
          slug: newCatSlug,
          description: newCatDesc,
        }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to create category");
      }

      toast.success(`Category "${data.category.name}" created!`);
      setCategories([...categories, data.category]);
      setNewCatName("");
      setNewCatSlug("");
      setNewCatDesc("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error creating category";
      toast.error(message);
    } finally {
      setAddingCat(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/blog/categories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Category deleted");
        setCategories((prev) => prev.filter((c) => c._id !== id));
      }
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      setAddingTag(true);
      const res = await fetch("/api/blog/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTagName,
          slug: newTagSlug,
        }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to create tag");
      }

      toast.success(`Tag "${data.tag.name}" added!`);
      setTags([...tags, data.tag]);
      setNewTagName("");
      setNewTagSlug("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error creating tag";
      toast.error(message);
    } finally {
      setAddingTag(false);
    }
  };

  const handleDeleteTag = async (id: string, name: string) => {
    if (!confirm(`Delete tag "${name}"?`)) return;

    try {
      const res = await fetch(`/api/blog/tags?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Tag deleted");
        setTags((prev) => prev.filter((t) => t._id !== id));
      }
    } catch {
      toast.error("Failed to delete tag");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
          Taxonomies & Organization
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
          Manage healthcare categories, specialties, and article tags with automated slug generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FolderTree className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Categories ({categories.length})
            </h2>
          </div>

          {/* Add Category Form */}
          <form
            onSubmit={handleCreateCategory}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Add New Category
            </h3>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Category Name (e.g. Medical Coding)"
                value={newCatName}
                onChange={(e) => {
                  setNewCatName(e.target.value);
                  if (!newCatSlug) {
                    setNewCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }
                }}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                required
              />

              <input
                type="text"
                placeholder="Slug (optional, e.g. medical-coding)"
                value={newCatSlug}
                onChange={(e) => setNewCatSlug(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none"
              />

              <textarea
                rows={2}
                placeholder="Description (optional)"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={addingCat}
              className="w-full py-2.5 px-4 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {addingCat ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Create Category</span>
            </button>
          </form>

          {/* Categories List */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {catLoading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-brand dark:text-teal-400" />
              </div>
            ) : categories.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No categories created yet.</div>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">/category/{cat.slug}</p>
                    {cat.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{cat.description}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat._id, cat.name)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <TagIcon className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Tags ({tags.length})
            </h2>
          </div>

          {/* Add Tag Form */}
          <form
            onSubmit={handleCreateTag}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Add New Tag
            </h3>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Tag Name (e.g. Prior Authorization)"
                value={newTagName}
                onChange={(e) => {
                  setNewTagName(e.target.value);
                  if (!newTagSlug) {
                    setNewTagSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }
                }}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                required
              />

              <input
                type="text"
                placeholder="Slug (optional, e.g. prior-authorization)"
                value={newTagSlug}
                onChange={(e) => setNewTagSlug(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={addingTag}
              className="w-full py-2.5 px-4 rounded-xl bg-brand dark:bg-teal-500 text-white dark:text-slate-950 text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {addingTag ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Add Tag</span>
            </button>
          </form>

          {/* Tags Cloud / Badges */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {tagLoading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-brand dark:text-teal-400" />
              </div>
            ) : tags.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No tags created yet.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag._id}
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                  >
                    <span>#{tag.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTag(tag._id, tag.name)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete tag"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

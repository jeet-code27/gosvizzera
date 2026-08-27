"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { Loader2 } from "lucide-react";

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog/posts/${id}`);
        const data = await res.json();
        if (data.post) {
          setPost(data.post);
        } else {
          setError(data.error || "Post not found");
        }
      } catch (err) {
        console.error("Failed to load post for editing:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand dark:text-teal-400" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-lg font-bold text-rose-500 font-sans">Error Loading Post</h2>
        <p className="text-xs text-slate-500">{error || "Article does not exist"}</p>
      </div>
    );
  }

  return (
    <div>
      <PostEditor initialData={post} isEdit={true} />
    </div>
  );
}

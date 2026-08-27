"use client";

import React from "react";
import PostEditor from "@/components/admin/PostEditor";

export default function CreatePostPage() {
  return (
    <div>
      <PostEditor isEdit={false} />
    </div>
  );
}

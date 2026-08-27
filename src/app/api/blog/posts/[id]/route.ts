import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Category from "@/lib/models/Category";
import Tag from "@/lib/models/Tag";
import Author from "@/lib/models/Author";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    void Category;
    void Tag;
    void Author;

    const { id } = await params;

    let post;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await Post.findById(id)
        .populate("author", "name avatar role bio")
        .populate("category", "name slug")
        .populate("tags", "name slug")
        .populate("relatedPosts", "title slug excerpt featuredImage createdAt");
    } else {
      // Search by slug
      post = await Post.findOne({ slug: id })
        .populate("author", "name avatar role bio")
        .populate("category", "name slug")
        .populate("tags", "name slug")
        .populate("relatedPosts", "title slug excerpt featuredImage createdAt");
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // If slug changed, ensure uniqueness
    if (body.slug && body.slug !== existingPost.slug) {
      const sanitizedSlug = slugify(body.slug);
      const slugConflict = await Post.findOne({ slug: sanitizedSlug, _id: { $ne: id } });
      if (slugConflict) {
        return NextResponse.json({ error: "Slug already exists. Please choose a unique slug." }, { status: 409 });
      }
      body.slug = sanitizedSlug;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
      .populate("author", "name avatar role bio")
      .populate("category", "name slug")
      .populate("tags", "name slug");

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

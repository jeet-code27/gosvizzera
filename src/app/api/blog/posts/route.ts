import { NextRequest, NextResponse } from "next/server";
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

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    // Ensure models are registered
    void Category;
    void Tag;
    void Author;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const categorySlug = searchParams.get("category");
    const tagSlug = searchParams.get("tag");
    const search = searchParams.get("search");
    const isFeatured = searchParams.get("isFeatured");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (isFeatured === "true") {
      filter.isFeatured = true;
    }

    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug });
      if (cat) {
        filter.category = cat._id;
      }
    }

    if (tagSlug) {
      const tag = await Tag.findOne({ slug: tagSlug });
      if (tag) {
        filter.tags = tag._id;
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate("author", "name avatar role bio")
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error("Posts fetch error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch posts";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      title,
      content,
      excerpt,
      featuredImage,
      author,
      category,
      tags,
      faqs,
      status,
      isFeatured,
      seo,
      relatedPosts,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Post title is required" }, { status: 400 });
    }

    // Auto-generate or sanitize slug
    let baseSlug = body.slug ? slugify(body.slug) : slugify(title);
    if (!baseSlug) {
      baseSlug = `post-${Date.now()}`;
    }

    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await Post.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Auto fallback for author if none passed
    let authorId = author;
    if (!authorId) {
      let defaultAuthor = await Author.findOne();
      if (!defaultAuthor) {
        defaultAuthor = await Author.create({
          name: "Svizzera Editorial Team",
          avatar: "/images/gosvizzera-logo.png",
          role: "RCM & Healthcare Billing Specialist",
          bio: "Dedicated team of certified medical coders, billing analysts, and RCM compliance consultants.",
        });
      }
      authorId = defaultAuthor._id;
    }

    const post = await Post.create({
      title,
      slug: uniqueSlug,
      content: content || "",
      excerpt: excerpt || "",
      featuredImage: featuredImage || { url: "", alt: "", caption: "" },
      author: authorId,
      category: category || [],
      tags: tags || [],
      faqs: faqs || [],
      status: status || "Draft",
      isFeatured: isFeatured || false,
      seo: seo || {},
      relatedPosts: relatedPosts || [],
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "name avatar role bio")
      .populate("category", "name slug")
      .populate("tags", "name slug");

    return NextResponse.json({ success: true, post: populatedPost }, { status: 201 });
  } catch (error: unknown) {
    console.error("Post creation error:", error);
    const message = error instanceof Error ? error.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

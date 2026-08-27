import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json({ categories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch categories";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);

    // Check if category exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: "Category with this slug already exists" }, { status: 409 });
    }

    const category = await Category.create({
      name,
      slug,
      description: description || "",
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create category";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete category";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Tag from "@/lib/models/Tag";

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
    const tags = await Tag.find().sort({ name: 1 });
    return NextResponse.json({ tags });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch tags";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);

    const existing = await Tag.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: true, tag: existing }, { status: 200 });
    }

    const tag = await Tag.create({ name, slug });
    return NextResponse.json({ success: true, tag }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create tag";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    await Tag.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Tag deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete tag";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

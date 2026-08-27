import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Author from "@/lib/models/Author";

export async function GET() {
  try {
    await connectToDatabase();
    let authors = await Author.find().sort({ name: 1 });

    // Seed a default author if none exists
    if (authors.length === 0) {
      const defaultAuthor = await Author.create({
        name: "Svizzera Editorial Team",
        avatar: "/images/gosvizzera-logo.png",
        role: "RCM & Healthcare Billing Specialist",
        bio: "Dedicated team of certified medical coders, billing analysts, and RCM compliance consultants at Svizzera Healthcare Solutions.",
      });
      authors = [defaultAuthor];
    }

    return NextResponse.json({ authors });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch authors";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, avatar, role, bio } = body;

    if (!name) {
      return NextResponse.json({ error: "Author name is required" }, { status: 400 });
    }

    const author = await Author.create({
      name,
      avatar: avatar || "",
      role: role || "RCM & Healthcare Billing Specialist",
      bio: bio || "",
    });

    return NextResponse.json({ success: true, author }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create author";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Author ID is required" }, { status: 400 });
    }

    await Author.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Author deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete author";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

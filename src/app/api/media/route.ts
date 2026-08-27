import { NextRequest, NextResponse } from "next/server";
import cloudinary, { CLOUDINARY_FOLDER } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Media from "@/lib/models/Media";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const maxResults = parseInt(searchParams.get("max_results") || "50", 10);

    // Try fetching from Cloudinary directly first
    try {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: CLOUDINARY_FOLDER,
        max_results: maxResults,
      });

      const resources = result.resources.map((res: { public_id: string; secure_url: string; format: string; width: number; height: number; bytes: number; created_at: string }) => ({
        public_id: res.public_id,
        url: res.secure_url,
        format: res.format,
        width: res.width,
        height: res.height,
        bytes: res.bytes,
        createdAt: res.created_at,
      }));

      return NextResponse.json({ resources });
    } catch (cloudErr) {
      console.warn("Cloudinary direct fetch failed, falling back to MongoDB Media records:", cloudErr);
      await connectToDatabase();
      const mediaList = await Media.find().sort({ createdAt: -1 }).limit(maxResults);
      return NextResponse.json({ resources: mediaList });
    }
  } catch (error: unknown) {
    console.error("Media fetch error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("public_id");

    if (!publicId) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from Media collection
    await connectToDatabase();
    await Media.deleteOne({ public_id: publicId });

    return NextResponse.json({ success: true, message: "Media deleted successfully" });
  } catch (error: unknown) {
    console.error("Media delete error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

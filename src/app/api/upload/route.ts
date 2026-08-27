import { NextRequest, NextResponse } from "next/server";
import cloudinary, { CLOUDINARY_FOLDER } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Media from "@/lib/models/Media";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using base64 data URI
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: CLOUDINARY_FOLDER,
      resource_type: "image",
    });

    // Save to Media collection
    await connectToDatabase();
    const media = await Media.create({
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
      format: uploadResponse.format,
      width: uploadResponse.width,
      height: uploadResponse.height,
      bytes: uploadResponse.bytes,
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      media,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Failed to upload image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "~/lib/cloudinary";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

  const result = await uploadToCloudinary(webpBuffer);

  return NextResponse.json({
    url: result.secure_url,
  });
}

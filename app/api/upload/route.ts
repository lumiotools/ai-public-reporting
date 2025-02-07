import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Use the new route segment config syntax
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), "tmp", "uploads");

  try {
    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Generate a unique filename with original extension
    const ext = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${ext}`;
    const newPath = path.join(uploadDir, uniqueFilename);

    // Convert File to Buffer and write to filesystem
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(newPath, buffer);

    // Generate the URL for the uploaded file
    const fileUrl = `/uploads/${uniqueFilename}`;

    // In a production environment, you would:
    // 1. Upload the file to cloud storage (S3, GCS, etc.)
    // 2. Delete the local file after successful cloud upload
    // 3. Return the cloud storage URL instead of local path

    return NextResponse.json({
      url: fileUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  const filePath = path.join(process.cwd(), "tmp", "uploads", ...params.path)

  try {
    const file = await fs.readFile(filePath)
    const contentType = getContentType(filePath)
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".png":
      return "image/png"
    case ".gif":
      return "image/gif"
    default:
      return "application/octet-stream"
  }
}


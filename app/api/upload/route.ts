import { NextResponse } from "next/server"
import { IncomingForm } from "formidable"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { Readable } from "stream"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), "tmp", "uploads")

  try {
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true })

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    })

    const readable = new Readable()
    readable._read = () => {} // _read is required but you can noop it
    readable.push(await req.arrayBuffer())
    readable.push(null)

    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(readable, (err, fields, files) => {
        if (err) reject(err)
        resolve([fields, files])
      })
    })

    const file = files.file?.[0] // Assuming the file input name is "file"

    if (!file) {
      throw new Error("No file uploaded")
    }

    // Generate a unique filename
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalFilename || "")}`
    const newPath = path.join(uploadDir, uniqueFilename)

    // Move the file to the new path
    await fs.rename(file.filepath, newPath)

    // In a real-world scenario, you would upload the file to a cloud storage service here
    // For this example, we'll just return the local path
    const fileUrl = `/uploads/${uniqueFilename}`

    // Clean up the temporary file
    // await fs.unlink(newPath)

    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "File upload failed" }, { status: 500 })
  }
}


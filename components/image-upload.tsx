"use client"

import { useState, useCallback, forwardRef, useImperativeHandle } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (base64Image: string) => void
}

export const ImageUpload = forwardRef<{ clearImage: () => void }, ImageUploadProps>(({ onImageUpload }, ref) => {
  const [preview, setPreview] = useState<string | null>(null)

  const clearImage = () => {
    setPreview(null)
    onImageUpload("")
  }

  useImperativeHandle(ref, () => ({
    clearImage,
  }))

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0]
        const reader = new FileReader()

        reader.onabort = () => console.log("file reading was aborted")
        reader.onerror = () => console.log("file reading has failed")
        reader.onload = () => {
          const base64String = reader.result as string
          setPreview(base64String)
          onImageUpload(base64String.split(",")[1])
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  return (
    <Card className="mt-4 bg-muted/5">
      <CardContent className="p-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative w-full h-48">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Preview"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground/50" />
              {isDragActive ? (
                <p className="text-sm text-muted-foreground">Drop the image here...</p>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drop image here or click to upload</p>
                  <p className="text-xs text-muted-foreground">Supports JPG, PNG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          )}
        </div>
        {preview && (
          <div className="mt-4 flex justify-end">
            <Button variant="destructive" size="sm" onClick={clearImage} className="gap-2">
              <X className="h-4 w-4" />
              Remove image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

ImageUpload.displayName = "ImageUpload"


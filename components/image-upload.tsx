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
    <Card className="mt-4 bg-purple-50/50 border-[1.4px] border-[#00000017]">
      <CardContent className="p-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? "border-[#1E1E1E80] bg-purple-50" : "border-[#1E1E1E80] hover:border-[#362864]"
          }`}
        >
         <input {...{...getInputProps(), style:{
          display:"none"
         }}}  />
          {preview ? (
            <div className="relative w-full h-20 sm:h-48">
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
              <ImageIcon className="mx-auto h-6 w-6 sm:h-10 sm:w-10 text-[#362864]" />
              {isDragActive ? (
                <p className="text-xs sm:text-sm text-[#362864]">Drop the image here...</p>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-[#362864]">Drop image here or click to upload</p>
                  <p className="text-xs sm:text-sm text-[#1E1E1E80]">Supports JPG, PNG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          )}
        </div>
        {preview && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={clearImage}
              className="gap-2 sm:text-md text-xs bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
              Remove image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

ImageUpload.displayName = "ImageUpload"


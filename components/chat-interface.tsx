"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageUpload } from "@/components/image-upload"
import { SummaryDisplay } from "@/components/summary-display"
import { Send } from "lucide-react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"

interface Message {
  role: string
  content: Array<{ type: string; text?: string; image_url?: { url: string } }>
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const imageUploadRef = useRef<{ clearImage: () => void } | null>(null)

  const handleSendMessage = async () => {
    if (!input.trim() && !base64Image) return

    const newMessage: Message = {
      role: "user",
      content: [{ type: "text", text: input || "Attached an image" }],
    }

    if (base64Image) {
      newMessage.content.push({
        type: "image_url",
        image_url: { url: `data:image/jpeg;base64,${base64Image}` },
      })
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    setInput("")
    setBase64Image(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: [{ type: "text", text: data.message }],
        },
      ])

      if (data.summary) {
        setSummary(data.summary)
      }

      // Clear the image after successful API call
      if (imageUploadRef.current) {
        imageUploadRef.current.clearImage()
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: [{ type: "text", text: "Sorry, there was an error processing your request." }],
        },
      ])
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <ScrollArea className="h-[400px] w-full pr-4 mb-4 rounded-lg border bg-muted/10">
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-secondary text-secondary-foreground mr-auto"
                  }`}
                >
                  {message.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="space-y-2">
                      {content.type === "text" && content.text && (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{content.text}</ReactMarkdown>
                        </div>
                      )}
                      {content.type === "image_url" && content.image_url && (
                        <div className="mt-2 rounded-md overflow-hidden">
                          <Image
                            src={content.image_url.url || "/placeholder.svg"}
                            alt="Uploaded image"
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <ImageUpload ref={imageUploadRef} onImageUpload={setBase64Image} />
      </CardContent>
      <CardFooter className="flex items-center gap-2 p-4 border-t bg-muted/5">
        <Input
          className="flex-grow"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
      {summary && <SummaryDisplay summary={summary} />}
    </Card>
  )
}


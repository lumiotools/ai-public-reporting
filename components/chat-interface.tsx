"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageUpload } from "./image-upload"
import { SummaryDisplay } from "./summary-display"
import { ArrowUpRight, Paperclip, Send } from "lucide-react"
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
  const [isTyping, setIsTyping] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const imageUploadRef = useRef<{ clearImage: () => void } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
  },[]);

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

    if (imageUploadRef.current) {
      imageUploadRef.current.clearImage()
    }
    setInput("")
    setBase64Image(null)
    setShowImageUpload(false)
    setIsTyping(true)

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
    } catch (error) {
      console.error("Error:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "Sorry, there was an error processing your request.",
            },
          ],
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  useEffect(()=>{
    scrollToBottom();
  },[messages, showImageUpload])

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl bg-white/80 backdrop-blur-sm rounded-lg border-purple-100 font-poppins">
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-end h-[200px] text-center px-4 mb-16">
                <div className="space-y-4 max-w-md">
                  <h2 className="text-2xl font-semibold text-[#362864]">Welcome to AI Public Reporting</h2>
                  <p className="text-[#1E1E1E80]">
                    How can we help you today? Describe any local issues you'd like to report, or upload images of the
                    problem.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-3 shadow-sm ${
                      message.role === "user" ? "bg-[#362864ED] border-[1.4px] border-[#852FFF69] text-white" : "bg-purple-50 border-[1.4px] border-[#00000017] text-[#1E1E1E]"
                    }`}
                  >
                    {message.content.map((content, contentIndex) => (
                      <div key={contentIndex} className="space-y-2">
                        {content.type === "text" && content.text && (
                          <div className="prose-sm max-w-none">
                            <ReactMarkdown>{content.text}</ReactMarkdown>
                          </div>
                        )}
                        {content.type === "image_url" && content.image_url && (
                          <div className="mt-2 rounded-lg overflow-hidden">
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
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-6 py-3 border-[1.4px] border-[#00000017] bg-purple-50 text-[#1E1E1E]">
                  <span className="animate-pulse">Thinking</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>
        {showImageUpload && <ImageUpload ref={imageUploadRef} onImageUpload={setBase64Image} />}
        <div ref={messagesEndRef}/>
        </ScrollArea>
        
      </CardContent>
      <CardFooter className="flex items-center gap-2 p-4 border-t border-purple-100">
        <div className="flex items-center w-full bg-purple-50/50 rounded-full border border-purple-100 overflow-hidden h-[48px] ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="text-[#1E1E1E] bg-[#36286426] hover:text-purple-900 hover:bg-purple-100 rounded-full ml-1 p-5 "
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            type="text"
            placeholder="Message Chatbot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-[#362864] hover:bg-[#362864] text-white rounded-full mr-1 px-4 py-5 flex items-center gap-2"
          >
            <span className="font-medium">Send</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
      {/* {summary && <SummaryDisplay summary={summary} />} */}
    </Card>
  )
}


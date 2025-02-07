import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-6 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Report Local Issues</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Use our AI-powered system to report local issues such as road damage, waste disposal, and environmental
          hazards.
        </p>
      </div>
      <ChatInterface />
    </div>
  )
}


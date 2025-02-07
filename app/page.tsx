import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <header className="py-4 border-b border-[#00000014]">
          <h1 className="text-[#25313D] text-xl font-medium container max">
            AI Report Analysis
          </h1>
        </header>
      <div className="container mx-auto pb-10">
        <div className="space-y-6 text-center mb-8 mt-10">
          <h1 className="text-4xl font-bold tracking-tight text-[#362864]">
            Report Local Issues
          </h1>
          <p className="text-lg text-[#1E1E1E80] max-w-2xl mx-auto">
            Use our AI-powered system to report local issues such as road
            damage, waste disposal, and environmental hazards
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
}

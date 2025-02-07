import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { messages } = await req.json()
  try {
    // Ensure messages are in the correct format
    const formattedMessages = messages.map((message: any) => ({
      role: message.role,
      content: typeof message.content === "string" ? message.content : message.content[0].text,
    }))

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content: `You are an AI assistant helping users report local issues. Guide them through the reporting process, asking for relevant details.

          You have the capability to automatically forward reports to appropriate local authorities based on the issue type:
          
          - Public Safety issues -> Local Police Department
          - Infrastructure (roads, streetlights, etc.) -> Public Works Department
          - Sanitation/Waste -> Waste Management Department
          - Parks/Recreation -> Parks Department
          - Noise/Disturbance -> Bylaw Enforcement
          - Water/Sewage -> Utilities Department
          - Environmental Concerns -> Environmental Protection Department
          
          For each report, collect essential information:
          1. Precise location (address/coordinates)
          2. Issue description
          3. Time/date of observation
          4. Photos/evidence (if provided)
          5. Reporter contact information (optional)
          
          When the user expresses intent to submit, finish, or close their report respond with:
          
          "Your report has been submitted and automatically forwarded to [relevant department]. Thank you for helping improve our community. Here's a summary of your report:"
          
          Then provide a brief, structured summary of the reported issue using markdown, including:
          - Issue Category
          - Department Notified
          - Location
          - Description
          
          For all other interactions, continue gathering relevant information about the issue being reported.
          Format your responses using markdown for better readability.`,
        },
        ...formattedMessages,
      ],
    })
    return result.toDataStreamResponse({
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}


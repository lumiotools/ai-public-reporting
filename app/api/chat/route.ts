import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant helping users report local issues. Guide them through the reporting process, asking for relevant details. 
            
            When the user expresses intent to submit, finish, or close their report (using words like "submit", "done", "finish", "complete", "that's all", "close"), respond with:
            "Your report has been submitted. Thank you for helping improve our community. Here's a summary of your report:"
            
            Then provide a brief, structured summary of the reported issue using markdown.
            
            For all other interactions, continue gathering relevant information about the issue being reported.
            Format your responses using markdown for better readability.`,
        },
        ...messages,
      ],
      max_tokens: 300,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response generated from the AI model");
    }

    // Check if this is the final message by looking for the submission confirmation
    const isFinalMessage = assistantMessage.includes(
      "Your report has been submitted"
    );
    let summary = null;

    if (isFinalMessage) {
      // Extract the summary from the submission message
      const summaryStart = assistantMessage.indexOf(
        "Here's a summary of your report:"
      );
      if (summaryStart !== -1) {
        summary = assistantMessage
          .slice(summaryStart + "Here's a summary of your report:".length)
          .trim();
      }
    }

    return NextResponse.json({ message: assistantMessage, summary });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

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
          content:
            "You are an AI assistant helping users report local issues. Guide them through the reporting process, asking for relevant details. At the end, provide a structured summary of the report. Format your responses using markdown for better readability.",
        },
        ...messages,
      ],
      max_tokens: 300,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response generated from the AI model");
    }

    // Check if this is the final message and generate a summary
    const isFinalMessage = assistantMessage
      .toLowerCase()
      .includes("thank you for your report");
    let summary = null;

    if (isFinalMessage) {
      const summaryCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Generate a concise, structured summary of the following report using markdown formatting. Include key details such as the type of issue, location, and any other relevant information.",
          },
          ...messages,
          { role: "assistant", content: assistantMessage },
        ],
        max_tokens: 250,
      });

      summary = summaryCompletion.choices[0]?.message?.content || null;
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

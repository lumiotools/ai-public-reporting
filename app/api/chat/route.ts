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
          Format your responses using markdown for better readability.
          
          If the user asks about the description of image uploaded or any info from the image he uploaded, try to understand the uploaded image and provide the information accordingly.
          
          `,
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

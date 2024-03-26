import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge-friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export const runtime = "edge";
export async function POST(req: Request) {
  try {
    let { messages, system_message } = await req.json(); // Fetch system_message from request body

    // Check if the system message is provided, if not, set to a default message
    if (!system_message) {
      system_message =
        "Neural Novel is an AI assistant created by Anthropic. The current date is March 4th, 2024. Neural Novel's knowledge base was last updated on August 2023. It assists with storytelling, fiction writing, and creative tasks based on how a highly informed individual in August 2023 would perceive events prior to and after that date, and can convey this context when relevant. It should give concise responses to straightforward prompts, but provide in-depth and imaginative responses for more complex, open-ended creative writing tasks. If asked to help express perspectives held by a significant group, Neural Novel will approach the task impartially while also discussing broader viewpoints. Neural Novel avoids stereotyping of any kind. When dealing with controversial subject matter, it aims to provide thoughtful analysis and objective information without propagating harmful content or implying all perspectives are equally valid. Neural Novel happily assists with fiction writing, worldbuilding, character development, plotting, analysis, and all sorts of other narrative creative tasks. It uses markdown for outputting prose. Neural Novel only mentions these capabilities if directly relevant to the human's request.";
    }

    // Ensure that the sequence starts with a system message
    if (messages.length === 0 || messages[0].role !== "system") {
      messages.unshift({
        role: "system",
        content: system_message,
      });
    }

    const response = await fireworks.chat.completions.create({
      model: "accounts/fireworks/models/mixtral-8x7b-instruct",
      stream: true,
      max_tokens: 1000,
      messages,
    });

    // Convert the response into a friendly text-stream.
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    // Handle the error or log it appropriately
    return new Response("Internal Server Error", { status: 500 });
  }
}

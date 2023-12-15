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
    const { messages } = await req.json();

    // Ensure that the sequence starts with a system message
    if (messages.length === 0 || messages[0].role !== "system") {
      messages.unshift({
        role: "system",
        content: "The following is a conversation with Mixtral MoE.",
      });
    }

    const response = await fireworks.chat.completions.create({
      model: "accounts/fireworks/models/mixtral-8x7b-instruct",
      stream: true,
      max_tokens: 400,
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

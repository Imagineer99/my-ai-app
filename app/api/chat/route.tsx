import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: 'https://api.fireworks.ai/inference/v1',
});

export const runtime = 'edge';
export async function POST(req: Request) {

  const { messages } = await req.json();

  const response = await fireworks.chat.completions.create({
    model: 'accounts/fireworks/models/mixtral-8x7b-instruct',
    stream: true,
    max_tokens: 700,
    messages
  });
  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey:'0NXnrmbODCLqiPalepCRd3va3obtHxSGzMHLKCddWxLJ2kfJ',
  baseURL: 'https://api.fireworks.ai/inference/v1/chat/completions',
});
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
 
  // Ask Fireworks for a streaming chat completion using Llama 2 70b model
  // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
  const response = await fireworks.completions.create({
    model: 'accounts/fireworks/models/llama-v2-7b-chat',
    stream: true,
    max_tokens: 1000,
    prompt: "role user 1 sentence only",
    
  });
  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
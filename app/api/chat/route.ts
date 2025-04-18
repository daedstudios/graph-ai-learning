import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-chat"),
    messages,
  });

  console.log("result", result);

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}

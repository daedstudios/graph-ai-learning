import { deepseek } from "@ai-sdk/deepseek";
import { streamText, generateText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-chat"),
    system: "You are giving people small tasks to learn javascript.",
    messages,
  });

  console.log("result", result);

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}

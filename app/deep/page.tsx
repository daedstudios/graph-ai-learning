"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <>
      {
        <div>
          {messages.map((message) =>
            message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <p key={i}>{part.text}</p>;
                case "source":
                  return <p key={i}>{part.source.url}</p>;
                case "reasoning":
                  return <div key={i}>{part.reasoning}</div>;
                case "tool-invocation":
                  return <div key={i}>{part.toolInvocation.toolName}</div>;
                case "file":
                  return <div key={i}>image</div>;
              }
            })
          )}
        </div>
      }
      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

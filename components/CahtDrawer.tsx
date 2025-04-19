"use client";
import React, { useEffect, useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useChat } from "@ai-sdk/react";

type Props = {
  selectedCountry: string;
  isParentOpen: boolean;
  setIsParentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ChatDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  return (
    <Drawer modal={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex flex-row w-full gap-4 justify-end ">
          <Button
            className="w-[7.5rem] bg-primary dark:bg-secondary text-secondary text-[1rem] dark:hover:bg-background dark:text-card-foreground rounded-[2rem] cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            learn more
          </Button>
          <Button
            className=" w-[7.5rem] bg-secondary dark:bg-primary border border-primary text-primary text-[1rem] hover:text-secondary dark:hover:bg-background dark:text-card-foreground rounded-[2rem] cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            tasks
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="top-0  min-h-screen">
        <ScrollArea className="md:w-[42rem] w-[90%] justify-center mx-auto overflow-y-auto flex flex-wrap items-center mt-3">
          <DrawerHeader className="w-full flex  gap-2">
            <div className="">
              <DrawerTitle className="text-[2rem] justify-start text-left font-medium">
                let's learn about topic
              </DrawerTitle>
              <DrawerDescription className="text-primary pt-4 text-[1rem]">
                In JavaScript, numbers are a data type used to represent both
                integers and floating-point values. They can be manipulated
                using various operators and functions. JavaScript supports
                special numeric values like NaN (Not a Number) and Infinity. You
                can perform arithmetic operations, comparisons, and use methods
                like Math.round() or Math.random() to work with numbers
                effectively.
              </DrawerDescription>
            </div>
          </DrawerHeader>
          {
            <div className="h-auto w-full p-4">
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 items-center justify-between  p-4 mx-auto"
          >
            <textarea
              className="border-none focus:outline-none py-[0.5rem] md:w-[16rem] w-full "
              name="prompt"
              value={input}
              placeholder="ask a question..."
              onChange={handleInputChange}
            />
            <button
              className="md:w-[7.25rem] w-full hover:bg-foreground border py-[0.5rem] bg-primary text-secondary cursor-pointer rounded-[2rem]"
              type="submit"
            >
              ask
            </button>
          </form>
          <div className="flex  px-4 items-start flex-row w-full gap-4 ">
            <Button
              className=" w-[7.5rem] bg-secondary dark:bg-primary border border-primary text-primary text-[1rem] hover:text-secondary dark:hover:bg-background dark:text-card-foreground rounded-[2rem] cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              more info
            </Button>
            <Button
              className=" w-[7.5rem]  bg-secondary dark:bg-primary border border-primary text-primary text-[1rem] hover:text-secondary dark:hover:bg-background dark:text-card-foreground rounded-[2rem] cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              topics
            </Button>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;

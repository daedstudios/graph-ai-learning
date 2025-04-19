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

type Props = {
  selectedCountry: string;
  isParentOpen: boolean;
  setIsParentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ChatDrawer = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer modal={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex flex-row w-full gap-4 justify-end">
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
      <DrawerContent className="top-0 min-h-screen">
        <ScrollArea className="w-full overflow-y-auto flex flex-wrap justify-center mt-3">
          <DrawerHeader className="w-full flex items-center gap-2">
            <div>
              <DrawerTitle className="text-4xl">
                deatled AI tutorial
              </DrawerTitle>
              <DrawerDescription className="text-base">
                see details of the topic and do exercises.
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <div className="flex flex-col flex-wrap gap-8 justify-center align-middle items-center w-[100%] lg:w-[50%] p-8 border-t-2 mt-4 border-r-2 mx-auto">
            <h2 className="w-full text-3xl font-semibold text-card-foreground text-center">
              topic name
            </h2>
          </div>
          <div className="flex flex-col flex-wrap gap-8 justify-center align-middle items-center w-[100%] lg:w-[50%] p-8 border-t-2 mt-4 border-r-2 mx-auto">
            <h2 className="w-full text-3xl font-semibold text-card-foreground text-center">
              details
            </h2>
          </div>
          <DrawerFooter className="w-full border-t">
            <DrawerClose>
              <Button className="w-[80%]">Close popup</Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;

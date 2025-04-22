"use client";

import { lazy, Suspense, use, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import Nav from "@/components/nav";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ChatDrawer from "@/components/CahtDrawer";
import TaskDrawer from "@/components/TaskDrawer";

gsap.registerPlugin(useGSAP);

// Dynamically import the component that uses React Three Fiber
const Scene = dynamic(() => import("@/components/GraphScene"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-foreground text-background flex items-center justify-center text-4xl">
      <div className="animate-pulse">
        <span className="inline-block animate-bounce delay-75">L</span>
        <span className="inline-block animate-bounce delay-100">o</span>
        <span className="inline-block animate-bounce delay-150">a</span>
        <span className="inline-block animate-bounce delay-200">d</span>
        <span className="inline-block animate-bounce delay-300">i</span>
        <span className="inline-block animate-bounce delay-300">n</span>
        <span className="inline-block animate-bounce delay-300">g</span>
        <span className="inline-block animate-bounce delay-300">.</span>
        <span className="inline-block animate-bounce delay-400">.</span>
        <span className="inline-block animate-bounce delay-500">.</span>
      </div>
    </div>
  ),
});

export default function Page() {
  const [selectedPoint, setSelectedPoint] = useState<
    { id: string | number; name: string; description: string } | undefined
  >(undefined);

  const [chatOpen, setChatOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  useEffect(() => {
    console.log("selectedPoint changed:", selectedPoint);
  }, [selectedPoint]);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPoint && cardRef.current) {
      const isMobile = window.innerWidth < 768; // Tailwind's md breakpoint

      gsap.to(cardRef.current, {
        duration: 0.5,
        width: isMobile ? "full" : "18rem",
        height: "auto",
        opacity: 1,
      });
    }
  }, [selectedPoint]);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Scene
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
        />
      </div>
      {selectedPoint?.name && (
        <Card
          className="fixed top-4 border border-muted-foreground  bg-background/8 md:top-6  left-1/2 -translate-x-1/2 w-[90%] md:left-24 md:translate-x-0 md:w-[18rem] p-4 rounded-[2rem]  flex flex-col items-start h-0 text-left overflow-hidden"
          ref={cardRef}
        >
          <h1 className="text-[1rem] w-full text-background font-medium text-left">
            {selectedPoint?.name}
          </h1>
          <p className="text-[1rem] text-background w-full pb-[0rem]">
            {selectedPoint?.description}
          </p>
          <div className="flex flex-row w-full gap-4 justify-end ">
            <ChatDrawer
              topic={selectedPoint?.name || ""}
              description={selectedPoint?.description || ""}
              open={chatOpen}
              setOpen={setChatOpen}
            />
            <TaskDrawer
              topic={selectedPoint?.name || ""}
              description={selectedPoint?.description || ""}
              open={taskOpen}
              setOpen={setTaskOpen}
            />
          </div>
        </Card>
      )}
      <Nav
        selectedPoint={selectedPoint}
        setChatOpen={setChatOpen}
        setTaskOpen={setTaskOpen}
      />
    </>
  );
}

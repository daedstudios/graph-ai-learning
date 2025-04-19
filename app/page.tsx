"use client";

import { lazy, Suspense, use, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ChatDrawer from "@/components/CahtDrawer";

gsap.registerPlugin(useGSAP);

// Dynamically import the component that uses React Three Fiber
const Scene = dynamic(() => import("@/components/GraphScene"), {
  ssr: false,
  loading: () => <div>Loading 3D Scene...</div>,
});

export default function Page() {
  const [selectedPoint, setSelectedPoint] = useState<
    { id: string | number; name: string } | undefined
  >(undefined);

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

      <Card
        className="fixed bottom-48 left-1/2 -translate-x-1/2 w-[90%] md:left-24 md:translate-x-0 md:w-[18rem] p-4 rounded-[2rem]  flex flex-col items-start h-0 text-left overflow-hidden"
        ref={cardRef}
      >
        <h1 className="text-[1rem] w-full font-medium text-left">
          {selectedPoint?.name}
        </h1>
        <p className="text-[0.75rem] w-full pb-[0rem]">
          In JavaScript, numbers are a data type used to represent both integers
          and floating-point values. They can be manipulated using various
          operators and functions. JavaScript supports special numeric values
          like NaN (Not a Number) and Infinity. You can perform arithmetic
          operations, comparisons, and use methods like Math.round() or
          Math.random() to work with numbers effectively.
        </p>
        <ChatDrawer />
      </Card>
    </>
  );
}

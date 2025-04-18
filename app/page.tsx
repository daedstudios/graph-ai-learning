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
      gsap.to(cardRef.current, {
        duration: 0.5,
        width: "auto",
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
        className="fixed top-12 left-12 w-0 h-0 overflow-hidden"
        ref={cardRef}
      >
        {selectedPoint?.name}
        <ChatDrawer />
      </Card>
    </>
  );
}

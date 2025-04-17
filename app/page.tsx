"use client";

import { lazy, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the component that uses React Three Fiber
const Scene = dynamic(() => import("@/components/GraphScene"), {
  ssr: false,
  loading: () => <div>Loading 3D Scene...</div>,
});


export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </div>
  );
}

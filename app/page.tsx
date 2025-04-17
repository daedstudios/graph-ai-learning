"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import GraphViz from "@/components/GraphViz";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas flat camera={{ position: [0, 0, 180], far: 5000 }}>
        <TrackballControls />
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight color={0xcccccc} intensity={Math.PI} />
        <directionalLight intensity={0.6 * Math.PI} />
        <GraphViz />
      </Canvas>
    </div>
  );
}

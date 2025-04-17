"use client";
import R3fForceGraph, {
  GraphMethods,
  NodeObject as BaseNodeObject,
  LinkObject,
} from "r3f-forcegraph";

// Extend NodeObject type to include additional properties
interface NodeObject extends BaseNodeObject {
  childLinks?: LinkObject[];
  collapsed?: boolean;
}
import React, { useMemo, useState, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";

export function GraphViz() {
  const fgRef = useRef<GraphMethods | undefined>(undefined);
  useFrame(() => fgRef.current?.tickFrame());

  const graphData = useMemo(() => genRandomTree(600, true), []);

  const rootId = 0;

  const nodesById = useMemo(() => {
    const nodesById: Record<number | string, NodeObject> = Object.fromEntries(
      graphData.nodes.map((node) => [node.id, node as NodeObject])
    );

    // link parent/children
    graphData.nodes.forEach((node: NodeObject) => {
      node.collapsed = node.id !== rootId;
      node.childLinks = [];
    });
    graphData.links.forEach((link: LinkObject) => {
      const sourceId =
        typeof link.source === "object" ? link.source.id : link.source;
      if (sourceId !== undefined && nodesById[sourceId]) {
        nodesById[sourceId]?.childLinks?.push(link);
      }
    });

    return nodesById;
  }, [graphData]);

  const getPrunedTree = useCallback(() => {
    const visibleNodes = [];
    const visibleLinks = [];
    (function traverseTree(node = nodesById[rootId]) {
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...(node.childLinks || []));
      (node.childLinks || [])
        .map((link) =>
          typeof link.target === "object"
            ? link.target
            : link.target !== undefined
            ? nodesById[link.target]
            : undefined
        ) // get child node
        .forEach(traverseTree);
    })();

    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback((node: NodeObject) => {
    node.collapsed = !node.collapsed; // toggle collapse state
    setPrunedTree(getPrunedTree());
  }, []);

  return (
    <R3fForceGraph
      ref={fgRef}
      graphData={prunedTree}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={0.8}
      nodeColor={(node) =>
        !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow"
      }
      onNodeClick={handleNodeClick}
    />
  );
}

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

export function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}

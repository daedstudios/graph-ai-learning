"use client";

import R3fForceGraph, {
  GraphMethods,
  NodeObject as BaseNodeObject,
  LinkObject,
} from "r3f-forcegraph";

import React, {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import nodes_data from "@/data/nodes";
import links_data from "@/data/graph_data";
import { link } from "fs";

interface NodeObject extends BaseNodeObject {
  childLinks?: LinkObject[];
  collapsed?: boolean;
}

export default function GraphViz() {
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

  useEffect(() => {
    console.log("prunedTree", prunedTree);
  }, [prunedTree]);

  const handleNodeClick = useCallback((node: NodeObject) => {
    node.collapsed = !node.collapsed; // toggle collapse state
    setPrunedTree(getPrunedTree());
  }, []);

  return (
    <R3fForceGraph
      ref={fgRef}
      //   graphData={graphData}
      graphData={links_data}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={0.8}
      nodeColor={(node) =>
        !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow"
      }
      nodeThreeObject={(node: NodeObject) => {
        const obj = new THREE.Group();
        obj.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(3, 16, 8),
            new THREE.MeshBasicMaterial({ color: "white" })
          )
        );
        const sprite = new SpriteText(String(node.name));
        sprite.color = "white";
        // sprite.fontSize = 8;
        sprite.textHeight = 6;
        sprite.position.set(0, 8, 0); // Move text up 5 units in y-axis
        obj.add(sprite);
        return obj;
      }}
      linkThreeObjectExtend={true}
      onNodeClick={handleNodeClick}
    />
  );
}

function genRandomTree(N = 300, reverse = false) {
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

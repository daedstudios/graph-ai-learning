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
import { Text, TrackballControls, CameraControls } from "@react-three/drei";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import links_data from "@/data/graph_data";
import { link } from "fs";

interface NodeObject extends BaseNodeObject {
  childLinks?: LinkObject[];
  collapsed?: boolean;
}

interface GraphVizProps {
  selectedPoint: any;
  setSelectedPoint: (point: {
    id: number | string;
    name: string;
    description: string;
  }) => void;
}

export default function GraphViz({
  selectedPoint,
  setSelectedPoint,
}: GraphVizProps) {
  const fgRef = useRef<GraphMethods | undefined>(undefined);
  useFrame(() => fgRef.current?.tickFrame());

  const cameraRef = useRef<any>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);

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

  const handleNodeClick = useCallback((node: NodeObject) => {
    console.log("node", node);
    if (node.id !== undefined) {
      setSelectedPoint({
        id: node.id,
        name: node.name as string,
        description: node.description,
      });
    }
    // setPrunedTree(getPrunedTree());
    cameraRef.current?.setLookAt(0, 0, 0, node.x, node.y, node.z, true);

    const distance = 40;
  }, []);

  const handleNodeHover = (
    node: NodeObject | null,
    prevNode: NodeObject | null
  ) => {
    console.log("node", node);
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);

      if (node.neighbors) {
        node.neighbors.forEach((neighbor: NodeObject) => {
          console.log("neighbor", neighbor); // Add this line to log the neighbor;
          highlightNodes.add(neighbor);
        });
      }
      if (node.links) {
        node.links.forEach((link: LinkObject) => highlightLinks.add(link));
      }
    }
    setHoverNode(node);
  };

  useEffect(() => {
    console.log("highlightNodes", highlightNodes);
  }, [hoverNode]);

  return (
    <>
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
          let color = "gray";
          let scale = 3;
          if (highlightNodes.has(node)) {
            color = "white";
            scale = 4;
          }
          obj.add(
            new THREE.Mesh(
              new THREE.SphereGeometry(scale, 16, 8),
              new THREE.MeshBasicMaterial({ color: color })
            )
          );
          const sprite = new SpriteText(String(node.name));
          sprite.color = color;
          // sprite.fontSize = 8;
          sprite.textHeight = scale * 2;
          sprite.position.set(0, 8, 0); // Move text up 5 units in y-axis
          obj.add(sprite);
          return obj;
        }}
        onNodeHover={handleNodeHover}
        // onNodeDragEnd={(node) => {
        //   node.fx = node.x;
        //   node.fy = node.y;
        //   node.fz = node.z;
        // }}
        linkThreeObjectExtend={true}
        onNodeClick={handleNodeClick}
        // enableNodeDrag={true}
      />
      <CameraControls makeDefault ref={cameraRef} />
    </>
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

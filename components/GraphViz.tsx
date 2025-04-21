"use client";

import R3fForceGraph, {
  GraphMethods,
  NodeObject as BaseNodeObject,
  LinkObject,
} from "r3f-forcegraph";

import ForceGraph3D from "react-force-graph-3d";

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
  const fgRef = useRef<any>(null);
  // useFrame(() => fgRef.current?.tickFrame());

  const cameraRef = useRef<any>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);

  const handleNodeClick = useCallback((node: NodeObject) => {
    console.log("node", node);
    if (node.id !== undefined) {
      setSelectedPoint({
        id: node.id,
        name: node.name as string,
        description: node.description,
      });
    }
    const distance = 200;
    const distRatio =
      1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);
    fgRef.current.cameraPosition(
      {
        x: (node.x || 0) * distRatio,
        y: (node.y || 0) * distRatio,
        z: (node.z || 0) * distRatio,
      }, // new position
      node, // lookAt ({ x, y, z })
      2000 // ms transition duration
    );
  }, []);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.cameraPosition(
        {
          x: 280,
          y: 280,
          z: 280,
        }, // new position
        { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
        2000 // ms transition duration
      );
    }
  }, [fgRef.current]);

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
  interface CanvasContext {
    beginPath: () => void;
    arc: (
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      counterclockwise?: boolean
    ) => void;
    fillStyle: string;
    fill: () => void;
  }

  useEffect(() => {
    console.log("highlightNodes", highlightNodes);
  }, [hoverNode]);

  return (
    <>
      <ForceGraph3D
        ref={fgRef}
        backgroundColor="black"
        controlType="orbit"
        graphData={links_data}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={0.8}
        // nodeColor={(node) => "white"}
        nodeThreeObject={(node: NodeObject) => {
          const obj = new THREE.Group();
          let color = "gray";
          let scale = 2;
          if (highlightNodes.has(node)) {
            color = "white";
            scale = 3;
          }
          if (selectedPoint?.id === node?.id) {
            color = "white";
            scale = 5;
            obj.add(
              new THREE.Mesh(
                new THREE.SphereGeometry(scale, 16, 8),
                new THREE.MeshNormalMaterial()
              )
            );
          } else {
            obj.add(
              new THREE.Mesh(
                new THREE.SphereGeometry(scale, 16, 8),
                new THREE.MeshBasicMaterial({ color: "gray" })
              )
            );
          }
          const sprite = new SpriteText(String(node.name));
          sprite.color = color;
          // sprite.fontSize = 8;
          sprite.textHeight = scale * 2;
          sprite.position.set(0, scale * 2, 0);
          obj.add(sprite);
          return obj;
        }}
        nodeLabel={(node: NodeObject) => {
          return node.name;
        }}
        onNodeHover={handleNodeHover}
        linkThreeObjectExtend={true}
        onNodeClick={handleNodeClick}
        // enableNodeDrag={true}
      />
      {/* <CameraControls makeDefault ref={cameraRef} /> */}
    </>
  );
}


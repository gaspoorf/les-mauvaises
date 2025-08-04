'use client';

import React from "react";
import { OrbitControls } from "@react-three/drei";

export function Controls3D() {
  return <OrbitControls target={[0, 0, 0]} enableRotate={true} enableZoom={true} enablePan={true}/>;
}
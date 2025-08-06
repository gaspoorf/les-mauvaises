'use client';

import React from "react";
import { OrbitControls } from "@react-three/drei";

// controle et verrouille la vue
export function Controls3D() {
  return <OrbitControls target={[0, 0, 0]} enableRotate={false} enableZoom={false} enablePan={false}/>;
}
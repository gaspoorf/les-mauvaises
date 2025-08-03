'use client';

import styles from "@/app/styles/components/Scene3D.module.scss";
import * as THREE from 'three';
import React, { useEffect } from "react";
import { Controls3D } from "../Controls3D";

import { Canvas, useThree, useFrame} from '@react-three/fiber';

interface Scene3DProps {
  children: React.ReactNode;
  onCameraReady?: ((camera: THREE.Camera) => void) | undefined;
  lookAtTarget?: THREE.Vector3;
}

function MouseParallaxCamera({
  onCameraReady,
  lookAtTarget,
}: {
  onCameraReady?: ((camera: THREE.Camera) => void) | undefined;
  lookAtTarget?: THREE.Vector3 | undefined;
}) {
  const { camera } = useThree();

  useEffect(() => {
    if (onCameraReady) {
      onCameraReady(camera);
    }
  }, [camera, onCameraReady]);

  useFrame(() => {
    if (camera && lookAtTarget) {
      camera.lookAt(lookAtTarget);
    }
  });

  return null;
}

export function Scene3D({ children, onCameraReady, lookAtTarget }: Scene3DProps) {

  return (
    <div className={styles.canvasContainer}>
      <Canvas camera={{ position: [-10, 10, 30], fov: 50 }}>
        <MouseParallaxCamera onCameraReady={onCameraReady} lookAtTarget={lookAtTarget} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Controls3D />
        {children}
      </Canvas>
    </div>
  );
}

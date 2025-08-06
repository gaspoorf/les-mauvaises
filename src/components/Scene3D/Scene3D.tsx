'use client';

import styles from "@/app/styles/components/Scene3D.module.scss";
import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { Controls3D } from "../Controls3D";
import { useIsMobile } from "@/app/hooks/useIsMobile"; 
import { Canvas, useThree, useFrame} from '@react-three/fiber';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Scene3DProps {
  children: React.ReactNode;
  onCameraReady?: ((camera: THREE.Camera) => void) | undefined;
  lookAtTarget?: THREE.Vector3;
}

// oriente la caméra dynamiquement
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


// scene principale
export function Scene3D({ children, onCameraReady, lookAtTarget }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  
  //apparition de la scene
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 200},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "center-=10% center",
            toggleActions: "play reverse play reverse",
            // markers: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);


  // position de la camera en fonction du device
  const cameraPosition: [number, number, number] = isMobile
    ? [-10, -20, 50]
    : [-10, 10, 30];
    

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }} gl={{ antialias: true }}>
        <MouseParallaxCamera onCameraReady={onCameraReady} lookAtTarget={lookAtTarget} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Controls3D />
        {children}
      </Canvas>
    </div>
  );
}

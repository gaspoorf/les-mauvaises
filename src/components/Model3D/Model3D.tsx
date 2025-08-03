'use client';

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

interface Model3DProps {
  modelPath: string;
  targetPosition: [number, number, number];
  targetRotation: number;
  targetScale: number;
}


export function Model3D({ modelPath, targetPosition, targetRotation, targetScale }: Model3DProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<any>(null);
  const wrapperRef = useRef<any>(null);
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);



  useFrame(() => {
    if (!modelRef.current) return;
    targetRotationY.current += 0.003;
    

    currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.1;

    modelRef.current.rotation.y = currentRotationY.current;
  
    const maxIncline = 0.15;
    
    modelRef.current.rotation.x += ((-mousePos.y * maxIncline) - modelRef.current.rotation.x) * 0.1;
    modelRef.current.rotation.z += ((-mousePos.x * maxIncline) - modelRef.current.rotation.z) * 0.1;


  
  });

  useEffect(() => {
    if (!wrapperRef.current || !modelRef.current) return;

    gsap.to(wrapperRef.current.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(wrapperRef.current.rotation, {
      z: targetRotation,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(modelRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [targetPosition, targetRotation, targetScale]);

  return (
    <group ref={wrapperRef}>
      <Center>
        <group ref={modelRef}>
          {/* <primitive object={scene} dispose={null} /> */}
        </group>
      </Center>
    </group>
  );
}

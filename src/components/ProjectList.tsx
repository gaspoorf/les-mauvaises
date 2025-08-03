'use client';

import styles from "@/app/styles/components/ProjectList.module.scss";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from 'three';
import { Project } from "@/types/Project";
import { Scene3D } from "./Scene3D";
import { Model3D } from "./Model3D";
import { TextSwitcher } from "./TextSwitcher";
import { useLenis } from "@/app/hooks/useLenis";
import { MadeSoulmaze } from '@/utils/fonts';
import { Wildwick } from '@/utils/fonts';


interface ProjectListProps {
  projects: Project[];
  heroVisible: boolean;
}

export function ProjectList({ projects, heroVisible }: ProjectListProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const isAnimating = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lenis = useLenis();

  const detailsRef = useRef<HTMLDivElement>(null);
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cameraRef = useRef<THREE.Camera | null>(null);


  useEffect(() => {
    setIsScrollBlocked(showDetails);
  }, [showDetails]);



  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    if (showDetails) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        y: 50,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [showDetails]);

  const goToSlide = (index: number) => {
    if (isScrollBlocked) return;
    if (index < 0 || index >= projects.length) return;
    setCurrentIndex(index);
    isAnimating.current = true;

    gsap.to({}, {
      duration: 1,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };


  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  


  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!lenis) return;
      if (isAnimating.current) return;

      if (isScrollBlocked) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;


      if (delta > 30 && currentIndex < projects.length - 1) {
        if (!heroVisible) {
          event.preventDefault();
          lenis.stop();
          goToSlide(currentIndex + 1);
        }
      }


      else if (delta < -30) {
        if (currentIndex === 0) {
          if (isAnimating.current) {
            event.preventDefault();
            return;
          }
          lenis.start();
        } else {
          event.preventDefault();
          lenis.stop();
          goToSlide(currentIndex - 1);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [currentIndex, projects.length, lenis, heroVisible, isScrollBlocked]);

  useEffect(() => {
  if (!lenis) return;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.changedTouches?.[0];
    if (!touch) return;
    touchStartX = touch.screenX;
    touchStartY = touch.screenY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches?.[0];
    if (!touch) return;
    touchEndX = touch.screenX;
    touchEndY = touch.screenY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (isScrollBlocked) {
        e.preventDefault();
        return;
      }

      if (deltaX < 0 && currentIndex < projects.length - 1) {
        lenis.stop();
        goToSlide(currentIndex + 1);
      } else if (deltaX > 0 && currentIndex > 0) {
        lenis.stop();
        goToSlide(currentIndex - 1);
      }
    }
  };

  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: false }); // false pour pouvoir preventDefault()

  return () => {
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchend", handleTouchEnd);
  };
}, [currentIndex, projects.length, lenis, isScrollBlocked]);


  useEffect(() => {
    if (!lenis) return;

    if (currentIndex === 0 && !showDetails) {
      // lenis.start();
    } else {
      lenis.stop();
    }
  }, [currentIndex, lenis, showDetails]);


  const handleCameraReady = (camera: THREE.Camera) => {
    cameraRef.current = camera;
  };

  const [lookAtTarget, setLookAtTarget] = useState(new THREE.Vector3(0, 2, 0));


  const animateLookAt = (newTarget: THREE.Vector3) => {
  const temp = lookAtTarget.clone();
  gsap.to(temp, {
    x: newTarget.x,
    y: newTarget.y,
    z: newTarget.z,
    duration: 1,
    ease: "power2.inOut",
    onUpdate: () => {
      setLookAtTarget(temp.clone());
    },
  });
};


  const animateCameraForward = () => {
    if (!cameraRef.current) return;
    gsap.to(cameraRef.current.position, {
      z: 15,
      x: 20,
      y: 5,

      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setShowDetails(true),
    });
  };

  const animateCameraBack = () => {
    if (!cameraRef.current) return;
    gsap.to(cameraRef.current.position, {
      z: 30,
      x: -10,
      y: 10,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setShowDetails(false),
    });
  };

  const cameraZ = 50;
  const fov = 75;
  const aspect = windowSize.width / windowSize.height;
  const fovRad = (fov * Math.PI) / 180;
  const visibleWidth = 2 * cameraZ * Math.tan(fovRad / 2) * aspect;

  return (
    <>
      <button className={`${styles.projectButton} ${MadeSoulmaze.className}`}
        onClick={() => {
          if (showDetails) {
            animateCameraBack();
            animateLookAt(new THREE.Vector3(0, 2, 0)); 
          } else {
            animateCameraForward();
            animateLookAt(new THREE.Vector3(10, 2, 0));
          }
        }}      
      >
        {showDetails ? "Retour" : "Voir détails"}
      </button>

      {projects[currentIndex] && (  
        <TextSwitcher project={projects[currentIndex]} key={currentIndex} keyIndex={currentIndex} visible={!showDetails}/>
      )}

      
      <div ref={detailsRef} className={`${styles.detailsProject} ${MadeSoulmaze.className}`}>
        <h2 className={Wildwick.className} >{projects[currentIndex]?.title}</h2>
        <p>Détails du projet: {projects[currentIndex]?.description}</p><br/>

        <div className={MadeSoulmaze.className}>
          
          <h4 className={Wildwick.className}>Polices</h4>
          <ul>
            {projects[currentIndex]?.police_connection?.nodes?.map((police, index) => (
              <li key={index}>
                {police.title} ({police.policeName})
              </li>
            ))}
          </ul><br/>

          <h4 className={Wildwick.className}>Couleurs</h4>
          <ul>
            {projects[currentIndex]?.colors_connection?.nodes?.map((color, index) => (
              <li key={index}>
                {color.title} — <span style={{ color: color.hex }}>{color.hex}</span>
              </li>
            ))}
          </ul>

          { projects[currentIndex]?.url && 
            <div className={styles.buttonContainer}>
              <a href={projects[currentIndex]?.url} className={styles.websiteButton} target="_blank" rel="noopener noreferrer">Voir le projet</a>
            </div>
          }
        </div>
      
      </div>
      

      <div className={styles.projectContainer}>
        <Scene3D onCameraReady={handleCameraReady} lookAtTarget={lookAtTarget}>
          {projects.map((project, i) => {
            const offset = i - currentIndex;

            return project.modelUrl ? (
                <Model3D
                  key={project.title}
                  modelPath={project.modelUrl!}
                  targetPosition={[(offset * visibleWidth) / 2, 0, 0]}
                  targetRotation={-offset}
                  targetScale={offset === 0 ? 1.2 : 0.8}
                />
            ) : null;
          })}
        </Scene3D>
      </div>
    </>
  );
}

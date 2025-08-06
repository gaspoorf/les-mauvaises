'use client';

import React, { useRef } from "react";
import { Project } from "@/types/Project";
import HeroSection from "@/components/HeroSection";
import { ProjectList } from "@/components/ProjectList";
import { useHeroVisible } from "@/app/hooks/useHeroVisible";
import { useLoadingState } from "@/app/hooks/useLoadingState";

interface HomepageClientProps {
  projects: Project[];
}

// affiche la hero section et la liste des projets
export default function HomepageClient({ projects }: HomepageClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useHeroVisible(heroRef, 0.0001);
  const isLoaded = useLoadingState();

  return (
    <>
      <HeroSection
        ref={heroRef}
        animate={isLoaded}
      />
      <ProjectList projects={projects} heroVisible={heroVisible} />
    </>
  );
}
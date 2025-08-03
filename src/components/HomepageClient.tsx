'use client';

import React, { useRef } from "react";
import { Project } from "@/types/Project";
import HeroSection from "@/components/HeroSection";
import { ProjectList } from "@/components/ProjectList";
import { useHeroVisible } from "@/app/hooks/useHeroVisible";

interface HomepageClientProps {
  projects: Project[];
}

export default function HomepageClient({ projects }: HomepageClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useHeroVisible(heroRef, 0.000001);

  return (
    <>
      <HeroSection ref={heroRef} />
      <ProjectList projects={projects} heroVisible={heroVisible} />
    </>
  );
}

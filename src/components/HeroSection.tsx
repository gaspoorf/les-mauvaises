'use client';

import React, { forwardRef, useEffect, useRef } from "react";
import styles from "@/app/styles/components/HeroSection.module.scss";
import gsap from "gsap";
import { MadeSoulmaze } from '@/utils/fonts';
import { Wildwick } from '@/utils/fonts';
import SplitType from "split-type";


interface HeroSectionProps {
  animate?: boolean;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({animate }, ref) => {

  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null); 
  const descRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!animate) return;

    const titleEl = titleRef.current;
    if (!titleEl) return;

    const splitTitle = new SplitType(titleEl, { types: "words,chars" });

    gsap.to(titleEl,{ autoAlpha: 1 });

    gsap.fromTo(
      splitTitle.chars,
      { x: 20, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.inOut", stagger: 0.05 }
    );

  }, [animate]);

  useEffect(() => {
    if (!animate) return;

    const descEl = descRef.current;
    if (!descEl) return;

    gsap.fromTo(
      descEl,
      { x: 20, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.7, ease: "power2.inOut", delay: 0.7 }
    );

  }, [animate]);

  useEffect(() => {
    if (!animate) return;

    const nameEl = nameRef.current;
    if (!nameEl) return;

    gsap.fromTo(
      nameEl,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.2, ease: "power2.inOut", delay: 1.3 }
    );

  }, [animate]);


  return (
    <section ref={ref} className={`${styles.heroContainer} heroSection`}>
      <div className={styles.titleContainer}>
        <h1 ref={titleRef} className={`${styles.title} ${MadeSoulmaze.className}`}>TEST TECHNIQUE</h1>
        <p ref={nameRef} className={`${styles.name} ${Wildwick.className}`}>by Gaspard</p>
      </div>
      
      <p ref={descRef} className={Wildwick.className}>Si vous me prenez je ramenerai des cookies tous les jours</p>
    </section>
  );
});

export default HeroSection;

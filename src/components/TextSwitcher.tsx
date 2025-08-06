import styles from "@/app/styles/components/TextSwitcher.module.scss";

import React, { useEffect, useRef } from "react";
import { Project } from "@/types/Project";
import gsap from "gsap";
import SplitType from "split-type";

import { MadeSoulmaze } from '@/utils/fonts';
import { Wildwick } from '@/utils/fonts';


interface TextSwitcherProps {
  project: Project;
  keyIndex: number;
  visible: boolean;
}

// anime les infos au changement de projet
export function TextSwitcher({ project, keyIndex, visible  }: TextSwitcherProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearsRef = useRef<HTMLParagraphElement>(null);

  // anime les tags
  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    if (visible) {
      gsap.fromTo(
        textEl,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
      );
    } else {
      gsap.to(textEl, {
        autoAlpha: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      });
    }

  }, [keyIndex , visible]);

  // anime l'année
  useEffect(() => {
    const yearsEl = yearsRef.current;
    if (!yearsEl) return;

    if (visible) {
      gsap.fromTo(
        yearsEl,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
      );
    } else {
      gsap.to(yearsEl, {
        autoAlpha: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      });
    }

  }, [keyIndex , visible]);

  // anime le titre
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const splitTitle = new SplitType(titleEl, { types: "words,chars" });

    if (visible) {
      gsap.fromTo(
        splitTitle.chars,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out", stagger: 0.05 }
      );
    } else {
      gsap.to(splitTitle.chars, {
        y: 20,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    return () => {
      splitTitle.revert();
    };

  }, [keyIndex , visible]);


  return (
    <div className={styles.textContainer}>
      <div className={styles.textContent}>
        <h3 ref={titleRef} className={MadeSoulmaze.className}>{project.title}</h3>

        <div className={styles.infosContent}>

          <p ref={yearsRef} className={`${styles.years} ${Wildwick.className}`}>{project.years}</p>

          <div ref={textRef} className={`${styles.description} ${MadeSoulmaze.className}`}>
              {project.tags?.map((tagObj, index) => (
                  <span key={index}>{tagObj.tag}{index < project.tags.length - 1 ? ' / ' : ''}</span>
              ))}
          </div>
        
        </div>
      
      </div>
    </div>
  );
}

'use client';

import React, { forwardRef } from "react";
import styles from "@/app/styles/components/HeroSection.module.scss";

import { MadeSoulmaze } from '@/utils/fonts';
import { Wildwick } from '@/utils/fonts';


const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className={`${styles.heroContainer} heroSection`}>
      <div className={styles.titleContainer}>
        <h1 className={MadeSoulmaze.className}>TEST TECHNIQUE</h1>
        <p className={`${styles.name} ${Wildwick.className}`}>by Gaspard</p>
      </div>
      
      <p className={Wildwick.className}>Prenez moi svp je ramenerai des cookies tous les jours</p>
    </section>
  );
});

export default HeroSection;

'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import styles from "@/app/styles/components/Loader.module.scss";
import { MadeSoulmaze } from '@/utils/fonts';

export default function LoaderOverlay() {
  const { active, progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (active) {
      setFadeOut(false);
      setShowLoader(true);
      document.body.style.overflow = 'hidden';
      setHasLoadedOnce(true);
    } else if (hasLoadedOnce) {
      setFadeOut(true);

      timer = setTimeout(() => {
        setShowLoader(false);
        document.body.style.overflow = '';
      }, 2000 + 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [active, hasLoadedOnce]);

  if (!showLoader) return null;

  return (
    <div className={`${styles.loader} ${MadeSoulmaze.className} ${fadeOut ? styles.fadeOut : ''}`}>
      <img src="/img/les-mauvaises-logo.webp" alt="logo" />
      Chargement… {Math.floor(progress)}%
    </div>
  );
}

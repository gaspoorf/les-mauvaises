import { useEffect, useState, RefObject } from 'react';

// hook qui détecte si un élément est visible dans le viewport
export function useHeroVisible(ref: RefObject<HTMLElement | null>, threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isVisible;
}

'use client';

import { useState, useEffect } from 'react';


// hook qui indique si la page principale est complètement chargée
export function useLoadingState() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const mainEl = document.querySelector('main');
        if (!mainEl) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-loaded') {
                const loadedValue = mainEl.getAttribute('data-loaded');
                setIsLoaded(loadedValue === 'true');
                }
            });
        });

        observer.observe(mainEl, {
            attributes: true,
            attributeFilter: ['data-loaded']
        });

        const initialValue = mainEl.getAttribute('data-loaded');
        setIsLoaded(initialValue === 'true');

        return () => observer.disconnect();
    }, []);

    return isLoaded;
}
'use client';

import React, { useState } from "react";
import './styles/globals.scss';

import { LenisProvider } from '@/app/hooks/useLenis';
import LoaderOverlay from '@/components/Loader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <html lang="fr">
      <head />
      <body>
        <LoaderOverlay onLoaded={() => setIsLoaded(true)} />
        <LenisProvider>
          <main data-loaded={isLoaded ? "true" : "false"}>
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}

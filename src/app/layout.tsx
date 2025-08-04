// src/app/layout.tsx
import './styles/globals.scss';
import React from 'react';

import { LenisProvider } from '@/app/hooks/useLenis';
import LoaderOverlay from '@/components/Loader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head />
      <body>
        <LoaderOverlay />
        <LenisProvider>
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}

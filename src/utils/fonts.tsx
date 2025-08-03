// fonts.js
import localFont from 'next/font/local';

export const MadeSoulmaze = localFont({
  src: [
    {
      path: '../../public/fonts/Made-Soulmaze.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-madeSoulmaze', // CSS variable optionnelle
});

export const Wildwick = localFont({
  src: [
    {
      path: '../../public/fonts/Wildwick.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-wildwick', // CSS variable optionnelle
});

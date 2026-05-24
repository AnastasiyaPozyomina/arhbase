import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Head from '@docusaurus/Head';

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.onload = () => {
      if (typeof window.ym === 'function') {
        window.ym(97547150, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(97547150, 'hit', location.pathname + location.search);
    }
  }, [location]);

  return <>
  <link rel="preload" href="/fonts/DancingScript-Regular.otf" as="font" type="font/otf" crossorigin />
  <link rel="preload" href="/fonts/DancingScript-Bold.otf" as="font" type="font/otf" crossorigin />
  <Head>
        <style>
          {`
            body { opacity: 0; transition: opacity 0.5s ease; }
            body.loaded { opacity: 1; }
          `}
        </style>
      </Head>
  {children}</>;
}
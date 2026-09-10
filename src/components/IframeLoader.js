import React, { useEffect, useRef, useState } from 'react';

/**
 * @param {{ src: string; title: string; height?: number }} props
 */
export default function IframeLoader({ src, title, height = 720 }) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  /** @type {import('react').MutableRefObject<number | null>} */
  const intervalRef = useRef(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = window.setInterval(() => {
      current += current < 70 ? Math.random() * 6 : Math.random() * 1.5;
      if (current > 95) current = 95;
      setProgress(Math.floor(current));
    }, 150);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [src]);

  const handleLoad = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setProgress(100);
    setTimeout(() => setLoaded(true), 400);
  };

  return (
    <div
      className="iframe-loader-container"
      style={{ position: 'relative', width: '100%', minHeight: height }}
    >
      {!loaded && (
        <>
          {/* Тонкая полоса прогресса сверху */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'var(--ifm-color-emphasis-200)',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, var(--ifm-color-primary-lighter), var(--ifm-color-primary-dark))',
                transition: 'width 0.25s ease-out',
                boxShadow: '0 0 8px var(--ifm-color-primary)',
              }}
            />
          </div>

          {/* Центральная плашка с процентами */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--ifm-background-color)',
              zIndex: 1,
              gap: 'clamp(12px, 2vw, 16px)',
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 'clamp(36px, 8vw, 56px)',
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--ifm-color-primary)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {progress}
              <span
                style={{
                  fontSize: '0.5em',
                  color: 'var(--ifm-color-emphasis-600)',
                  marginLeft: 2,
                }}
              >
                %
              </span>
            </div>

            <div
              style={{
                fontSize: 'clamp(13px, 2.5vw, 14px)',
                color: 'var(--ifm-color-emphasis-600)',
                textAlign: 'center',
                maxWidth: '90%',
              }}
            >
              Загрузка «{title}»…
            </div>
          </div>
        </>
      )}

      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        allowFullScreen
        onLoad={handleLoad}
        style={{
          border: 'none',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in',
          maxWidth: '100%',
        }}
      />
    </div>
  );
}
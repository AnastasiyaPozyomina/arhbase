import React, { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
  const location = useLocation();
  const isFirstRender = useRef(true);

  // Отслеживаем переходы между страницами для Яндекс.Метрики
  useEffect(() => {
    // Пропускаем первый рендер — его обработает сам счётчик Метрики
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Отправляем hit при смене URL (SPA-переход)
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(97547150, 'hit', location.pathname + location.search);
    }
  }, [location]);

  return (
    <div style={{
      // fontFamily: `'Roboto'`,
      // fontSize: '1rem',
      // transition: 'background-color 0.3s ease, color 0.3s ease',
      // fontWeight: '200',
      // font: `var(--ifm-font-size-base) / var(--ifm-line-height-base) var(--ifm-font-family-base)`,
    }}>
      {children}
    </div>
  );
}
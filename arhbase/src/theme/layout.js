import React from 'react';
import Layout from '@theme/Layout';

export default function Root({ children }) {
  return (
    <Layout>
      {/* Подключение Lightbox CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css " />

      {/* Подключение Lightbox JS */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js "
        async
      />

      {/* Инициализация Lightbox */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', () => {
              if (window.lightbox) {
                lightbox.option({
                  resizeDuration: 200,
                  wrapAround: true,
                  disableScrolling: true,
                  alwaysShowNavOnTouchDevices: true
                });
              }
            });
          `,
        }}
      />

      {children}
    </Layout>
  );
}
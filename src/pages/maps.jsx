import React from 'react';
import Layout from '@theme/Layout';
import InteractiveMap from '@site/src/components/InteractiveMap';

export default function MapsPage() {
  return (
    <Layout
      title="Места — Карта населенных пунктов и приходов ВКО"
      description="Интерактивная карта исторических населенных пунктов и приходов Восточного Казахстана"
    >
      <main style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          Места
        </h1>

        {/* Горизонтальный layout: слева панель, справа карта */}
        <InteractiveMap  showHeader={false} layout="horizontal" />
      </main>
    </Layout>
  );
}
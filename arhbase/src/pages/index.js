import clsx from 'clsx';
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import recentPosts from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import SettlementHistory from '../components/SettlementHistory';

export default function Home () {
  const {siteConfig} = useDocusaurusContext ();

  return (
    <Layout
      title={`Привет от ${siteConfig.title}`}
      description="Проект, посвящённый индексации архивных документов Рудного Алтая, охватывает территорию Восточного Казахстана и часть Третьяковского района Алтайского края."
    >
      <div className="banner" />
      <main className="container">
        <section>
          <HomepageFeatures />
        </section>
        {/* История заселения */}
        <section style={{marginTop: '40px'}}>
          <SettlementHistory />
        </section>
      </main>
    </Layout>
  );
}

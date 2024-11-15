import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import imgSrc from './header.png';

import Heading from '@theme/Heading';
import styles from './index.module.css';





function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div class="containerBox">
    <div class="text-box">
        <h1>Your image & Text is responsive and centered</h1>
    </div>
    <img
        className="headerImage"
        width="100%"
        src={imgSrc}
        alt="Лист с пером"
      />
</div>
    
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout  title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
